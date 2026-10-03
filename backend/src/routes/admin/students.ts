import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Temporal } from 'temporal-polyfill';
import { z } from 'zod';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import {
	getStudentCurrentLevel,
	invalidateUnlockCache,
} from '../../services/unlock';
import { errorResponse, successResponse } from '../../utils/response';

const paginationSchema = z.object({
	limit: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : 10)),
	offset: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : 0)),
});

const paramIdSchema = z.object({
	id: z.coerce.number().int().positive(),
});

const setLevelSchema = z.object({
	materialId: z.number().int().positive().nullable(),
});

const bulkSetLevelSchema = z.object({
	userIds: z.array(z.number().int().positive()).min(1),
	materialId: z.number().int().positive().nullable(),
});

export const studentRoutes = new Hono<AdminEnv>()
	.get('/', zValidator('query', paginationSchema), async (c) => {
		try {
			const { limit, offset } = c.req.valid('query');

			// Only fetch users who are NOT admins (students)
			const [students, total] = await Promise.all([
				db.orm.public.User.where({ isAdmin: false })
					.orderBy((u) => u.id.desc())
					.limit(limit)
					.offset(offset)
					.all(),
				db.orm.public.User.where({ isAdmin: false })
					.aggregate((b) => ({ total: b.count() }))
					.then((res) => res.total),
			]);

			return successResponse(c, 'Students retrieved successfully', {
				students,
				pagination: { total, limit, offset },
			});
		} catch (error) {
			console.error('Error fetching students:', error);
			return errorResponse(c, 'Failed to fetch students', 500);
		}
	})
	.get('/:id/progress', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');

			const [materialProgresses, questionProgresses] = await Promise.all([
				db.orm.public.MaterialProgress.where({ studentId: id })
					.include('material')
					.all(),
				db.orm.public.QuestionProgress.where({ studentId: id })
					.include('question')
					.all(),
			]);

			return successResponse(
				c,
				'Student progress retrieved successfully',
				{
					materialProgresses,
					questionProgresses,
				},
			);
		} catch (error) {
			console.error('Error fetching student progress:', error);
			return errorResponse(c, 'Failed to fetch student progress', 500);
		}
	})
	.get('/:id/chats', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');
			const questionId = c.req.query('questionId'); // optional filter by question

			let query = db.orm.public.ChatLog.where({ studentId: id }).orderBy(
				(l) => l.createdAt.asc(),
			);

			if (questionId) {
				query = query.where({ questionId });
			}

			const chats = await query.all();

			return successResponse(
				c,
				'Student chats retrieved successfully',
				chats,
			);
		} catch (error) {
			console.error('Error fetching student chats:', error);
			return errorResponse(c, 'Failed to fetch student chats', 500);
		}
	})
	// ── Student Level ────────────────────────────────────────────────────
	.get('/:id/level', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');

			const user = await db.orm.public.User.where({ id }).first();
			if (!user) return errorResponse(c, 'Student not found', 404);

			const currentLevel = await getStudentCurrentLevel(id);

			// Get admin override info if set
			let adminOverride = null;
			if (user.levelMaterialId) {
				const mat = await db.orm.public.Material.where({
					id: user.levelMaterialId,
				}).first();
				if (mat) {
					const st = await db.orm.public.SubTopic.where({
						id: mat.subTopicId,
					}).first();
					const topic = st
						? await db.orm.public.Topic.where({
								id: st.topicId,
							}).first()
						: null;
					adminOverride = {
						materialId: user.levelMaterialId,
						materialTitle: mat.title,
						subTopicId: st?.id,
						subTopicName: st?.name,
						topicId: topic?.id,
						topicName: topic?.name,
						setAt: user.levelSetAt,
						setBy: user.levelSetBy,
					};
				}
			}

			return successResponse(c, 'Student level retrieved', {
				currentLevel,
				adminOverride,
			});
		} catch (error) {
			console.error('Error fetching student level:', error);
			return errorResponse(c, 'Failed to fetch student level', 500);
		}
	})
	.put(
		'/:id/level',
		zValidator('param', paramIdSchema),
		zValidator('json', setLevelSchema),
		async (c) => {
			try {
				const admin = c.get('admin');
				const { id } = c.req.valid('param');
				const { materialId } = c.req.valid('json');

				const user = await db.orm.public.User.where({ id }).first();
				if (!user) return errorResponse(c, 'User not found', 404);

				// Validate materialId exists if provided
				if (materialId !== null) {
					const material = await db.orm.public.Material.where({
						id: materialId,
					}).first();
					if (!material)
						return errorResponse(c, 'Material not found', 404);
				}

				await db.orm.public.User.where({ id }).update({
					levelMaterialId: materialId,
					levelSetAt: materialId ? Temporal.Now.instant() : null,
					levelSetBy: materialId ? admin.id : null,
				});

				// Invalidate cache so next request reflects new level
				invalidateUnlockCache(id);

				return successResponse(
					c,
					materialId
						? 'Student level updated successfully'
						: 'Student level override cleared',
				);
			} catch (error) {
				console.error('Error setting student level:', error);
				return errorResponse(c, 'Failed to set student level', 500);
			}
		},
	)
	.put('/bulk-level', zValidator('json', bulkSetLevelSchema), async (c) => {
		try {
			const admin = c.get('admin');
			const { userIds, materialId } = c.req.valid('json');

			if (materialId !== null) {
				const material = await db.orm.public.Material.where({
					id: materialId,
				}).first();
				if (!material)
					return errorResponse(c, 'Material not found', 404);
			}

			// Batch update, affecting all requested users
			await db.orm.public.User.where((u) => u.id.in(userIds)).update({
				levelMaterialId: materialId,
				levelSetAt: materialId ? Temporal.Now.instant() : null,
				levelSetBy: materialId ? admin.id : null,
			});

			// Batch invalidation
			for (const uid of userIds) {
				invalidateUnlockCache(uid);
			}

			return successResponse(
				c,
				'Bulk level override applied successfully',
			);
		} catch (error) {
			console.error('Error in bulk set level:', error);
			return errorResponse(c, 'Failed to apply bulk level override', 500);
		}
	});
