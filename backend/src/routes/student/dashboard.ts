import { Hono } from 'hono';
import type { StudentEnv } from '../../middlewares/studentAuth';
import { db } from '../../prisma/db';
import {
	getStudentCurrentLevel,
	getStudentUnlockState,
} from '../../services/unlock';
import { errorResponse, successResponse } from '../../utils/response';

const dashboardApp = new Hono<StudentEnv>();

dashboardApp.get('/', async (c) => {
	try {
		const student = c.get('student');

		// 1. Get current level (either organic or admin override)
		const currentLevel = await getStudentCurrentLevel(student.id);

		// 2. Fetch the topic to display. If they have a level, use that topic. Otherwise fallback to the very first topic.
		let topic:
			| Awaited<ReturnType<typeof db.orm.public.Topic.first>>
			| undefined
			| null;
		if (currentLevel) {
			topic = await db.orm.public.Topic.where({
				id: currentLevel.topicId,
			}).first();
		} else {
			topic = await db.orm.public.Topic.orderBy((t) =>
				t.order.asc(),
			).first();
		}

		if (!topic) {
			return successResponse(c, 'No topics available', {
				dashboard: null,
			});
		}

		// Fetch subtopics for this topic
		const subTopics = await db.orm.public.SubTopic.where({
			topicId: topic.id,
		})
			.orderBy((s) => s.order.asc())
			.all();

		const { unlockedSubTopicIds } = await getStudentUnlockState(student.id);

		// Calculate progress and build lessons list
		const completedLessons: string[] = [];
		let activeId = '';
		const totalSubTopics = subTopics.length;

		const lessons = subTopics.map((st) => {
			// A subtopic is "completed" in the context of lessons if the *next* subtopic is unlocked
			// Or just consider it completed if it's unlocked and it's not the active one.
			// Actually, the simplest way is to check if it's unlocked.
			// If it's unlocked, is it completed? A subtopic is completed if all its materials are completed.
			// Since our linear sequence unlocks the NEXT item when the previous is completed,
			// a subtopic is "done" if we have reached the first material of the NEXT subtopic.
			// For the dashboard display, let's just use the currentLevel to know what's active.

			const isUnlocked = unlockedSubTopicIds.has(st.id);

			// We define the active subtopic as the one matching currentLevel.subTopicId
			const isActive = currentLevel?.subTopicId === st.id;

			// If it's unlocked but not active, and it comes before active in order, it's completed.
			// Since we just need a simple visualization for MVP:
			let stCompleted = false;
			if (isUnlocked && !isActive) {
				// check order
				if (
					currentLevel &&
					st.order <
						(subTopics.find((s) => s.id === currentLevel.subTopicId)
							?.order || 999)
				) {
					stCompleted = true;
				} else if (!currentLevel) {
					// if no current level but unlocked? Should not happen.
				}
			}

			if (stCompleted) completedLessons.push(st.id.toString());
			if (isActive) activeId = st.id.toString();

			return {
				id: st.id.toString(),
				slug: st.slug,
				title: st.name,
				duration: 15,
				kind: 'Lesson',
				isLocked: !isUnlocked,
			};
		});

		// Fallbacks
		if (!activeId && lessons.length > 0) activeId = lessons[0].id;

		const progress =
			totalSubTopics > 0
				? Math.round((completedLessons.length / totalSubTopics) * 100)
				: 0;

		const response = {
			currentTopic: {
				name: topic.name,
				description: topic.description,
				slug: topic.slug,
			},
			progress,
			completed: completedLessons,
			activeId,
			lessons,
		};

		return successResponse(c, 'Dashboard data retrieved successfully', {
			dashboard: response,
		});
	} catch (error) {
		console.error('Error fetching dashboard data:', error);
		return errorResponse(c, 'Failed to fetch dashboard data', 500);
	}
});

export default dashboardApp;
