import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Temporal } from 'temporal-polyfill';
import { z } from 'zod';
import type { StudentEnv } from '../../middlewares/studentAuth';
import { db } from '../../prisma/db';
import { getStudentUnlockState } from '../../services/unlock';
import { errorResponse, successResponse } from '../../utils/response';

const sessionsApp = new Hono<StudentEnv>();

// ── POST /start — Create or resume an exercise session ─────────────────────────
sessionsApp.post(
	'/start',
	zValidator('json', z.object({ materialId: z.number() })),
	async (c): Promise<Response> => {
		try {
			const student = c.get('student');
			const { materialId } = c.req.valid('json');

			// 1. Check unlock
			const { unlockedMaterialIds } = await getStudentUnlockState(
				student.id,
			);
			if (!unlockedMaterialIds.has(materialId)) {
				return errorResponse(c, 'Material is locked', 403);
			}

			// 2. Try to find the most recent active or completed session
			const existingRow = await db.orm.public.ExerciseSession.where((s) =>
				s.studentId.eq(student.id),
			)
				.where((s) => s.materialId.eq(materialId))
				.where((s) => s.status.neq('ABANDONED'))
				.orderBy((s) => s.startedAt.desc())
				.include('results')
				.first();

			const existing = existingRow as unknown as
				| {
						id: string;
						studentId: number;
						materialId: number;
						status:
							| 'IN_PROGRESS'
							| 'COMPLETED'
							| 'ABANDONED'
							| 'INTERVENTION_REQUIRED';
						attemptNo: number;
						totalScore: number;
						startedAt: unknown;
						results: Array<{
							questionId: string;
							isPassed: boolean;
							masteryScore: number;
						}> | null;
				  }
				| undefined;

			if (existing) {
				// Resume: return the session with its results
				const material = await db.orm.public.Material.where({
					id: materialId,
				})
					.include('questions')
					.first();

				if (!material)
					return errorResponse(c, 'Material not found', 404);

				const questions = (material.questions || []).map((q) => {
					const result = (existing.results || []).find(
						(r) => r.questionId === q.id,
					);
					return {
						id: q.id,
						learningObjective: q.learningObjective,
						questionUi: q.questionUi,
						isPassed: result ? result.isPassed : false,
						masteryScore: result ? result.masteryScore : 0,
					};
				});

				return successResponse(c, 'Session resumed', {
					session: {
						id: existing.id,
						attemptNo: existing.attemptNo,
						status: existing.status,
						totalScore: existing.totalScore,
						startedAt: existing.startedAt,
						questions,
					},
					material: {
						id: material.id,
						title: material.title,
						content: material.content,
					},
				});
			}

			// 3. No in-progress session — create a new one
			// Preload material + topic context in a single chain
			const materialRow = await db.orm.public.Material.where({
				id: materialId,
			})
				.include('questions')
				// biome-ignore lint/suspicious/noExplicitAny: prevents TS infinite type instantiation
				.include('subTopic', (st: any) => st.include('topic'))
				.first();

			const material = materialRow as unknown as
				| {
						id: number;
						title: string;
						content: string | null;
						materialLlmContext: string | null;
						difficulty: number | null;
						subTopic: {
							name: string;
							topic?: { name: string };
						} | null;
						questions: Array<{
							id: number;
							learningObjective: string | null;
							questionUi: string | null;
							content: string | null;
						}>;
				  }
				| undefined;

			if (!material) return errorResponse(c, 'Material not found', 404);

			const subTopic = material.subTopic;
			const topic = subTopic?.topic;

			// Compute LLM context once and store it
			const llmContext = {
				topicName: topic?.name || null,
				subTopicName: subTopic?.name || null,
				materialLlmContext: material.materialLlmContext || null,
				difficulty: material.difficulty || 1,
			};

			// Determine attemptNo
			const lastSession = await db.orm.public.ExerciseSession.where({
				studentId: student.id,
				materialId,
			})
				.orderBy((s) => s.attemptNo.desc())
				.first();
			const attemptNo = lastSession ? lastSession.attemptNo + 1 : 1;

			// Create the session
			const session = await db.orm.public.ExerciseSession.create({
				studentId: student.id,
				materialId,
				attemptNo,
				status: 'IN_PROGRESS',
				// biome-ignore lint/suspicious/noExplicitAny: required for Prisma JsonValue
				llmContext: llmContext as any,
			});

			const questions = (material.questions || []).map((q) => ({
				id: q.id,
				learningObjective: q.learningObjective,
				questionUi: q.questionUi,
				isPassed: false,
				masteryScore: 0,
			}));

			return successResponse(c, 'Session created', {
				session: {
					id: session.id,
					attemptNo: session.attemptNo,
					status: session.status,
					totalScore: 0,
					startedAt: session.startedAt,
					questions,
				},
				material: {
					id: material.id,
					title: material.title,
					content: material.content,
				},
			});
		} catch (error) {
			console.error('Session start error:', error);
			return errorResponse(c, 'Failed to start session', 500);
		}
	},
);

// ── GET /:sessionId/chat/:questionId — Lazy chat hydration ─────────────────────
sessionsApp.get('/:sessionId/chat/:questionId', async (c) => {
	try {
		const student = c.get('student');
		const sessionId = c.req.param('sessionId');
		const questionId = c.req.param('questionId');

		// Verify session belongs to student
		const session = await db.orm.public.ExerciseSession.where({
			id: sessionId,
			studentId: student.id,
		}).first();

		if (!session) return errorResponse(c, 'Session not found', 404);

		// Fetch chat logs for this question within this session
		const chatLogs = await db.orm.public.ChatLog.where({
			sessionId,
			questionId,
		})
			.orderBy((c) => c.createdAt.asc())
			.all();

		// Convert to useChat-compatible message format
		const messages = chatLogs
			.filter((log) => !log.toolCalled)
			.map((log, _index: number) => ({
				id: `history-${log.id}`,
				role: log.sender === 'STUDENT' ? 'user' : 'assistant',
				content: log.message,
			}));

		return successResponse(c, 'Chat history loaded', { messages });
	} catch (error) {
		console.error('Chat hydration error:', error);
		return errorResponse(c, 'Failed to load chat history', 500);
	}
});

// ── GET /:sessionId/results — Lightweight session results ──────────────────────
sessionsApp.get('/:sessionId/results', async (c) => {
	try {
		const student = c.get('student');
		const sessionId = c.req.param('sessionId');

		const session = await db.orm.public.ExerciseSession.where({
			id: sessionId,
			studentId: student.id,
		})
			.include('results')
			.first();

		if (!session) return errorResponse(c, 'Session not found', 404);

		const results = (session.results || []).map((r) => ({
			questionId: r.questionId,
			isPassed: r.isPassed,
			masteryScore: r.masteryScore,
		}));

		return successResponse(c, 'Results loaded', {
			status: session.status,
			totalScore: session.totalScore,
			results,
		});
	} catch (error) {
		console.error('Results fetch error:', error);
		return errorResponse(c, 'Failed to load results', 500);
	}
});

// ── POST /:sessionId/retake — Abandon current and start new ────────────────────
sessionsApp.post('/:sessionId/retake', async (c) => {
	try {
		const student = c.get('student');
		const sessionId = c.req.param('sessionId');

		const session = await db.orm.public.ExerciseSession.where({
			id: sessionId,
			studentId: student.id,
		}).first();

		if (!session) return errorResponse(c, 'Session not found', 404);

		// Abandon the current session if still in progress
		if (session.status === 'IN_PROGRESS') {
			await db.orm.public.ExerciseSession.where({ id: sessionId }).update(
				{ status: 'ABANDONED', updatedAt: Temporal.Now.instant() },
			);
		}

		// Determine new attemptNo
		const lastSession = await db.orm.public.ExerciseSession.where({
			studentId: student.id,
			materialId: session.materialId,
		})
			.orderBy((s) => s.attemptNo.desc())
			.first();
		const attemptNo = lastSession ? lastSession.attemptNo + 1 : 1;

		// Reuse the precomputed LLM context from the old session
		const newSession = await db.orm.public.ExerciseSession.create({
			studentId: student.id,
			materialId: session.materialId,
			attemptNo,
			status: 'IN_PROGRESS',
			llmContext: session.llmContext,
		});

		// Load questions for the response
		const materialRow = await db.orm.public.Material.where({
			id: session.materialId,
		})
			.include('questions')
			.first();

		const material = materialRow as unknown as
			| {
					id: number;
					title: string;
					content: string | null;
					questions: Array<{
						id: number;
						learningObjective: string | null;
						questionUi: string | null;
						content: string | null;
					}>;
			  }
			| undefined;

		const questions = (material?.questions || []).map((q) => ({
			id: q.id,
			learningObjective: q.learningObjective,
			questionUi: q.questionUi,
			isPassed: false,
			masteryScore: 0,
		}));

		return successResponse(c, 'Retake session created', {
			session: {
				id: newSession.id,
				attemptNo: newSession.attemptNo,
				status: newSession.status,
				totalScore: 0,
				startedAt: newSession.startedAt,
				questions,
			},
			material: {
				id: material?.id,
				title: material?.title,
				content: (material as unknown as Record<string, unknown>)
					.content,
			},
		});
	} catch (error) {
		console.error('Retake error:', error);
		return errorResponse(c, 'Failed to create retake session', 500);
	}
});

export default sessionsApp;
