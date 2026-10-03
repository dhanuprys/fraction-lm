import { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';
import { monitorEmitter } from '../../services/monitor';

export const monitorRoutes = new Hono();

monitorRoutes.get('/stream', (c) => {
	return streamSSE(c, async (stream) => {
		// Event handler wrappers to send data to the SSE stream
		const onActivity = async (data: unknown) => {
			await stream.writeSSE({
				event: 'activity',
				data: JSON.stringify(data),
			});
		};

		const onAlarm = async (data: unknown) => {
			await stream.writeSSE({
				event: 'alarm',
				data: JSON.stringify(data),
			});
		};

		// Attach listeners
		monitorEmitter.on('student_activity', onActivity);
		monitorEmitter.on('alarm', onAlarm);

		// Keep connection alive with pings
		const interval = setInterval(async () => {
			try {
				await stream.writeSSE({
					event: 'ping',
					data: 'ping',
				});
			} catch (_e) {
				clearInterval(interval);
			}
		}, 15000);

		// Cleanup on client disconnect
		c.req.raw.signal.addEventListener('abort', () => {
			clearInterval(interval);
			monitorEmitter.off('student_activity', onActivity);
			monitorEmitter.off('alarm', onAlarm);
		});

		// Wait indefinitely until client aborts
		await new Promise(() => {});
	});
});
