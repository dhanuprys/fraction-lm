import 'temporal-polyfill/full/global';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import adminApp from './routes/admin/index';
import authApp from './routes/auth';
import studentApp from './routes/student/index';

const app = new Hono();

app.use(
	'/*',
	cors({
		origin: (origin) => {
			// In production, restrict to process.env.FRONTEND_URL.
			// For development, allow localhost.
			if (
				process.env.NODE_ENV === 'production' &&
				process.env.FRONTEND_URL
			) {
				return origin === process.env.FRONTEND_URL ? origin : null;
			}
			return origin || '*';
		},
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	}),
);

// Basic in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
app.use(async (c, next) => {
	const ip = c.req.header('x-forwarded-for') || 'unknown';
	const now = Date.now();

	let record = rateLimitMap.get(ip);
	if (!record || now > record.resetTime) {
		record = { count: 0, resetTime: now + 60 * 1000 }; // 1 minute window
	}

	record.count++;
	rateLimitMap.set(ip, record);

	if (record.count > 100) {
		// Limit to 100 requests per minute
		return c.json(
			{
				success: false,
				message: 'Too many requests, please try again later.',
			},
			429,
		);
	}

	await next();
});

// Serve static files from the uploads directory
app.use('/uploads/*', serveStatic({ root: './' }));

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

const routes = app
	.route('/api/v1/auth', authApp)
	.route('/api/v1/admin', adminApp)
	.route('/api/v1/student', studentApp);

export type AppType = typeof routes;
export default app;
