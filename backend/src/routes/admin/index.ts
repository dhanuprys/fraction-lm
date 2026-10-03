import { Hono } from 'hono';
import { adminAuth } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';
import { chatLogsRoutes } from './chatLogs';
import { dashboardRoutes } from './dashboard';
import { materialRoutes } from './materials';
import { monitorRoutes } from './monitor';
import { questionRoutes } from './questions';
import { settingsRoutes } from './settings';
import { studentRoutes } from './students';
import { subTopicRoutes } from './subtopics';
import { topicRoutes } from './topics';
import { uploadRoutes } from './uploads';
import { userRoutes } from './users';

// All routes under admin will be protected by adminAuth
const adminApp = new Hono()
	.use('*', adminAuth)
	.route('/topics', topicRoutes)
	.route('/subtopics', subTopicRoutes)
	.route('/materials', materialRoutes)
	.route('/questions', questionRoutes)
	.route('/students', studentRoutes)
	.route('/users', userRoutes)
	.route('/uploads', uploadRoutes)
	.route('/dashboard', dashboardRoutes)
	.route('/monitor', monitorRoutes)
	.route('/chat-logs', chatLogsRoutes)
	.route('/settings', settingsRoutes)
	// Lightweight content tree for cascade pickers (level setter, etc.)
	.get('/content-tree', async (c) => {
		try {
			const topics = await db.orm.public.Topic.orderBy((t) =>
				t.order.asc(),
			)
				.include('subTopics', (st) =>
					st
						.orderBy((s) => s.order.asc())
						.include('materials', (m) =>
							m.orderBy((mat) => mat.order.asc()),
						),
				)
				.all();

			const tree = topics.map((t) => ({
				id: t.id,
				name: t.name,
				order: t.order,
				subTopics: (t.subTopics || []).map((st) => ({
					id: st.id,
					name: st.name,
					order: st.order,
					materials: (st.materials || []).map((m) => ({
						id: m.id,
						title: m.title,
						order: m.order,
					})),
				})),
			}));

			return successResponse(c, 'Content tree retrieved', { tree });
		} catch (error) {
			console.error('Error fetching content tree:', error);
			return errorResponse(c, 'Failed to fetch content tree', 500);
		}
	});

export default adminApp;
