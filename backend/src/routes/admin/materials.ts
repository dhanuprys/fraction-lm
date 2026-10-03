import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

const createMaterialSchema = z.object({
	subTopicId: z.number().int().positive('SubTopic ID is required'),
	title: z.string().min(1, 'Title is required'),
	order: z.number().int(),
	content: z.any(), // JSON field for rich text / multimedia
	materialLlmContext: z.string().optional(),
	difficulty: z.number().int().min(1).max(3).optional().default(1),
	isExerciseOnly: z.boolean().optional().default(false),
});

const updateMaterialSchema = createMaterialSchema.partial();

const paramIdSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const materialRoutes = new Hono<AdminEnv>()
	.get('/', async (c) => {
		try {
			const subTopicIdParam = c.req.query('subTopicId');

			let query = db.orm.public.Material.orderBy((m) => m.order.asc());

			if (subTopicIdParam) {
				const subTopicId = parseInt(subTopicIdParam, 10);
				if (!Number.isNaN(subTopicId)) {
					query = query.where({ subTopicId });
				}
			}

			const materials = await query.all();

			return successResponse(
				c,
				'Materials retrieved successfully',
				materials,
			);
		} catch (error) {
			console.error('Error fetching materials:', error);
			return errorResponse(c, 'Failed to fetch materials', 500);
		}
	})
	.get('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');

			// Also eagerly load questions for this material
			const material = await db.orm.public.Material.where({ id })
				.include('questions', (q) =>
					q.orderBy((_q) => _q.createdAt.asc()),
				)
				.first();

			if (!material) return errorResponse(c, 'Material not found', 404);
			return successResponse(
				c,
				'Material retrieved successfully',
				material,
			);
		} catch (_error) {
			return errorResponse(c, 'Failed to fetch material', 500);
		}
	})
	.post('/', zValidator('json', createMaterialSchema), async (c) => {
		try {
			const data = c.req.valid('json');

			// Validate subTopic exists
			const subTopic = await db.orm.public.SubTopic.where({
				id: data.subTopicId,
			}).first();
			if (!subTopic) return errorResponse(c, 'SubTopic not found', 404);

			const newMaterial = await db.orm.public.Material.create(data);
			return successResponse(
				c,
				'Material created successfully',
				newMaterial,
				201,
			);
		} catch (error) {
			console.error('Error creating material:', error);
			return errorResponse(c, 'Failed to create material', 500);
		}
	})
	.patch(
		'/:id',
		zValidator('param', paramIdSchema),
		zValidator('json', updateMaterialSchema),
		async (c) => {
			try {
				const { id } = c.req.valid('param');
				const data = c.req.valid('json');

				const existing = await db.orm.public.Material.where({
					id,
				}).first();
				if (!existing)
					return errorResponse(c, 'Material not found', 404);

				const updated = await db.orm.public.Material.where({
					id,
				}).update(data);
				return successResponse(
					c,
					'Material updated successfully',
					updated,
				);
			} catch (error) {
				console.error('Error updating material:', error);
				return errorResponse(c, 'Failed to update material', 500);
			}
		},
	)
	.delete('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');

			const existing = await db.orm.public.Material.where({ id }).first();
			if (!existing) return errorResponse(c, 'Material not found', 404);

			await db.orm.public.Material.where({ id }).delete();
			return successResponse(c, 'Material deleted successfully');
		} catch (error) {
			console.error('Error deleting material:', error);
			return errorResponse(c, 'Failed to delete material', 500);
		}
	});
