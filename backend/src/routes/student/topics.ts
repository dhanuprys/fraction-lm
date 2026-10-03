import { Hono } from 'hono';
import { Temporal } from 'temporal-polyfill';
import type { StudentEnv } from '../../middlewares/studentAuth';
import { db } from '../../prisma/db';
import { errorResponse, successResponse } from '../../utils/response';

const topicsApp = new Hono<StudentEnv>();

import { getStudentUnlockState } from '../../services/unlock';

// 1. Get all topics (with unlock status based on grade or progress - simplified for now)
topicsApp.get('/', async (c) => {
	try {
		const student = c.get('student');

		const topics = await db.orm.public.Topic.orderBy((t) => t.order.asc())
			.include('subTopics')
			.all();

		const { unlockedTopicIds } = await getStudentUnlockState(student.id);

		const response = topics.map((topic) => ({
			id: topic.id,
			name: topic.name,
			description: topic.description,
			order: topic.order,
			thumbnail: topic.thumbnail,
			slug: topic.slug,
			isUnlocked: unlockedTopicIds.has(topic.id),
			subtopicCount: topic.subTopics ? topic.subTopics.length : 0,
		}));

		return successResponse(c, 'Topics retrieved successfully', {
			topics: response,
		});
	} catch (error) {
		console.error('Error fetching topics:', error);
		return errorResponse(c, 'Failed to fetch topics', 500);
	}
});

// 2. Get subtopics for a specific topic (by slug)
topicsApp.get('/:topicSlug/subtopics', async (c) => {
	try {
		const student = c.get('student');
		const topicSlug = c.req.param('topicSlug');
		if (!topicSlug) return errorResponse(c, 'Invalid topic slug', 400);

		const topic = await db.orm.public.Topic.where({
			slug: topicSlug,
		}).first();
		if (!topic) return errorResponse(c, 'Topic not found', 404);

		const subTopics = await db.orm.public.SubTopic.where({
			topicId: topic.id,
		})
			.orderBy((s) => s.order.asc())
			.include('materials')
			.all();

		const { unlockedTopicIds, unlockedSubTopicIds } =
			await getStudentUnlockState(student.id);

		if (!unlockedTopicIds.has(topic.id)) {
			return errorResponse(c, 'Topic is locked', 403);
		}

		const responseSubtopics = subTopics.map((st) => ({
			id: st.id,
			name: st.name,
			description: st.description,
			order: st.order,
			thumbnail: st.thumbnail,
			slug: st.slug,
			isUnlocked: unlockedSubTopicIds.has(st.id),
			materialCount: st.materials ? st.materials.length : 0,
		}));

		return successResponse(c, 'Subtopics retrieved successfully', {
			topic,
			subTopics: responseSubtopics,
		});
	} catch (error) {
		console.error('Error fetching subtopics:', error);
		return errorResponse(c, 'Failed to fetch subtopics', 500);
	}
});

// 3. Get materials for a specific subtopic (includes student progress)
topicsApp.get('/:topicSlug/:subTopicSlug/materials', async (c) => {
	try {
		const student = c.get('student');
		const topicSlug = c.req.param('topicSlug');
		const subTopicSlug = c.req.param('subTopicSlug');

		if (!topicSlug || !subTopicSlug)
			return errorResponse(c, 'Invalid slugs', 400);

		const topic = await db.orm.public.Topic.where({
			slug: topicSlug,
		}).first();
		if (!topic) return errorResponse(c, 'Topic not found', 404);

		const subTopic = await db.orm.public.SubTopic.where({
			slug: subTopicSlug,
			topicId: topic.id,
		}).first();
		if (!subTopic) return errorResponse(c, 'Subtopic not found', 404);

		const materials = await db.orm.public.Material.where({
			subTopicId: subTopic.id,
		})
			.orderBy((m) => m.order.asc())
			.include('progresses', (p) => p.where({ studentId: student.id }))
			.all();

		const { unlockedSubTopicIds, unlockedMaterialIds } =
			await getStudentUnlockState(student.id);

		if (!unlockedSubTopicIds.has(subTopic.id)) {
			return errorResponse(c, 'Subtopic is locked', 403);
		}

		// Format output to remove LLM context and flatten progress
		const response = materials.map((mat) => {
			const progress =
				mat.progresses && mat.progresses.length > 0
					? mat.progresses[0]
					: null;
			return {
				id: mat.id,
				title: mat.title,
				order: mat.order,
				status: progress ? progress.status : 'NOT_STARTED',
				totalScore: progress ? progress.totalScore : 0,
				isUnlocked: unlockedMaterialIds.has(mat.id),
				isExerciseOnly: mat.isExerciseOnly,
			};
		});

		return successResponse(c, 'Materials retrieved successfully', {
			topic,
			subTopic,
			materials: response,
		});
	} catch (error) {
		console.error('Error fetching materials:', error);
		return errorResponse(c, 'Failed to fetch materials', 500);
	}
});

// 4. Get a specific material and its questions
topicsApp.get('/materials/:materialId', async (c) => {
	try {
		const student = c.get('student');
		const materialId = parseInt(c.req.param('materialId'), 10);
		if (Number.isNaN(materialId))
			return errorResponse(c, 'Invalid material ID', 400);

		const material = await db.orm.public.Material.where({ id: materialId })
			.include('questions', (q) =>
				q.include('progresses', (p) =>
					p.where({ studentId: student.id }),
				),
			)
			.include('progresses', (p) => p.where({ studentId: student.id }))
			.first();

		if (!material) {
			return errorResponse(c, 'Material not found', 404);
		}

		const { unlockedMaterialIds } = await getStudentUnlockState(student.id);
		if (!unlockedMaterialIds.has(material.id)) {
			return errorResponse(c, 'Material is locked', 403);
		}

		const materialProgress =
			material.progresses && material.progresses.length > 0
				? material.progresses[0]
				: null;

		// Format response to hide answers, LLM context, evaluation params from the student
		const formattedQuestions = (material.questions || []).map((q) => {
			const progress =
				q.progresses && q.progresses.length > 0
					? q.progresses[0]
					: null;
			return {
				id: q.id,
				learningObjective: q.learningObjective,
				questionUi: q.questionUi,
				// Do NOT include questionLlmContext, evaluationParameters, or answers
				progress: {
					isPassed: progress ? progress.isPassed : false,
					hintsUsed: progress ? progress.hintsUsed : 0,
					masteryScore: progress ? progress.masteryScore : 0,
					teacherFeedback: progress ? progress.teacherFeedback : null,
				},
			};
		});

		// Fetch previous unlocked materials for summary if isExerciseOnly
		let summaryMaterials: Array<{ title: string; content: unknown }> = [];
		if (material.isExerciseOnly) {
			const subtopicMaterials = await db.orm.public.Material.where({
				subTopicId: material.subTopicId,
			})
				.orderBy((m) => m.order.asc())
				.all();

			summaryMaterials = subtopicMaterials
				.filter(
					(m) =>
						m.order < material.order &&
						unlockedMaterialIds.has(m.id),
				)
				.map((m) => ({ title: m.title, content: m.content }));
		}

		const response = {
			id: material.id,
			title: material.title,
			content: material.content, // UI content
			isExerciseOnly: material.isExerciseOnly,
			status: materialProgress ? materialProgress.status : 'NOT_STARTED',
			questions: formattedQuestions,
			summaryMaterials: material.isExerciseOnly
				? summaryMaterials
				: undefined,
		};

		return successResponse(c, 'Material details retrieved successfully', {
			material: response,
		});
	} catch (error) {
		console.error('Error fetching material details:', error);
		return errorResponse(c, 'Failed to fetch material details', 500);
	}
});

// 5. Complete a material that has no questions
topicsApp.post('/materials/:materialId/complete', async (c) => {
	try {
		const student = c.get('student');
		const materialId = parseInt(c.req.param('materialId'), 10);
		if (Number.isNaN(materialId))
			return errorResponse(c, 'Invalid material ID', 400);

		const { unlockedMaterialIds } = await getStudentUnlockState(student.id);
		if (!unlockedMaterialIds.has(materialId)) {
			return errorResponse(c, 'Material is locked', 403);
		}

		const material = await db.orm.public.Material.where({ id: materialId })
			.include('questions')
			.first();

		if (!material) {
			return errorResponse(c, 'Material not found', 404);
		}

		if (material.questions && material.questions.length > 0) {
			return errorResponse(
				c,
				'Material has questions. You must complete the exercise.',
				400,
			);
		}

		await db.orm.public.MaterialProgress.upsert({
			conflictOn: {
				studentId: student.id,
				materialId,
			} as never,
			update: {
				status: 'COMPLETED',
				totalScore: 100,
				completedAt: Temporal.Now.instant(),
			},
			create: {
				studentId: student.id,
				materialId,
				status: 'COMPLETED',
				totalScore: 100,
				startedAt: Temporal.Now.instant(),
				completedAt: Temporal.Now.instant(),
			},
		});

		const { invalidateUnlockCache } = await import('../../services/unlock');
		invalidateUnlockCache(student.id);

		return successResponse(c, 'Material marked as completed', {
			status: 'COMPLETED',
		});
	} catch (error) {
		console.error('Error completing material:', error);
		return errorResponse(c, 'Failed to complete material', 500);
	}
});

export default topicsApp;
