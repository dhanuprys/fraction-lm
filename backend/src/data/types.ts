/* ─────────────────────────────────────────────────────────────────────────────
 *  Question Type System — Shared Definitions
 *  ──────────────────────────────────────────────────────────────────────────
 *  This file defines the discriminated question types and their answer-widget
 *  configurations.  It is consumed by the seed data (topic1.ts, etc.) and its
 *  shapes are mirrored in the frontend API types.
 *
 *  The `answerConfig` union drives the interactive UI widget the student sees.
 *  The `questionLlmContext` and `evaluationParameters` are what the tutor AI
 *  uses for evaluation — these are plain text / JSON, never the widget state.
 * ───────────────────────────────────────────────────────────────────────── */

// ─── Question Type Discriminator ────────────────────────────────────────────

export type QuestionType =
	| 'short_answer' // Free text via chat (current default)
	| 'true_false_table' // Table of statements → Benar / Salah
	| 'fraction_input' // Fill numerator / denominator boxes
	| 'fraction_identify' // Look at diagram, write the fraction
	| 'fraction_comparison' // Pick >, <, or = between fraction pairs
	| 'fraction_ordering' // Order fractions with drag-and-drop / sortable cards
	| 'grid_coloring' // Color cells in an N×M grid
	| 'numeric' // Single number input
	| 'multiple_choice'; // Select one option from choices

// ─── Answer Widget Configs (discriminated by questionType) ──────────────────

export interface TrueFalseTableConfig {
	statements: string[];
	/** Column headers; defaults to ['Benar', 'Salah'] */
	labels?: [string, string];
}

export interface FractionInputConfig {
	fields: Array<{
		prompt: string;
		/** Pre-filled values (read-only); null = blank for student to fill */
		prefilled?: { numerator?: number; denominator?: number };
	}>;
}

export interface GridColoringConfig {
	rows: number;
	cols: number;
	instructions: Array<{
		/** e.g. "50/100" */
		fraction: string;
		/** CSS color name or hex */
		color: string;
		/** Display label, e.g. "pensil merah" */
		label: string;
	}>;
}

export interface NumericConfig {
	prompt?: string;
	/** e.g. "potong" */
	unit?: string;
}

export interface MultipleChoiceConfig {
	choices: Array<{
		label: string;
		value: string;
	}>;
}

export interface FractionIdentifyConfig {
	/** Each diagram the student must identify a fraction for */
	diagrams: Array<{
		type: 'rectangle' | 'circle';
		/** Total equal-sized divisions */
		totalParts: number;
		/** 0-indexed list of shaded part indices */
		shadedParts: number[];
		/** Grid layout — required for rectangles */
		rows?: number;
		cols?: number;
	}>;
}

export interface FractionComparisonConfig {
	/** Each pair the student must compare with >, <, or = */
	items: Array<{
		/** Optional display prompt, e.g. "3/6 lebih besar dari 3/8" */
		prompt?: string;
		/** Left fraction as string, e.g. "3/6" */
		leftFraction: string;
		/** Right fraction as string, e.g. "3/8" */
		rightFraction: string;
	}>;
}

export interface FractionOrderingConfig {
	/** Fractions to order in initial displayed order, e.g. ['17/100', '65/100', '15/100', '39/100'] */
	items: string[];
	/** Separator symbol between adjacent slots, defaults to '<' */
	separator?: '<' | '>';
	/** Optional prompt instruction */
	instruction?: string;
}

// ─── Union ──────────────────────────────────────────────────────────────────

export type AnswerConfig =
	| TrueFalseTableConfig
	| FractionInputConfig
	| GridColoringConfig
	| NumericConfig
	| MultipleChoiceConfig
	| FractionIdentifyConfig
	| FractionComparisonConfig
	| FractionOrderingConfig;

// ─── Evaluation Parameters ─────────────────────────────────────────────────

export interface EvaluationParameters {
	expected_answer_keywords: string[];
	common_misconceptions?: string[];
	strictness_level: 'lenient' | 'medium' | 'strict';
	hints: string[];
	/** For true_false_table: expected truth value per row, indexed from 0 */
	expected_row_answers?: boolean[];
	/** For fraction_comparison: expected operator per row ('>' | '<' | '=') */
	expected_operators?: string[];
	/** For grid_coloring: expected colored-cell count keyed by color */
	expected_grid_state?: Record<string, number>;
}

// ─── Question Seed Data Shape ───────────────────────────────────────────────

export interface QuestionSeedData {
	learningObjective: string;
	questionType: QuestionType;
	/** TipTap AST for the visual question display */
	questionUi: unknown;
	/** Widget configuration — drives the interactive answer UI */
	answerConfig?: AnswerConfig;
	/** Plain text context the tutor LLM uses to understand the question */
	questionLlmContext: string;
	/** Evaluation params for the tutor AI (keywords, hints, misconceptions) */
	evaluationParameters: EvaluationParameters;
	/** Canonical correct answer (stored in DB, never exposed to students) */
	answers: Record<string, unknown>;
}
