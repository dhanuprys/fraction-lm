import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export interface ApiResponse<T = unknown> {
	success: boolean;
	message: string;
	data?: T;
	error?: string;
}

export const successResponse = <T>(
	c: Context,
	message: string,
	data?: T,
	statusCode: ContentfulStatusCode = 200,
) => {
	return c.json<ApiResponse<T>>(
		{
			success: true,
			message,
			data,
		},
		statusCode,
	);
};

export const errorResponse = (
	c: Context,
	message: string,
	statusCode: ContentfulStatusCode = 500,
	errorDetails?: string,
) => {
	return c.json<ApiResponse>(
		{
			success: false,
			message,
			error: errorDetails,
		},
		statusCode,
	);
};
