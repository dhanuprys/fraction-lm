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
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from '../prisma/contract.d';
import contractJson from '../prisma/contract.json' with { type: 'json' };

const db = postgres<Contract>({
	contractJson,
	url: process.env.DATABASE_URL as string,
});

import { TOPICS } from '../data';

/* ────────────────────────────── seed runner ──────────────────────────── */

async function main() {
	console.log('🌱 Starting seed...\n');

	// Clean existing data (in reverse dependency order)
	console.log('🧹 Cleaning existing data...');
	await db.orm.public.ChatLog.where({}).deleteAndCount();
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
		const topic = await db.orm.public.Topic.create({
			// biome-ignore lint/suspicious/noExplicitAny: prisma dynamic seed
			...(topicFields as any),
		});
		topicCount++;
		console.log(`📚 Topic ${topicCount}: ${topic.name}`);

		for (const stData of subTopics) {
			const { materials, ...stFields } = stData;
			const subTopic = await db.orm.public.SubTopic.create({
				...stFields,
				topicId: topic.id,
			});
			subTopicCount++;
			console.log(`   📖 SubTopic ${stData.order}: ${subTopic.name}`);

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
