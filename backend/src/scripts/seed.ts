/**
 * Seed Script — Fraction Learning Module
 * =======================================
 * Populates the database with 3 Topics × 3 SubTopics × 3 Materials × 3 Questions
 * covering elementary-school fraction learning (Kelas 3–5 SD).
 *
 * Run with:  bun run seed.ts
 *
 * Content is written in Bahasa Indonesia because that is the language the
 * Socratic tutor communicates in.  Every LLM-facing field (materialLlmContext,
 * questionLlmContext, evaluationParameters) is filled so the AI tutor can
 * evaluate student answers meaningfully.
 *
 * The `content` (Material) and `questionUi` (Question) fields use the TipTap
 * JSON document format the frontend renderer expects.
 */

import 'dotenv/config';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from '../prisma/contract.d';
import contractJson from '../prisma/contract.json' with { type: 'json' };

const db = postgres<Contract>({
	contractJson,
	url: process.env.DATABASE_URL as string,
});

import { TOPICS } from '../data';

const THUMBNAILS_DIR = path.resolve(__dirname, '../data/metadia-thumbnails');
const UPLOADS_DIR = path.resolve(__dirname, '../../uploads');

function seedTopicThumbnail(slug: string): string | null {
	const extensions = ['.webp', '.png', '.jpg', '.jpeg'];
	for (const ext of extensions) {
		const candidate = path.join(THUMBNAILS_DIR, 'topics', `${slug}${ext}`);
		if (existsSync(candidate)) {
			const destFilename = `topic-${slug}${ext}`;
			const destPath = path.join(UPLOADS_DIR, destFilename);
			copyFileSync(candidate, destPath);
			return `/uploads/${destFilename}`;
		}
	}
	return null;
}

function seedSubTopicThumbnail(slug: string): string | null {
	const extensions = ['.webp', '.png', '.jpg', '.jpeg'];
	for (const ext of extensions) {
		const candidate = path.join(THUMBNAILS_DIR, 'subtopics', `${slug}${ext}`);
		if (existsSync(candidate)) {
			const destFilename = `subtopic-${slug}${ext}`;
			const destPath = path.join(UPLOADS_DIR, destFilename);
			copyFileSync(candidate, destPath);
			return `/uploads/${destFilename}`;
		}
	}
	return null;
}

/* ────────────────────────────── seed runner ──────────────────────────── */

async function main() {
	console.log('🌱 Starting seed...\n');

	// Ensure uploads directory exists
	if (!existsSync(UPLOADS_DIR)) {
		mkdirSync(UPLOADS_DIR, { recursive: true });
	}

	// Clean existing data (in reverse dependency order)
	console.log('🧹 Cleaning existing data...');
	await db.orm.public.ChatLog.where({}).deleteAndCount();
	await db.orm.public.SessionQuestionResult.where({}).deleteAndCount();
	await db.orm.public.ExerciseSession.where({}).deleteAndCount();
	await db.orm.public.QuestionProgress.where({}).deleteAndCount();
	await db.orm.public.MaterialProgress.where({}).deleteAndCount();
	await db.orm.public.Question.where({}).deleteAndCount();
	await db.orm.public.Material.where({}).deleteAndCount();
	await db.orm.public.SubTopic.where({}).deleteAndCount();
	await db.orm.public.Topic.where({}).deleteAndCount();
	console.log('   ✓ Cleaned\n');

	let topicCount = 0;
	let subTopicCount = 0;
	let materialCount = 0;
	let questionCount = 0;

	for (const topicData of TOPICS) {
		const { subTopics, ...topicFields } = topicData;
		const topicThumbnail =
			(topicFields as any).thumbnail || seedTopicThumbnail(topicFields.slug);

		const topic = await db.orm.public.Topic.create({
			// biome-ignore lint/suspicious/noExplicitAny: prisma dynamic seed
			...(topicFields as any),
			thumbnail: topicThumbnail,
		});
		topicCount++;
		console.log(
			`📚 Topic ${topicCount}: ${topic.name}${topicThumbnail ? ` (🖼️  ${topicThumbnail})` : ''}`,
		);

		for (const stData of subTopics) {
			const { materials, ...stFields } = stData;
			const subTopicThumbnail =
				(stFields as any).thumbnail || seedSubTopicThumbnail(stFields.slug);

			const subTopic = await db.orm.public.SubTopic.create({
				...stFields,
				thumbnail: subTopicThumbnail,
				topicId: topic.id,
			});
			subTopicCount++;
			console.log(
				`   📖 SubTopic ${stData.order}: ${subTopic.name}${subTopicThumbnail ? ` (🖼️  ${subTopicThumbnail})` : ''}`,
			);

			for (const matData of materials) {
				const { questions, ...matFields } = matData;
				const material = await db.orm.public.Material.create({
					// biome-ignore lint/suspicious/noExplicitAny: prisma dynamic seed
					...(matFields as any),
					subTopicId: subTopic.id,
				});
				materialCount++;
				console.log(
					`      📝 Material ${matData.order}: ${material.title}`,
				);

				for (const qData of questions) {
					await db.orm.public.Question.create({
						// biome-ignore lint/suspicious/noExplicitAny: prisma dynamic seed
						...(qData as any),
						materialId: material.id,
					});
					questionCount++;
				}
				console.log(
					`         ❓ ${questions.length} questions created`,
				);
			}
		}
		console.log('');
	}

	console.log('━'.repeat(50));
	console.log(`✅ Seed complete!`);
	console.log(`   Topics:     ${topicCount}`);
	console.log(`   SubTopics:  ${subTopicCount}`);
	console.log(`   Materials:  ${materialCount}`);
	console.log(`   Questions:  ${questionCount}`);
	console.log('━'.repeat(50));

	process.exit(0);
}

main().catch((err) => {
	console.error('❌ Seed failed:', err);
	process.exit(1);
});
