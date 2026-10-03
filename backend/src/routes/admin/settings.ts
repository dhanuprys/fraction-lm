import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { Temporal } from 'temporal-polyfill';
import { z } from 'zod';
import { APP_SETTINGS, AVAILABLE_AI_MODELS } from '../../config/settings';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

export const settingsRoutes = new Hono()
	.get('/', async (c) => {
		try {
			const settings = await db.orm.public.AppSetting.all();
			const mapped = settings.reduce(
				(acc, curr) => {
					acc[curr.key] = curr.value;
					return acc;
				},
				{} as Record<string, string>,
			);
			return successResponse(c, 'Settings retrieved', mapped);
		} catch (error) {
			console.error('Error fetching settings:', error);
			return errorResponse(c, 'Failed to fetch settings', 500);
		}
	})
	.put(
		'/',
		zValidator(
			'json',
			z.object({
				key: z.string(),
				value: z.string(),
			}),
		),
		async (c) => {
			const { key, value } = c.req.valid('json');

			try {
				if (key === APP_SETTINGS.AI_MODEL) {
					if (
						!(AVAILABLE_AI_MODELS as readonly string[]).includes(
							value,
						)
					) {
						return errorResponse(c, 'Invalid AI model', 400);
					}
				}

				const setting = await db.orm.public.AppSetting.upsert({
					conflictOn: { key } as never,
					update: { value, updatedAt: Temporal.Now.instant() },
					create: { key, value },
				});

				return successResponse(
					c,
					'Setting updated successfully',
					setting,
				);
			} catch (error) {
				console.error('Error updating setting:', error);
				return errorResponse(c, 'Failed to update setting', 500);
			}
		},
	);
