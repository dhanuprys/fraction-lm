import { Hono } from 'hono';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

export const dashboardRoutes = new Hono<AdminEnv>().get('/', async (c) => {
	try {
		const [
			totalUsers,
			activeTopics,
			totalSubTopics,
			totalMaterials,
			totalQuestions,
			interventionCount,
			materialProgress,
		] = await Promise.all([
			db.orm.public.User.aggregate((b) => ({ total: b.count() })).then(
				(res) => res.total,
			),
			db.orm.public.Topic.aggregate((b) => ({ total: b.count() })).then(
				(res) => res.total,
			),
			db.orm.public.SubTopic.aggregate((b) => ({
				total: b.count(),
			})).then((res) => res.total),
			db.orm.public.Material.aggregate((b) => ({
				total: b.count(),
			})).then((res) => res.total),
			db.orm.public.Question.aggregate((b) => ({
				total: b.count(),
			})).then((res) => res.total),
			db.orm.public.QuestionProgress.where({
				needsTeacherIntervention: true,
				isPassed: false,
			})
				.aggregate((b) => ({ total: b.count() }))
				.then((res) => res.total),
			db.orm.public.MaterialProgress.where({ status: 'COMPLETED' }).all(),
		]);

		const averageClassScore =
			materialProgress.length > 0
				? Math.round(
						materialProgress.reduce(
							(acc, curr) => acc + curr.totalScore,
							0,
						) / materialProgress.length,
					)
				: 0;

		return successResponse(c, 'Dashboard stats retrieved successfully', {
			totalUsers,
			activeTopics,
			totalSubTopics,
			totalMaterials,
			totalQuestions,
			needsIntervention: interventionCount,
			averageClassScore,
			systemHealth: 99.9, // Mock static for now
		});
	} catch (error) {
		console.error('Error fetching dashboard stats:', error);
		return errorResponse(c, 'Failed to fetch dashboard stats', 500);
	}
});
