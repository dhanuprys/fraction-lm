import { existsSync, readdirSync, unlinkSync } from 'node:fs';
import { Hono } from 'hono';
import JSZip from 'jszip';
import type { AdminEnv } from '../../middlewares/adminAuth';
import { db } from '../../prisma/db';
import {
	collectDirectAssetPath,
	extractAndNormalizeAssets,
} from '../../utils/assetScanner';
import { errorResponse, successResponse } from '../../utils/response';

// ── In-memory lock to prevent concurrent restore operations ────────────────
let restoreInProgress = false;

const UPLOADS_DIR = './uploads';

// ── Helper: Build the full hierarchical curriculum data ─────────────────────

interface BackupQuestion {
	learningObjective: string | null;
	questionUi: unknown;
	questionLlmContext: string | null;
	evaluationParameters: unknown;
	answers: unknown;
}

interface BackupMaterial {
	title: string;
	order: number;
	content: unknown;
	materialLlmContext: string | null;
	difficulty: number;
	isExerciseOnly: boolean;
	questions: BackupQuestion[];
}

interface BackupSubTopic {
	slug: string;
	name: string;
	description: string | null;
	thumbnail: string | null;
	order: number;
	materials: BackupMaterial[];
}

interface BackupTopic {
	slug: string;
	name: string;
	description: string | null;
	thumbnail: string | null;
	order: number;
	subTopics: BackupSubTopic[];
}

async function buildCurriculumData(): Promise<{
	curriculum: BackupTopic[];
	assetPaths: Set<string>;
}> {
	const assetPaths = new Set<string>();

	// Fetch full hierarchy: Topics → SubTopics → Materials → Questions
	const topics = await db.orm.public.Topic.orderBy((t) => t.order.asc())
		.include('subTopics', (st) =>
			st
				.orderBy((s) => s.order.asc())
				.include('materials', (m) =>
					m
						.orderBy((mat) => mat.order.asc())
						.include('questions', (q) =>
							q.orderBy((qr) => qr.createdAt.asc()),
						),
				),
		)
		.all();

	const curriculum: BackupTopic[] = topics.map((topic) => {
		// Collect direct thumbnail
		const topicThumb = collectDirectAssetPath(topic.thumbnail);
		if (topicThumb) assetPaths.add(topicThumb);

		return {
			slug: topic.slug,
			name: topic.name,
			description: topic.description ?? null,
			thumbnail: topic.thumbnail ?? null,
			order: topic.order,
			subTopics: (topic.subTopics || []).map((st) => {
				const stThumb = collectDirectAssetPath(st.thumbnail);
				if (stThumb) assetPaths.add(stThumb);

				return {
					slug: st.slug,
					name: st.name,
					description: st.description ?? null,
					thumbnail: st.thumbnail ?? null,
					order: st.order,
					materials: (st.materials || []).map((mat) => {
						// Deep-scan Material.content JSON for image URLs and normalize them
						const contentCopy =
							mat.content != null
								? JSON.parse(JSON.stringify(mat.content))
								: null;
						const contentAssets =
							extractAndNormalizeAssets(contentCopy);
						for (const p of contentAssets) assetPaths.add(p);

						return {
							title: mat.title,
							order: mat.order,
							content: contentCopy,
							materialLlmContext: mat.materialLlmContext ?? null,
							difficulty: mat.difficulty,
							isExerciseOnly: mat.isExerciseOnly,
							questions: (mat.questions || []).map((q) => {
								// Deep-scan questionUi and answers for images
								const quiCopy =
									q.questionUi != null
										? JSON.parse(
												JSON.stringify(q.questionUi),
											)
										: null;
								const ansCopy =
									q.answers != null
										? JSON.parse(JSON.stringify(q.answers))
										: null;

								const quiAssets =
									extractAndNormalizeAssets(quiCopy);
								const ansAssets =
									extractAndNormalizeAssets(ansCopy);
								for (const p of quiAssets) assetPaths.add(p);
								for (const p of ansAssets) assetPaths.add(p);

								return {
									learningObjective:
										q.learningObjective ?? null,
									questionUi: quiCopy,
									questionLlmContext:
										q.questionLlmContext ?? null,
									evaluationParameters:
										q.evaluationParameters ?? null,
									answers: ansCopy,
								};
							}),
						};
					}),
				};
			}),
		};
	});

	return { curriculum, assetPaths };
}

// ── Helper: Count curriculum items ──────────────────────────────────────────

function countItems(curriculum: BackupTopic[]) {
	let subTopics = 0;
	let materials = 0;
	let questions = 0;

	for (const t of curriculum) {
		subTopics += t.subTopics.length;
		for (const st of t.subTopics) {
			materials += st.materials.length;
			for (const m of st.materials) {
				questions += m.questions.length;
			}
		}
	}

	return {
		topics: curriculum.length,
		subTopics,
		materials,
		questions,
	};
}

// ── Helper: Get file size, returns 0 if file not found ──────────────────────

async function safeFileSize(filePath: string): Promise<number> {
	try {
		const file = Bun.file(filePath);
		return file.size;
	} catch {
		return 0;
	}
}

// ── Routes ──────────────────────────────────────────────────────────────────

export const backupRoutes = new Hono<AdminEnv>()
	// ── GET /preview — Dry-run: return backup stats ──────────────────────
	.get('/preview', async (c) => {
		try {
			const { curriculum, assetPaths } = await buildCurriculumData();
			const counts = countItems(curriculum);

			// Estimate total asset size
			let totalAssetSize = 0;
			for (const assetPath of assetPaths) {
				const fsPath = `.${assetPath}`; // /uploads/abc.blob → ./uploads/abc.blob
				totalAssetSize += await safeFileSize(fsPath);
			}

			// Estimate JSON data size
			const jsonSize = Buffer.byteLength(
				JSON.stringify(curriculum),
				'utf8',
			);

			return successResponse(c, 'Backup preview generated', {
				...counts,
				assets: assetPaths.size,
				estimatedSizeBytes: totalAssetSize + jsonSize,
			});
		} catch (error) {
			console.error('Backup preview error:', error);
			return errorResponse(c, 'Failed to generate backup preview', 500);
		}
	})

	// ── GET /download — Stream the backup ZIP ────────────────────────────
	.get('/download', async (c) => {
		try {
			const { curriculum, assetPaths } = await buildCurriculumData();
			const counts = countItems(curriculum);

			// Optionally include AppSettings
			let settings: Record<string, string> | null = null;
			try {
				const allSettings = await db.orm.public.AppSetting.all();
				settings = Object.fromEntries(
					allSettings.map((s) => [s.key, s.value]),
				);
			} catch {
				// Settings table might not have data, that's fine
			}

			const zip = new JSZip();

			// manifest.json
			const manifest = {
				version: '1.0',
				format: 'llm-fraction-lm-backup',
				createdAt: new Date().toISOString(),
				source: {
					hostname: c.req.header('host') || 'unknown',
				},
				counts: {
					...counts,
					assets: assetPaths.size,
				},
				includesSettings: settings !== null,
			};
			zip.file('manifest.json', JSON.stringify(manifest, null, 2));

			// data/curriculum.json
			zip.file(
				'data/curriculum.json',
				JSON.stringify(curriculum, null, 2),
			);

			// data/settings.json (optional)
			if (settings) {
				zip.file(
					'data/settings.json',
					JSON.stringify(settings, null, 2),
				);
			}

			// assets/ — add all referenced upload files
			let missingAssets = 0;
			for (const assetPath of assetPaths) {
				const fsPath = `.${assetPath}`; // /uploads/abc.blob → ./uploads/abc.blob
				const filename = assetPath.replace(/^\/uploads\//, ''); // abc.blob

				try {
					const file = Bun.file(fsPath);
					if (await file.exists()) {
						const buffer = await file.arrayBuffer();
						zip.file(`assets/${filename}`, buffer);
					} else {
						console.warn(
							`Backup: Asset not found on disk: ${fsPath}`,
						);
						missingAssets++;
					}
				} catch (err) {
					console.warn(
						`Backup: Failed to read asset ${fsPath}:`,
						err,
					);
					missingAssets++;
				}
			}

			if (missingAssets > 0) {
				console.warn(
					`Backup completed with ${missingAssets} missing asset(s)`,
				);
			}

			// Generate ZIP buffer
			const zipBuffer = await zip.generateAsync({
				type: 'arraybuffer',
				compression: 'DEFLATE',
				compressionOptions: { level: 6 },
			});

			// Build the filename
			const now = new Date();
			const timestamp = now
				.toISOString()
				.replace(/[:.]/g, '-')
				.replace('T', '_')
				.slice(0, 19);
			const filename = `backup-${timestamp}.zip`;

			return new Response(zipBuffer, {
				headers: {
					'Content-Type': 'application/zip',
					'Content-Disposition': `attachment; filename="${filename}"`,
					'Content-Length': String(zipBuffer.byteLength),
				},
			});
		} catch (error) {
			console.error('Backup download error:', error);
			return errorResponse(c, 'Failed to create backup', 500);
		}
	})

	// ── POST /restore — Full restore from uploaded ZIP ────────────────────
	.post('/restore', async (c) => {
		if (restoreInProgress) {
			return errorResponse(
				c,
				'A restore operation is already in progress. Please wait.',
				409,
			);
		}

		restoreInProgress = true;

		try {
			// Parse the uploaded file
			const body = await c.req.parseBody();
			const file = body.file;

			if (!file || typeof file === 'string' || !(file instanceof File)) {
				restoreInProgress = false;
				return errorResponse(
					c,
					'Invalid file upload. Please provide a valid ZIP file.',
					400,
				);
			}

			const zipBuffer = await file.arrayBuffer();
			const zip = await JSZip.loadAsync(zipBuffer);

			// ── Step 1: Validate manifest ────────────────────────────────
			const manifestFile = zip.file('manifest.json');
			if (!manifestFile) {
				restoreInProgress = false;
				return errorResponse(
					c,
					'Invalid backup: manifest.json not found in ZIP',
					400,
				);
			}

			const manifestText = await manifestFile.async('text');
			let manifest: {
				version: string;
				format: string;
				counts: {
					topics: number;
					subTopics: number;
					materials: number;
					questions: number;
					assets: number;
				};
				includesSettings?: boolean;
			};

			try {
				manifest = JSON.parse(manifestText);
			} catch {
				restoreInProgress = false;
				return errorResponse(
					c,
					'Invalid backup: manifest.json is not valid JSON',
					400,
				);
			}

			if (manifest.format !== 'llm-fraction-lm-backup') {
				restoreInProgress = false;
				return errorResponse(
					c,
					`Invalid backup format: expected "llm-fraction-lm-backup", got "${manifest.format}"`,
					400,
				);
			}

			// ── Step 2: Parse curriculum ──────────────────────────────────
			const curriculumFile = zip.file('data/curriculum.json');
			if (!curriculumFile) {
				restoreInProgress = false;
				return errorResponse(
					c,
					'Invalid backup: data/curriculum.json not found',
					400,
				);
			}

			const curriculumText = await curriculumFile.async('text');
			let curriculum: BackupTopic[];

			try {
				curriculum = JSON.parse(curriculumText);
			} catch {
				restoreInProgress = false;
				return errorResponse(
					c,
					'Invalid backup: curriculum.json is not valid JSON',
					400,
				);
			}

			if (!Array.isArray(curriculum)) {
				restoreInProgress = false;
				return errorResponse(
					c,
					'Invalid backup: curriculum.json must be an array',
					400,
				);
			}

			// ── Step 3: Parse settings (optional) ────────────────────────
			let settings: Record<string, string> | null = null;
			const includeSettings = c.req.query('includeSettings') === 'true';
			if (includeSettings && manifest.includesSettings) {
				const settingsFile = zip.file('data/settings.json');
				if (settingsFile) {
					try {
						settings = JSON.parse(await settingsFile.async('text'));
					} catch {
						// Non-fatal: skip settings if malformed
						console.warn(
							'Restore: settings.json is malformed, skipping',
						);
					}
				}
			}

			// ── Step 4: Database cleanup ──────────────────────────────────
			// Delete all Topics → cascades SubTopics → Materials → Questions
			// and all related progress/session/chatlog data via FK cascades
			console.log('Restore: Phase 1 — Database cleanup...');
			const allTopics = await db.orm.public.Topic.all();
			for (const topic of allTopics) {
				await db.orm.public.Topic.where({ id: topic.id }).delete();
			}

			// Also clean up any orphaned AppSettings if we're restoring them
			if (settings) {
				const existingSettings = await db.orm.public.AppSetting.all();
				for (const s of existingSettings) {
					await db.orm.public.AppSetting.where({
						key: s.key,
					}).delete();
				}
			}

			// ── Step 5: Asset cleanup & restore ──────────────────────────
			console.log('Restore: Phase 2 — Asset cleanup & restore...');
			// Clear existing uploads (preserve .gitignore)
			if (existsSync(UPLOADS_DIR)) {
				const files = readdirSync(UPLOADS_DIR);
				for (const f of files) {
					if (f === '.gitignore') continue;
					try {
						unlinkSync(`${UPLOADS_DIR}/${f}`);
					} catch (err) {
						console.warn(
							`Restore: Failed to delete ${UPLOADS_DIR}/${f}:`,
							err,
						);
					}
				}
			}

			// Extract assets from ZIP → ./uploads/
			let assetsRestored = 0;
			const assetsFolder = zip.folder('assets');
			if (assetsFolder) {
				const assetFiles: { name: string; file: JSZip.JSZipObject }[] =
					[];
				assetsFolder.forEach((relativePath, zipEntry) => {
					if (!zipEntry.dir) {
						assetFiles.push({
							name: relativePath,
							file: zipEntry,
						});
					}
				});

				for (const { name, file: zipEntry } of assetFiles) {
					try {
						const buffer = await zipEntry.async('arraybuffer');
						await Bun.write(`${UPLOADS_DIR}/${name}`, buffer);
						assetsRestored++;
					} catch (err) {
						console.warn(
							`Restore: Failed to write asset ${name}:`,
							err,
						);
					}
				}
			}

			// ── Step 6: Data restore (top-down with ID remapping) ────────
			console.log('Restore: Phase 3 — Data restore...');
			let topicsCreated = 0;
			let subTopicsCreated = 0;
			let materialsCreated = 0;
			let questionsCreated = 0;

			for (const topicData of curriculum) {
				const newTopic = await db.orm.public.Topic.create({
					slug: topicData.slug,
					name: topicData.name,
					description: topicData.description,
					thumbnail: topicData.thumbnail,
					order: topicData.order,
				});
				topicsCreated++;

				for (const stData of topicData.subTopics) {
					const newSubTopic = await db.orm.public.SubTopic.create({
						topicId: newTopic.id,
						slug: stData.slug,
						name: stData.name,
						description: stData.description,
						thumbnail: stData.thumbnail,
						order: stData.order,
					});
					subTopicsCreated++;

					for (const matData of stData.materials) {
						const newMaterial = await db.orm.public.Material.create(
							{
								subTopicId: newSubTopic.id,
								title: matData.title,
								order: matData.order,
								content: matData.content as never,
								materialLlmContext: matData.materialLlmContext,
								difficulty: matData.difficulty,
								isExerciseOnly: matData.isExerciseOnly,
							},
						);
						materialsCreated++;

						for (const qData of matData.questions) {
							await db.orm.public.Question.create({
								materialId: newMaterial.id,
								learningObjective: qData.learningObjective,
								questionUi: qData.questionUi as never,
								questionLlmContext: qData.questionLlmContext,
								evaluationParameters:
									qData.evaluationParameters as never,
								answers: qData.answers as never,
							});
							questionsCreated++;
						}
					}
				}
			}

			// ── Step 7: Restore settings (optional) ──────────────────────
			let settingsRestored = false;
			if (settings) {
				for (const [key, value] of Object.entries(settings)) {
					try {
						// Upsert: try create, if exists → update
						const existing = await db.orm.public.AppSetting.where({
							key,
						}).first();
						if (existing) {
							await db.orm.public.AppSetting.where({
								key,
							}).update({ value });
						} else {
							await db.orm.public.AppSetting.create({
								key,
								value,
							});
						}
					} catch (err) {
						console.warn(
							`Restore: Failed to restore setting ${key}:`,
							err,
						);
					}
				}
				settingsRestored = true;
			}

			console.log(
				`Restore complete: ${topicsCreated} topics, ${subTopicsCreated} subtopics, ${materialsCreated} materials, ${questionsCreated} questions, ${assetsRestored} assets`,
			);

			return successResponse(c, 'Restore completed successfully', {
				topicsCreated,
				subTopicsCreated,
				materialsCreated,
				questionsCreated,
				assetsRestored,
				settingsRestored,
			});
		} catch (error) {
			console.error('Restore error:', error);
			return errorResponse(
				c,
				`Restore failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
				500,
			);
		} finally {
			restoreInProgress = false;
		}
	});
