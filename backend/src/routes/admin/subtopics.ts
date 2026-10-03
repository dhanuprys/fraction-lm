import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

const createSubTopicSchema = z.object({
	topicId: z.number().int().positive('Topic ID is required'),
	name: z.string().min(1, 'Name is required'),
	slug: z.string().min(1, 'Slug is required'),
	description: z.string().optional(),
	thumbnail: z.string().optional(),
	order: z.number().int(),
});

const updateSubTopicSchema = createSubTopicSchema.partial();

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

export const subTopicRoutes = new Hono<AdminEnv>()
	.get('/', zValidator('query', paginationSchema), async (c) => {
		try {
			const { limit, offset } = c.req.valid('query');
			const topicIdParam = c.req.query('topicId');

			// Base query builder
			let query = db.orm.public.SubTopic.orderBy((s) => s.order.asc());

			if (topicIdParam) {
				const topicId = parseInt(topicIdParam, 10);
				if (!Number.isNaN(topicId)) {
					query = query.where({ topicId });
				}
			}

			const [subTopics, total] = await Promise.all([
				query.limit(limit).offset(offset).all(),
				query
					.aggregate((b) => ({ total: b.count() }))
					.then((res) => res.total),
			]);

			return successResponse(c, 'SubTopics retrieved successfully', {
				subTopics,
				pagination: { total, limit, offset },
			});
		} catch (error) {
			console.error('Error fetching subtopics:', error);
			return errorResponse(c, 'Failed to fetch subtopics', 500);
		}
	})
	.get('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');
			const subTopic = await db.orm.public.SubTopic.where({ id }).first();

			if (!subTopic) return errorResponse(c, 'SubTopic not found', 404);
			return successResponse(
				c,
				'SubTopic retrieved successfully',
				subTopic,
			);
		} catch (_error) {
			return errorResponse(c, 'Failed to fetch subtopic', 500);
		}
	})
	.post('/', zValidator('json', createSubTopicSchema), async (c) => {
		try {
			const data = c.req.valid('json');

			// Validate topic exists
			const topic = await db.orm.public.Topic.where({
				id: data.topicId,
			}).first();
			if (!topic) return errorResponse(c, 'Topic not found', 404);

			const newSubTopic = await db.orm.public.SubTopic.create(data);
			return successResponse(
				c,
				'SubTopic created successfully',
				newSubTopic,
				201,
			);
		} catch (error) {
			console.error('Error creating subtopic:', error);
			return errorResponse(c, 'Failed to create subtopic', 500);
		}
	})
	.patch(
		'/:id',
		zValidator('param', paramIdSchema),
		zValidator('json', updateSubTopicSchema),
		async (c) => {
			try {
				const { id } = c.req.valid('param');
				const data = c.req.valid('json');

				const existing = await db.orm.public.SubTopic.where({
					id,
				}).first();
				if (!existing)
					return errorResponse(c, 'SubTopic not found', 404);

				const updated = await db.orm.public.SubTopic.where({
					id,
				}).update(data);
				return successResponse(
					c,
					'SubTopic updated successfully',
					updated,
				);
			} catch (error) {
				console.error('Error updating subtopic:', error);
				return errorResponse(c, 'Failed to update subtopic', 500);
			}
		},
	)
	.delete('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');

			const existing = await db.orm.public.SubTopic.where({ id }).first();
			if (!existing) return errorResponse(c, 'SubTopic not found', 404);

			await db.orm.public.SubTopic.where({ id }).delete();
			return successResponse(c, 'SubTopic deleted successfully');
		} catch (error) {
			console.error('Error deleting subtopic:', error);
			return errorResponse(c, 'Failed to delete subtopic', 500);
		}
	});
