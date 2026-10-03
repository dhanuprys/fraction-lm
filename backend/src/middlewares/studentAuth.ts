import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';
import { errorResponse } from '../utils/response';

export type StudentEnv = {
	Variables: {
		student: { id: number; username: string; isAdmin: boolean };
	};
};

export const studentAuth = createMiddleware<StudentEnv>(async (c, next) => {
	const authHeader = c.req.header('Authorization');

	if (!authHeader?.startsWith('Bearer ')) {
		return errorResponse(c, 'Unauthorized: Missing or invalid token', 401);
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = await verify(
			token,
			process.env.JWT_SECRET as string,
			'HS256',
		);

		// payload.sub contains the user ID based on auth.ts logic
		const user = {
			id: Number(payload.sub),
			username: payload.username as string,
			isAdmin: payload.isAdmin as boolean,
		};

		if (!user?.id) {
			return errorResponse(c, 'Unauthorized: Invalid token payload', 401);
		}

		c.set('student', user);
		await next();
	} catch (error) {
		console.error('JWT verification error:', error);
		return errorResponse(c, 'Unauthorized: Invalid token', 401);
	}
});
