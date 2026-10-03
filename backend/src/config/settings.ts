export const APP_SETTINGS = {
	AI_MODEL: "ai_model",
} as const;

export const AVAILABLE_AI_MODELS = [
	"deepseek-chat",
	"deepseek-v4-flash",
	"deepseek-v4-pro",
] as const;

export type AppSettingKey = (typeof APP_SETTINGS)[keyof typeof APP_SETTINGS];
export type AvailableAiModel = (typeof AVAILABLE_AI_MODELS)[number];
