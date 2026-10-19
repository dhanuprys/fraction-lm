export const AVAILABLE_AI_MODELS = [
  "deepseek-chat",
  "deepseek-v4-flash",
  "deepseek-v4-pro",
] as const;

export type AvailableAiModel = (typeof AVAILABLE_AI_MODELS)[number];

export const DEFAULT_AI_MODEL: AvailableAiModel = "deepseek-v4-flash";

export interface AiModelMeta {
  value: AvailableAiModel;
  label: string;
  tag: string;
  description: string;
}

export const AI_MODEL_OPTIONS: readonly AiModelMeta[] = [
  {
    value: "deepseek-v4-flash",
    label: "DeepSeek V4 Flash",
    tag: "Cepat & Default",
    description: "Model ultra cepat dan efisien. Ideal untuk respons interaktif murid.",
  },
  {
    value: "deepseek-chat",
    label: "DeepSeek Chat",
    tag: "Seimbang",
    description: "Model percakapan umum yang seimbang.",
  },
  {
    value: "deepseek-v4-pro",
    label: "DeepSeek V4 Pro",
    tag: "Penalaran Tinggi",
    description: "Model dengan penalaran matematika paling mendalam untuk analisis kompleks.",
  },
] as const;

/**
 * Returns a human-friendly display label for any AI model value or null/empty.
 */
export function getAiModelLabel(model?: string | null, withTag = false): string {
  if (!model) return "Default Sistem (Global)";
  const found = AI_MODEL_OPTIONS.find((opt) => opt.value === model);
  if (!found) return model;
  return withTag ? `${found.label} (${found.tag})` : found.label;
}

/**
 * Returns dropdown options for user override selection (including "Default Sistem").
 */
export function getUserAiModelSelectOptions() {
  return [
    { value: "", label: "Default Sistem (Global)" },
    ...AI_MODEL_OPTIONS.map((opt) => ({
      value: opt.value,
      label: `${opt.label} — ${opt.tag}`,
    })),
  ];
}

/**
 * Returns dropdown options for global system settings.
 */
export function getGlobalAiModelSelectOptions() {
  return AI_MODEL_OPTIONS.map((opt) => ({
    value: opt.value,
    label: `${opt.label} — ${opt.tag}`,
  }));
}
