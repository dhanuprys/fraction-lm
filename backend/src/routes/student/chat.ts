import { zValidator } from '@hono/zod-validator';
import {
	convertToModelMessages,
	createUIMessageStreamResponse,
	toUIMessageStream,
} from 'ai';
import { Hono } from 'hono';
import { Temporal } from 'temporal-polyfill';
import { z } from 'zod';
import type { StudentEnv } from '../../middlewares/studentAuth';
import { db } from '../../prisma/db';
import { calculateMasteryScore } from '../../services/ai/scoring';
import { createTutorAgent } from '../../services/ai/tutor';
import { monitorEmitter } from '../../services/monitor';
import { invalidateUnlockCache } from '../../services/unlock';
import { errorResponse } from '../../utils/response';

const chatApp = new Hono<StudentEnv>();

const chatSchema = z.object({
	sessionId: z.string(),
	messages: z.array(
		z.object({
			role: z.enum(['user', 'assistant', 'system', 'tool']),
			content: z.any().optional(),
			parts: z.any().optional(),
		}),
	),
});

chatApp.post('/:questionId/chat', zValidator('json', chatSchema), async (c) => {
	try {
		const student = c.get('student');
		const { messages, sessionId } = c.req.valid('json');
		const questionId = c.req.param('questionId');

		// 1. Verify session belongs to student and is in progress
		const session = await db.orm.public.ExerciseSession.where({
			id: sessionId,
			studentId: student.id,
			status: 'IN_PROGRESS',
		}).first();

		if (!session) {
			return errorResponse(
				c,
				'Session not found or not in progress',
				404,
			);
		}

		// 2. Fetch question (with material for LLM context fallback)
		const question = await db.orm.public.Question.where({ id: questionId })
			.include('material')
			.first();

		if (!question) {
			return errorResponse(c, 'Question not found', 404);
		}

		if (question.materialId !== session.materialId) {
			return errorResponse(
				c,
				"Question does not belong to this session's material",
				400,
			);
		}

		// 3. Build LLM context from precomputed session data (no Topic/SubTopic queries!)
		const llmCtx = (session.llmContext as Record<string, unknown>) || {};
		const topicContextText =
			llmCtx.topicName && llmCtx.subTopicName
				? `Topik pembelajaran saat ini adalah "${llmCtx.topicName}", pada sub-topik "${llmCtx.subTopicName}".\n\n`
				: '';

		// 4. Fetch the global AI model before logging
		let aiModel = 'deepseek-v4-flash';
		try {
			const setting = await db.orm.public.AppSetting.where({
				key: 'ai_model',
			}).first();
			if (setting) aiModel = setting.value;
		} catch (e) {
			console.error('Failed to fetch ai_model setting', e);
		}

		// 5. Extract and log latest user message
		const latestMessage = messages[messages.length - 1];
		if (latestMessage && latestMessage.role === 'user') {
			let messageText = '';
			if (typeof latestMessage.content === 'string') {
				messageText = latestMessage.content;
			} else if (Array.isArray(latestMessage.parts)) {
				const textPart = latestMessage.parts.find(
					(p) => p.type === 'text',
				);
				if (textPart) messageText = textPart.text;
			} else {
				messageText = JSON.stringify(
					latestMessage.content || latestMessage.parts,
				);
			}

			await db.orm.public.ChatLog.create({
				studentId: student.id,
				materialId: question.materialId,
				questionId: question.id,
				sessionId,
				message: messageText,
				sender: 'STUDENT',
				usedModel: aiModel,
			});

			monitorEmitter.emit('student_activity', {
				studentId: student.id,
				studentName: student.username || student.id,
				questionId: question.id,
				message: messageText,
				sender: 'STUDENT',
				timestamp: new Date().toISOString(),
				sessionId,
			});
		}

		// 6. Session-scoped counting — single aggregate query for both counts
		const studentMsgCount = await db.orm.public.ChatLog.where({
			sessionId,
			questionId: question.id,
			sender: 'STUDENT',
		})
			.aggregate((b) => ({ count: b.count() }))
			.then((r) => r.count);

		const aiMsgCount = await db.orm.public.ChatLog.where({
			sessionId,
			questionId: question.id,
			sender: 'AI',
		})
			.aggregate((b) => ({ count: b.count() }))
			.then((r) => r.count);

		const attemptCount = studentMsgCount;
		const actualHintsUsed = aiMsgCount;

		// 7. Define the callback for when the student passes the question
		const onQuestionPassed = async (feedback: string) => {
			const score = calculateMasteryScore({
				hintsUsed: actualHintsUsed,
				attemptsCount: attemptCount,
				timeToSolveSeconds: 60, // Simplified — not critical for scoring anymore
				difficulty:
					(typeof llmCtx.difficulty === 'number'
						? llmCtx.difficulty
						: undefined) ||
					(question.material as unknown as Record<string, number>)
						.difficulty ||
					1,
			});

			// Upsert SessionQuestionResult for this session
			await db.orm.public.SessionQuestionResult.upsert({
				create: {
					sessionId,
					questionId: question.id,
					isPassed: true,
					hintsUsed: actualHintsUsed,
					attemptCount,
					masteryScore: score,
					feedback,
					completedAt: Temporal.Now.instant(),
				},
				update: {
					isPassed: true,
					hintsUsed: actualHintsUsed,
					attemptCount,
					masteryScore: score,
					feedback,
					completedAt: Temporal.Now.instant(),
				},
				conflictOn: { sessionId, questionId: question.id } as never,
			});

			// Check if all questions in this session's material are now passed
			const allQuestions = await db.orm.public.Question.where({
				materialId: question.materialId,
			}).all();

			const sessionResults =
				await db.orm.public.SessionQuestionResult.where({
					sessionId,
				}).all();

			const passedInSession = sessionResults.filter((r) => r.isPassed);

			if (passedInSession.length >= allQuestions.length) {
				// All passed → complete the session and batch-update best scores
				const totalScore = passedInSession.reduce(
					(acc, r) => acc + r.masteryScore,
					0,
				);

				// Mark session completed
				await db.orm.public.ExerciseSession.where({
					id: sessionId,
				}).update({
					status: 'COMPLETED',
					totalScore,
					completedAt: Temporal.Now.instant(),
					updatedAt: Temporal.Now.instant(),
				});

				// Batch update QuestionProgress (best-score ledger)
				for (const result of passedInSession) {
					const existing = await db.orm.public.QuestionProgress.where(
						{
							studentId: student.id,
							questionId: result.questionId,
						},
					).first();

					if (
						!existing ||
						result.masteryScore > existing.masteryScore
					) {
						await db.orm.public.QuestionProgress.upsert({
							create: {
								studentId: student.id,
								questionId: result.questionId,
								isPassed: true,
								hintsUsed: result.hintsUsed,
								attemptCount: result.attemptCount,
								masteryScore: result.masteryScore,
								teacherFeedback: result.feedback,
								needsTeacherIntervention: result.hintsUsed >= 4,
								startedAt: Temporal.Now.instant(),
								completedAt: Temporal.Now.instant(),
							},
							update: {
								isPassed: true,
								hintsUsed: result.hintsUsed,
								attemptCount: result.attemptCount,
								masteryScore: result.masteryScore,
								teacherFeedback: result.feedback,
								needsTeacherIntervention: result.hintsUsed >= 4,
								completedAt: Temporal.Now.instant(),
							},
							conflictOn: {
								studentId: student.id,
								questionId: result.questionId,
							} as never,
						});
					}
				}

				// Update MaterialProgress (best-score ledger)
				const existingMat = await db.orm.public.MaterialProgress.where({
					studentId: student.id,
					materialId: question.materialId,
				}).first();

				if (!existingMat || totalScore > existingMat.totalScore) {
					await db.orm.public.MaterialProgress.upsert({
						create: {
							studentId: student.id,
							materialId: question.materialId,
							status: 'COMPLETED',
							totalScore,
							startedAt: Temporal.Now.instant(),
							completedAt: Temporal.Now.instant(),
						},
						update: {
							status: 'COMPLETED',
							totalScore,
							completedAt: Temporal.Now.instant(),
						},
						conflictOn: {
							studentId: student.id,
							materialId: question.materialId,
						} as never,
					});
				}

				// Invalidate cache
				invalidateUnlockCache(student.id);
			}
		};

		const onRequestIntervention = async (reason: string) => {
			monitorEmitter.emit('alarm', {
				studentId: student.id,
				studentName: student.username || student.id,
				questionId: question.id,
				reason,
				timestamp: new Date().toISOString(),
				sessionId,
			});

			await db.orm.public.QuestionProgress.upsert({
				create: {
					studentId: student.id,
					questionId: question.id,
					isPassed: false,
					hintsUsed: actualHintsUsed,
					attemptCount,
					masteryScore: 0,
					teacherFeedback: reason,
					needsTeacherIntervention: true,
					startedAt: Temporal.Now.instant(),
				},
				update: {
					needsTeacherIntervention: true,
					teacherFeedback: reason,
				},
				conflictOn: {
					studentId: student.id,
					questionId: question.id,
				} as never,
			});
		};

		// 8. Create the Tutor Agent
		const materialLlmContext =
			topicContextText +
			(llmCtx.materialLlmContext ||
				(question.material as unknown as Record<string, string>)
					?.materialLlmContext ||
				'');

		const agent = createTutorAgent({
			materialLlmContext,
			questionLlmContext: question.questionLlmContext || '',
			evaluationParameters: question.evaluationParameters
				? (question.evaluationParameters as Record<string, unknown>)
				: {},
			onQuestionPassed,
			onRequestIntervention,
			aiModel,
		});

		// 9. Conversation Summarization Context Window
		const MAX_CONTEXT_MESSAGES = 8;
		let processedMessages = messages.map((msg) => ({
			...msg,
			parts: msg.parts || [{ type: 'text', text: msg.content }],
		}));

		if (processedMessages.length > MAX_CONTEXT_MESSAGES) {
			const recentMessages = processedMessages.slice(
				-MAX_CONTEXT_MESSAGES,
			);
			const summary = `[Pesan Sistem Internal: Percakapan ini sudah berjalan cukup lama. Siswa sudah mencoba ${attemptCount} kali. Fokus pada membimbing siswa menggunakan petunjuk. Jika sudah memberikan banyak petunjuk, berikan analogi yang paling sederhana dan nyata.]`;

			processedMessages = [
				{
					role: 'user',
					content: summary,
					parts: [{ type: 'text', text: summary }],
				},
				...recentMessages,
			];
		}

		// 10. Convert messages and stream the response back using the Agent
		const modelMessages = await convertToModelMessages(
			processedMessages as never,
		);

		const result = await agent.stream({
			messages: modelMessages,

			onFinish: async ({ text, toolCalls }) => {
				// Log the AI response to the database after generation is complete
				try {
					if (text) {
						await db.orm.public.ChatLog.create({
							studentId: student.id,
							materialId: question.materialId,
							questionId: question.id,
							sessionId,
							message: text,
							sender: 'AI',
							toolCalled: false,
							usedModel: aiModel,
						});

						monitorEmitter.emit('student_activity', {
							studentId: student.id,
							studentName: student.username || student.id,
							questionId: question.id,
							message: text,
							sender: 'AI',
							timestamp: new Date().toISOString(),
							sessionId,
						});
					}

					if (toolCalls && toolCalls.length > 0) {
						const toolDetails = JSON.stringify(
							toolCalls.map((t) => ({
								name: t.toolName,
								args: (t as Record<string, unknown>).args,
							})),
						);

						await db.orm.public.ChatLog.create({
							studentId: student.id,
							materialId: question.materialId,
							questionId: question.id,
							sessionId,
							message: toolDetails,
							sender: 'SYSTEM',
							toolCalled: true,
							usedModel: aiModel,
						});

						monitorEmitter.emit('student_activity', {
							studentId: student.id,
							studentName: student.username || student.id,
							questionId: question.id,
							message: toolDetails,
							sender: 'SYSTEM',
							timestamp: new Date().toISOString(),
							sessionId,
						});
					}
				} catch (logError) {
					console.error('Failed to log AI response:', logError);
				}
			},
		});

		// Return the stream as a standard Web Response using the standalone helper (supporting tool calls)
		return createUIMessageStreamResponse({
			stream: toUIMessageStream({ stream: result.stream }),
		});
	} catch (error) {
		console.error('Chat endpoint error:', error);
		return errorResponse(c, 'Failed to process chat', 500);
	}
});

export default chatApp;
