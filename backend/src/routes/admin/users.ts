import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

const createUserSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(6),
	name: z.string().min(1),
	grade: z.number().int().optional().nullable(),
	isAdmin: z.boolean().optional().default(false),
});

const updateUserSchema = createUserSchema.partial().extend({
	password: z.string().min(6).optional(),
});

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

export const userRoutes = new Hono<AdminEnv>()
	.get('/', zValidator('query', paginationSchema), async (c) => {
		try {
			const { limit, offset } = c.req.valid('query');

			const [users, total] = await Promise.all([
				db.orm.public.User.orderBy((u) => u.id.desc())
					.limit(limit)
					.offset(offset)
					.all(),
				db.orm.public.User.aggregate((b) => ({
					total: b.count(),
				})).then((res) => res.total),
			]);

			// Remove passwords from response
			const sanitizedUsers = users.map(({ password, ...u }) => u);

			return successResponse(c, 'Users retrieved successfully', {
				users: sanitizedUsers,
				pagination: {
					total,
					limit,
					offset,
				},
			});
		} catch (error) {
			console.error('Error fetching users:', error);
			return errorResponse(c, 'Failed to fetch users', 500);
		}
	})
	.get('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');
			const user = await db.orm.public.User.where({ id }).first();

			if (!user) {
				return errorResponse(c, 'User not found', 404);
			}

			const { password, ...sanitizedUser } = user;
			return successResponse(
				c,
				'User retrieved successfully',
				sanitizedUser,
			);
		} catch (_error) {
			return errorResponse(c, 'Failed to fetch user', 500);
		}
	})
	.post('/', zValidator('json', createUserSchema), async (c) => {
		try {
			const data = c.req.valid('json');

			// Check if username already exists
			const existing = await db.orm.public.User.where({
				username: data.username,
			}).first();
			if (existing) {
				return errorResponse(c, 'Username already exists', 409);
			}

			const hashedPassword = await Bun.password.hash(data.password);

			const newUser = await db.orm.public.User.create({
				...data,
				password: hashedPassword,
			});

			const { password, ...sanitizedUser } = newUser;
			return successResponse(
				c,
				'User created successfully',
				sanitizedUser,
				201,
			);
		} catch (error) {
			console.error('Error creating user:', error);
			return errorResponse(c, 'Failed to create user', 500);
		}
	})
	.patch(
		'/:id',
		zValidator('param', paramIdSchema),
		zValidator('json', updateUserSchema),
		async (c) => {
			try {
				const { id } = c.req.valid('param');
				const data = c.req.valid('json');

				const existing = await db.orm.public.User.where({ id }).first();
				if (!existing) return errorResponse(c, 'User not found', 404);

				if (data.username && data.username !== existing.username) {
					const usernameTaken = await db.orm.public.User.where({
						username: data.username,
					}).first();
					if (usernameTaken) {
						return errorResponse(c, 'Username already exists', 409);
					}
				}

				const updateData: Record<string, unknown> = { ...data };
				if (data.password) {
					updateData.password = await Bun.password.hash(
						data.password,
					);
				}

				const updatedUser = await db.orm.public.User.where({
					id,
				}).update(updateData);
				if (!updatedUser) {
					return errorResponse(c, 'User not found', 404);
				}
				const { password, ...sanitizedUser } = updatedUser as Record<
					string,
					unknown
				>;

				return successResponse(
					c,
					'User updated successfully',
					sanitizedUser,
				);
			} catch (error) {
				console.error('Error updating user:', error);
				return errorResponse(c, 'Failed to update user', 500);
			}
		},
	)
	.delete('/:id', zValidator('param', paramIdSchema), async (c) => {
		try {
			const { id } = c.req.valid('param');

			const existing = await db.orm.public.User.where({ id }).first();
			if (!existing) return errorResponse(c, 'User not found', 404);

			// Delete related records to maintain integrity (if any cascade rules aren't set)
			await db.orm.public.ChatLog.where({ studentId: id }).delete();
			await db.orm.public.MaterialProgress.where({
				studentId: id,
			}).delete();
			await db.orm.public.QuestionProgress.where({
				studentId: id,
			}).delete();

			await db.orm.public.User.where({ id }).delete();

			return successResponse(c, 'User deleted successfully');
		} catch (error) {
			console.error('Error deleting user:', error);
			return errorResponse(c, 'Failed to delete user', 500);
		}
	});
