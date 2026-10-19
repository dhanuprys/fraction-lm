export const APP_SETTINGS = {
	AI_MODEL: 'ai_model',
} as const;

export const AVAILABLE_AI_MODELS = [
	'deepseek-chat',
	'deepseek-v4-flash',
	'deepseek-v4-pro',
] as const;

export type AppSettingKey = (typeof APP_SETTINGS)[keyof typeof APP_SETTINGS];
export type AvailableAiModel = (typeof AVAILABLE_AI_MODELS)[number];

export const DEFAULT_AI_MODEL: AvailableAiModel = 'deepseek-v4-flash';

export interface AiModelDetail {
	id: AvailableAiModel;
	name: string;
	tag: string;
	description: string;
	recommended?: boolean;
}

export const AI_MODEL_DETAILS: readonly AiModelDetail[] = [
	{
		id: 'deepseek-v4-flash',
		name: 'DeepSeek V4 Flash',
		tag: 'Cepat & Default',
		description:
			'Model ultra cepat dan efisien. Direkomendasikan untuk sesi interaktif siswa.',
		recommended: true,
	},
	{
		id: 'deepseek-chat',
		name: 'DeepSeek Chat',
		tag: 'Seimbang',
		description:
			'Model percakapan umum yang seimbang antara kecepatan dan pemahaman konteks.',
	},
	{
		id: 'deepseek-v4-pro',
		name: 'DeepSeek V4 Pro',
		tag: 'Penalaran Tinggi',
		description:
			'Model performa tinggi dengan penalaran matematika mendalam untuk analisis kompleks.',
	},
] as const;

export function isValidAiModel(model: unknown): model is AvailableAiModel {
	return (
		typeof model === 'string' &&
		(AVAILABLE_AI_MODELS as readonly string[]).includes(model)
	);
}

