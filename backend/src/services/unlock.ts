import { db } from '../prisma/db';

type UnlockState = {
	unlockedTopicIds: Set<number>;
	unlockedSubTopicIds: Set<number>;
	unlockedMaterialIds: Set<number>;
};

/**
 * A flattened item in the content sequence.
 * Walking this array in order gives the full linear progression path.
 */
interface SequenceItem {
	topicId: number;
	subTopicId: number;
	materialId: number;
}

// ── In-memory cache ──────────────────────────────────────────────────────────
const unlockCache = new Map<
	number,
	{ state: UnlockState; expiresAt: number }
>();
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

type TopicItem = Awaited<ReturnType<typeof db.orm.public.Topic.all>>[0];
type SubTopicItem = Awaited<ReturnType<typeof db.orm.public.SubTopic.all>>[0];
type MaterialItem = Awaited<ReturnType<typeof db.orm.public.Material.all>>[0];

/**
 * Build the ordered content sequence: Topic → SubTopic → Material,
 * sorted by grade → topic order → subtopic order → material order.
 */
async function buildOrderedSequence(): Promise<{
	sequence: SequenceItem[];
	topics: TopicItem[];
	subTopics: SubTopicItem[];
	materials: MaterialItem[];
}> {
	const topics = await db.orm.public.Topic.all();
	const subTopics = await db.orm.public.SubTopic.all();
	const materials = await db.orm.public.Material.all();

	topics.sort((a, b) => a.order - b.order);
	subTopics.sort((a, b) => a.order - b.order);
	materials.sort((a, b) => a.order - b.order);

	const sequence: SequenceItem[] = [];

	for (const topic of topics) {
		const topicSubTopics = subTopics.filter(
			(st) => st.topicId === topic.id,
		);
		for (const st of topicSubTopics) {
			const stMaterials = materials.filter((m) => m.subTopicId === st.id);
			for (const mat of stMaterials) {
				sequence.push({
					topicId: topic.id,
					subTopicId: st.id,
					materialId: mat.id,
				});
			}
		}
	}

	return { sequence, topics, subTopics, materials };
}

/**
 * Compute unlock state from organic MaterialProgress COMPLETED rows.
 * This is the original linear walk logic.
 */
function computeOrganicUnlock(
	topics: TopicItem[],
	subTopics: SubTopicItem[],
	materials: MaterialItem[],
	completedMaterialIds: Set<number>,
): UnlockState {
	const unlockedMaterialIds = new Set<number>();
	const unlockedSubTopicIds = new Set<number>();
	const unlockedTopicIds = new Set<number>();

	let previousCompleted = true; // First item in the sequence is unlocked by default

	for (const topic of topics) {
		let topicUnlocked = false;
		const topicSubTopics = subTopics.filter(
			(st) => st.topicId === topic.id,
		);

		// Edge Case: Empty Topic
		if (topicSubTopics.length === 0 && previousCompleted) {
			topicUnlocked = true;
		}

		for (const subTopic of topicSubTopics) {
			let subTopicUnlocked = false;
			const subTopicMaterials = materials.filter(
				(m) => m.subTopicId === subTopic.id,
			);

			// Edge Case: Empty Subtopic
			if (subTopicMaterials.length === 0 && previousCompleted) {
				subTopicUnlocked = true;
				topicUnlocked = true;
			}

			for (const material of subTopicMaterials) {
				const isCompleted = completedMaterialIds.has(material.id);

				if (previousCompleted || isCompleted) {
					unlockedMaterialIds.add(material.id);
					subTopicUnlocked = true;
					topicUnlocked = true;
				}

				previousCompleted = isCompleted;
			}
			if (subTopicUnlocked) unlockedSubTopicIds.add(subTopic.id);
		}
		if (topicUnlocked) unlockedTopicIds.add(topic.id);
	}

	return { unlockedTopicIds, unlockedSubTopicIds, unlockedMaterialIds };
}

/**
 * Compute unlock state from an admin-set checkpoint.
 * Unlocks everything in the sequence up to and including the target materialId.
 */
function computeCheckpointUnlock(
	sequence: SequenceItem[],
	targetMaterialId: number,
): UnlockState {
	const unlockedTopicIds = new Set<number>();
	const unlockedSubTopicIds = new Set<number>();
	const unlockedMaterialIds = new Set<number>();

	for (const item of sequence) {
		unlockedTopicIds.add(item.topicId);
		unlockedSubTopicIds.add(item.subTopicId);
		unlockedMaterialIds.add(item.materialId);
		if (item.materialId === targetMaterialId) break;
	}

	return { unlockedTopicIds, unlockedSubTopicIds, unlockedMaterialIds };
}

/**
 * Merge two unlock states via union (the student gets the maximum of both).
 */
function mergeUnlockStates(a: UnlockState, b: UnlockState): UnlockState {
	return {
		unlockedTopicIds: new Set([
			...a.unlockedTopicIds,
			...b.unlockedTopicIds,
		]),
		unlockedSubTopicIds: new Set([
			...a.unlockedSubTopicIds,
			...b.unlockedSubTopicIds,
		]),
		unlockedMaterialIds: new Set([
			...a.unlockedMaterialIds,
			...b.unlockedMaterialIds,
		]),
	};
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Get the full unlock state for a student, merging organic progress
 * and any admin-set checkpoint.
 */
export async function getStudentUnlockState(
	studentId: number,
	forceRefresh = false,
): Promise<UnlockState> {
	const now = Date.now();

	if (!forceRefresh) {
		const cached = unlockCache.get(studentId);
		if (cached && cached.expiresAt > now) {
			return cached.state;
		}
	}

	// 1. Build the ordered content sequence
	const { sequence, topics, subTopics, materials } =
		await buildOrderedSequence();

	// 2. Compute organic unlock from MaterialProgress
	const completedProgresses = await db.orm.public.MaterialProgress.where({
		studentId,
		status: 'COMPLETED',
	}).all();
	const completedMaterialIds = new Set(
		completedProgresses.map((p) => p.materialId),
	);
	const organicState = computeOrganicUnlock(
		topics,
		subTopics,
		materials,
		completedMaterialIds,
	);

	// 3. Compute admin checkpoint unlock
	const user = await db.orm.public.User.where({ id: studentId }).first();
	let finalState = organicState;

	if (user?.levelMaterialId) {
		// Validate that the checkpoint material still exists in the sequence
		const exists = sequence.some(
			(item) => item.materialId === user.levelMaterialId,
		);
		if (exists) {
			const checkpointState = computeCheckpointUnlock(
				sequence,
				user.levelMaterialId,
			);
			finalState = mergeUnlockStates(organicState, checkpointState);
		}
		// If the material was deleted, checkpoint is silently ignored (graceful degradation)
	}

	// 4. Cache the result
	unlockCache.set(studentId, {
		state: finalState,
		expiresAt: now + CACHE_TTL_MS,
	});

	return finalState;
}

/**
 * Get the student's current effective level — the furthest point they've reached.
 */
export async function getStudentCurrentLevel(studentId: number) {
	const { unlockedMaterialIds } = await getStudentUnlockState(
		studentId,
		true,
	);
	const { sequence } = await buildOrderedSequence();

	let currentItem: SequenceItem | null = null;

	for (const item of sequence) {
		if (unlockedMaterialIds.has(item.materialId)) {
			currentItem = item;
		}
	}

	if (!currentItem) return null;

	// Enrich with names for display
	const topic = await db.orm.public.Topic.where({
		id: currentItem.topicId,
	}).first();
	const subTopic = await db.orm.public.SubTopic.where({
		id: currentItem.subTopicId,
	}).first();
	const material = await db.orm.public.Material.where({
		id: currentItem.materialId,
	}).first();

	return {
		topicId: currentItem.topicId,
		topicName: topic?.name || '',
		subTopicId: currentItem.subTopicId,
		subTopicName: subTopic?.name || '',
		materialId: currentItem.materialId,
		materialTitle: material?.title || '',
	};
}

/**
 * Invalidate a student's unlock cache.
 * Call this whenever progress changes (material completed, admin sets level).
 */
export function invalidateUnlockCache(studentId: number) {
	unlockCache.delete(studentId);
}
