import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

const createQuestionSchema = z.object({
	materialId: z.number().int().positive('Material ID is required'),
	learningObjective: z.string().optional(),
	questionUi: z.any().optional(),
	questionLlmContext: z.string().optional(),
	evaluationParameters: z.any().optional(),
	answers: z.any().optional(),
});

const updateQuestionSchema = createQuestionSchema.partial();

const paramIdSchema = z.object({
	id: z.string().uuid(),
});

export const questionRoutes = new Hono<AdminEnv>()
	.get('/', async (c) => {
		try {
			const materialIdParam = c.req.query('materialId');

			let query = db.orm.public.Question.orderBy((q) =>
				q.createdAt.asc(),
			);

			if (materialIdParam) {
				const materialId = parseInt(materialIdParam, 10);
				if (!Number.isNaN(materialId)) {
					query = query.where({ materialId });
				}
			}

			const questions = await query.all();

			return successResponse(
				c,
				'Questions retrieved successfully',
				questions,
			);
		} catch (error) {
			console.error('Error fetching questions:', error);
			return errorResponse(c, 'Failed to fetch questions', 500);
		}
	})
	.get('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');
			const question = await db.orm.public.Question.where({ id }).first();

			if (!question) return errorResponse(c, 'Question not found', 404);
			return successResponse(
				c,
				'Question retrieved successfully',
				question,
			);
		} catch (_error) {
			return errorResponse(c, 'Failed to fetch question', 500);
		}
	})
	.post('/', zValidator('json', createQuestionSchema), async (c) => {
		try {
			const data = c.req.valid('json');

			// Validate material exists
			const material = await db.orm.public.Material.where({
				id: data.materialId,
			}).first();
			if (!material) return errorResponse(c, 'Material not found', 404);

			const newQuestion = await db.orm.public.Question.create(data);
			return successResponse(
				c,
				'Question created successfully',
				newQuestion,
				201,
			);
		} catch (error) {
			console.error('Error creating question:', error);
			return errorResponse(c, 'Failed to create question', 500);
		}
	})
	.patch(
		'/:id',
		zValidator('param', paramIdSchema),
		zValidator('json', updateQuestionSchema),
		async (c) => {
			try {
				const { id } = c.req.valid('param');
				const data = c.req.valid('json');

				const existing = await db.orm.public.Question.where({
					id,
				}).first();
				if (!existing)
					return errorResponse(c, 'Question not found', 404);

				const updated = await db.orm.public.Question.where({
					id,
				}).update(data);
				return successResponse(
					c,
					'Question updated successfully',
					updated,
				);
			} catch (error) {
				console.error('Error updating question:', error);
				return errorResponse(c, 'Failed to update question', 500);
			}
		},
	)
	.delete('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');

			const existing = await db.orm.public.Question.where({ id }).first();
			if (!existing) return errorResponse(c, 'Question not found', 404);

			await db.orm.public.Question.where({ id }).delete();
			return successResponse(c, 'Question deleted successfully');
		} catch (error) {
			console.error('Error deleting question:', error);
			return errorResponse(c, 'Failed to delete question', 500);
		}
	});
