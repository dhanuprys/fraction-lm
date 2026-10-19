import {
	APP_SETTINGS,
	DEFAULT_AI_MODEL,
	isValidAiModel,
	type AvailableAiModel,
} from '../../config/settings';
import { db } from '../../prisma/db';

export interface ResolvedAiInfo {
	/** The final AI model to be used by the engine */
	model: string;
	/** Whether the model is an explicit override for this user */
	isOverride: boolean;
	/** Where the model originated from */
	source: 'user_override' | 'app_setting' | 'system_default';
	/** The system-wide global model currently configured */
	globalModel: string;
}

/**
 * Gets the configured global AI model from AppSetting, with fallback to DEFAULT_AI_MODEL.
 */
export async function getGlobalAiModel(): Promise<string> {
	try {
		const setting = await db.orm.public.AppSetting.where({
			key: APP_SETTINGS.AI_MODEL,
		}).first();
		if (setting?.value && isValidAiModel(setting.value)) {
			return setting.value;
		}
	} catch (error) {
		console.error('[AI Model] Failed to fetch global ai_model setting:', error);
	}
	return DEFAULT_AI_MODEL;
}

/**
 * Resolves full AI configuration and metadata for a given user or global context.
 * Hierarchy: User Override (if exists & valid) -> Global AppSetting -> System Default
 */
export async function getAiInfoForUser(
	userId?: number | null,
): Promise<ResolvedAiInfo> {
	const globalModel = await getGlobalAiModel();

	if (!userId) {
		return {
			model: globalModel,
			isOverride: false,
			source:
				globalModel === DEFAULT_AI_MODEL
					? 'system_default'
					: 'app_setting',
			globalModel,
		};
	}

	try {
		const user = await db.orm.public.User.where({ id: userId }).first();
		if (user?.aiModel && isValidAiModel(user.aiModel)) {
			return {
				model: user.aiModel,
				isOverride: true,
				source: 'user_override',
				globalModel,
			};
		}
	} catch (error) {
		console.error(
			`[AI Model] Failed to resolve aiModel for user ${userId}:`,
			error,
		);
	}

	return {
		model: globalModel,
		isOverride: false,
		source:
			globalModel === DEFAULT_AI_MODEL
				? 'system_default'
				: 'app_setting',
		globalModel,
	};
}

/**
 * Convenience helper that resolves only the effective AI model name string.
 */
export async function getEffectiveAiModel(
	userId?: number | null,
): Promise<string> {
	const info = await getAiInfoForUser(userId);
	return info.model;
}
