import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

const paginationSchema = z.object({
	limit: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : 20)),
	offset: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : 0)),
});

export const chatLogsRoutes = new Hono<AdminEnv>()
	.get('/sessions', zValidator('query', paginationSchema), async (c) => {
		try {
			const { limit, offset } = c.req.valid('query');
			const studentIdParam = c.req.query('studentId');
			const materialIdParam = c.req.query('materialId');

			let query = db.orm.public.ExerciseSession.orderBy((s) =>
				s.startedAt.desc(),
			);

			const whereClause: Record<string, unknown> = {};
			if (studentIdParam)
				whereClause.studentId = parseInt(studentIdParam, 10);
			if (materialIdParam)
				whereClause.materialId = parseInt(materialIdParam, 10);

			if (Object.keys(whereClause).length > 0) {
				query = query.where(whereClause);
			}

			const [sessions, total] = await Promise.all([
				query
					.limit(limit)
					.offset(offset)
					.include('student')
					.include('material')
					.include('chatLogs')
					.all(),
				db.orm.public.ExerciseSession.where(whereClause)
					.aggregate((b) => ({ total: b.count() }))
					.then((res) => res.total),
			]);

			// Sanitize student data slightly
			const formattedSessions = sessions.map((s) => ({
				id: s.id,
				studentId: s.studentId,
				materialId: s.materialId,
				attemptNo: s.attemptNo,
				status: s.status,
				totalScore: s.totalScore,
				startedAt: s.startedAt,
				completedAt: s.completedAt,
				usedModel:
					s.chatLogs?.find((l) => l.usedModel)?.usedModel || null,
				student: {
					id: s.student.id,
					name: s.student.name,
					username: s.student.username,
				},
				material: {
					id: s.material.id,
					title: s.material.title,
				},
			}));

			return successResponse(c, 'Chat sessions retrieved', {
				sessions: formattedSessions,
				pagination: {
					total,
					limit,
					offset,
					totalPages: Math.ceil(total / limit),
					currentPage: Math.floor(offset / limit) + 1,
				},
			});
		} catch (error) {
			console.error('Error fetching chat sessions:', error);
			return errorResponse(c, 'Failed to fetch chat sessions', 500);
		}
	})
	.get('/sessions/:id', async (c) => {
		try {
			const id = c.req.param('id');
			const session = await db.orm.public.ExerciseSession.where({ id })
				.include('student')
				.include('material')
				.first();

			if (!session) {
				return errorResponse(c, 'Session not found', 404);
			}

			const chatLogs = await db.orm.public.ChatLog.where({
				sessionId: id,
			})
				.orderBy((l) => l.createdAt.asc())
				.all();

			return successResponse(c, 'Session logs retrieved', {
				session: {
					id: session.id,
					student: {
						name: session.student.name,
					},
					material: {
						title: session.material.title,
					},
				},
				logs: chatLogs.map((l) => ({
					id: l.id,
					message: l.message,
					sender: l.sender,
					isHint: l.isHint,
					toolCalled: l.toolCalled,
					usedModel: l.usedModel,
					createdAt: l.createdAt,
				})),
			});
		} catch (error) {
			console.error('Error fetching session logs:', error);
			return errorResponse(c, 'Failed to fetch session logs', 500);
		}
	});
