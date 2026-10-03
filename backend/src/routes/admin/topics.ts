import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

const createTopicSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	slug: z.string().min(1, 'Slug is required'),
	description: z.string().optional(),
	thumbnail: z.string().optional(),
	order: z.number().int().positive('Order must be a positive integer'),
});

const updateTopicSchema = createTopicSchema.partial();

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

export const topicRoutes = new Hono<AdminEnv>()
	.get('/', zValidator('query', paginationSchema), async (c) => {
		try {
			const { limit, offset } = c.req.valid('query');

			// Notice we use the prisma-8 db client structure
			const [topics, total] = await Promise.all([
				db.orm.public.Topic.orderBy((t) => t.id.desc())
					.limit(limit)
					.offset(offset)
					.all(),
				db.orm.public.Topic.aggregate((b) => ({
					total: b.count(),
				})).then((res) => res.total),
			]);

			return successResponse(c, 'Topics retrieved successfully', {
				topics,
				pagination: {
					total,
					limit,
					offset,
				},
			});
		} catch (error) {
			console.error('Error fetching topics:', error);
			return errorResponse(c, 'Failed to fetch topics', 500);
		}
	})
	.get('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');
			const topic = await db.orm.public.Topic.where({ id }).first();

			if (!topic) {
				return errorResponse(c, 'Topic not found', 404);
			}

			return successResponse(c, 'Topic retrieved successfully', topic);
		} catch (_error) {
			return errorResponse(c, 'Failed to fetch topic', 500);
		}
	})
	.post('/', zValidator('json', createTopicSchema), async (c) => {
		try {
			const data = c.req.valid('json');

			const newTopic = await db.orm.public.Topic.create(data);

			return successResponse(
				c,
				'Topic created successfully',
				newTopic,
				201,
			);
		} catch (error) {
			console.error('Error creating topic:', error);
			return errorResponse(c, 'Failed to create topic', 500);
		}
	})
	.patch(
		'/:id',
		zValidator('param', paramIdSchema),
		zValidator('json', updateTopicSchema),
		async (c) => {
			try {
				const { id } = c.req.valid('param');
				const data = c.req.valid('json');

				// Check if exists first
				const existing = await db.orm.public.Topic.where({
					id,
				}).first();
				if (!existing) return errorResponse(c, 'Topic not found', 404);

				const updatedTopic = await db.orm.public.Topic.where({
					id,
				}).update(data);

				return successResponse(
					c,
					'Topic updated successfully',
					updatedTopic,
				);
			} catch (error) {
				console.error('Error updating topic:', error);
				return errorResponse(c, 'Failed to update topic', 500);
			}
		},
	)
	.delete('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');

			const existing = await db.orm.public.Topic.where({ id }).first();
			if (!existing) return errorResponse(c, 'Topic not found', 404);

			await db.orm.public.Topic.where({ id }).delete();

			return successResponse(c, 'Topic deleted successfully');
		} catch (error) {
			console.error('Error deleting topic:', error);
			return errorResponse(c, 'Failed to delete topic', 500);
		}
	});
