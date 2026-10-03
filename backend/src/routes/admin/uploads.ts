import { randomUUID } from 'node:crypto';
import { Hono } from 'hono';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { errorResponse, successResponse } from '../../utils/response';

export const uploadRoutes = new Hono<AdminEnv>().post('/', async (c) => {
	try {
		const body = await c.req.parseBody();
		const file = body.file;

		if (!file || typeof file === 'string' || !(file instanceof File)) {
			return errorResponse(
				c,
				'Invalid file upload. Please provide a valid file.',
				400,
			);
		}

		// Generate a unique filename to prevent collisions
		const extension = file.name.split('.').pop() || 'bin';
		const uniqueName = `${randomUUID()}.${extension}`;

		const buffer = await file.arrayBuffer();

		// Note: Assuming Bun runtime which provides Bun.write
		await Bun.write(`./uploads/${uniqueName}`, buffer);

		const publicUrl = `/uploads/${uniqueName}`;

		return successResponse(
			c,
			'File uploaded successfully',
			{ url: publicUrl },
			201,
		);
	} catch (error) {
		console.error('Upload Error:', error);
		return errorResponse(c, 'Internal server error during upload', 500);
	}
});
