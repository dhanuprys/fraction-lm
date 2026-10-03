import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';
import { errorResponse } from '../utils/response';

// We define our Env types here to share across Admin routes
export type AdminEnv = {
	Variables: {
		admin: { id: number; username: string; isAdmin: boolean };
	};
};

export const adminAuth = createMiddleware<AdminEnv>(async (c, next) => {
	const authHeader = c.req.header('Authorization');
	const queryToken = c.req.query('token');

	if (!authHeader?.startsWith('Bearer ') && !queryToken) {
		return errorResponse(c, 'Unauthorized: Missing token', 401);
	}

	const token = authHeader ? authHeader.split(' ')[1] : queryToken;
	if (!token) {
		return errorResponse(c, 'Unauthorized: Missing token', 401);
	}

	try {
		const payload = await verify(
			token,
			process.env.JWT_SECRET as string,
			'HS256',
		);

		if (!payload.isAdmin) {
			return errorResponse(c, 'Forbidden: Admin access required', 403);
		}

		c.set('admin', {
			id: payload.sub as number,
			username: payload.username as string,
			isAdmin: payload.isAdmin as boolean,
		});

		await next();
	} catch (err) {
		console.error('JWT Verification Error:', err);
		return errorResponse(c, 'Unauthorized: Invalid or expired token', 401);
	}
});
