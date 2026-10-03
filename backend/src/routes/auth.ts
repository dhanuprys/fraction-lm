import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { z } from 'zod';
import { db } from '../prisma/db';
import { errorResponse, successResponse } from '../utils/response';

const authApp = new Hono();

const registerSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(6),
	name: z.string().min(1),
	grade: z.number().int().optional(),
});

authApp.post('/register', zValidator('json', registerSchema), async (c) => {
	try {
		const body = c.req.valid('json');

		// Check if user exists
		const existingUser = await db.orm.public.User.where({
			username: body.username,
		}).first();
		if (existingUser) {
			return errorResponse(c, 'Username already exists', 409);
		}

		// Hash password using Bun's built-in hashing
		const hashedPassword = await Bun.password.hash(body.password);

		// Create user
		const newUser = await db.orm.public.User.create({
			username: body.username,
			password: hashedPassword,
			name: body.name,
			grade: body.grade,
			isAdmin: false, // Force false for public registration
		});

		return successResponse(
			c,
			'User registered successfully',
			{
				user: {
					id: newUser.id,
					username: newUser.username,
					name: newUser.name,
					grade: newUser.grade,
					isAdmin: newUser.isAdmin,
				},
			},
			201,
		);
	} catch (error) {
		console.error('Registration error:', error);
		return errorResponse(c, 'Internal server error', 500);
	}
});

const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

authApp.post('/login', zValidator('json', loginSchema), async (c) => {
	try {
		const { username, password } = c.req.valid('json');

		// Find user
		const user = await db.orm.public.User.where({ username }).first();
		if (!user) {
			return errorResponse(c, 'Invalid username or password', 401);
		}

		// Verify password
		const isPasswordValid = await Bun.password.verify(
			password,
			user.password,
		);
		if (!isPasswordValid) {
			return errorResponse(c, 'Invalid username or password', 401);
		}

		const payload = {
			sub: user.id,
			username: user.username,
			isAdmin: user.isAdmin,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
		};

		const token = await sign(payload, process.env.JWT_SECRET as string);

		return successResponse(c, 'Login successful', {
			token,
			user: {
				id: user.id,
				username: user.username,
				name: user.name,
				grade: user.grade,
				isAdmin: user.isAdmin,
			},
		});
	} catch (error) {
		console.error('Login error:', error);
		return errorResponse(c, 'Internal server error', 500);
	}
});

export default authApp;
