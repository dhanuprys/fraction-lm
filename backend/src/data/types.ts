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
	| 'fraction_classification' // Classify fractions into colored category badges/pills
	| 'fraction_expansion' // Fill multiplier numbers in fraction expansion equations
	| 'pizza_slice_marker' // Mark/select slices on interactive pizza models
	| 'fraction_equivalence' // Complete equivalent fractions and short mathematical notation
	| 'sentence_completion' // Fill sentence blanks and inequality reasoning
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
		mode?: 'fraction' | 'identify';
		displayFraction?: { numerator: number; denominator: number };
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
		type: 'rectangle' | 'circle' | 'diagonal_rectangle';
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

export interface FractionClassificationConfig {
	/** Each fraction to classify */
	items: Array<{
		prompt?: string;
		/** Fraction string, e.g. "5/4" */
		fraction: string;
	}>;
	/** Available categories (e.g. Sejati (Biru), Tidak Sejati (Merah)) */
	categories: Array<{
		key: string;
		label: string;
		badge?: string;
		color?: 'blue' | 'red' | 'green' | 'purple' | 'amber';
	}>;
}

export interface FractionExpansionConfig {
	/** Each expansion equation with unknown multiplier */
	items: Array<{
		prompt?: string;
		/** Left starting fraction, e.g. "2/5" */
		originalFraction: string;
		/** Right expanded fraction, e.g. "4/10" */
		targetFraction: string;
	}>;
}

export interface PizzaSliceMarkerConfig {
	pizzas: Array<{
		label: string;
		totalSlices: number;
		targetFraction?: string;
		helperText?: string;
	}>;
	instruction?: string;
}

export interface FractionEquivalenceConfig {
	items: Array<{
		baseFraction: string;
		prompt?: string;
	}>;
}

export interface SentenceCompletionConfig {
	sections: Array<{
		title: string;
		badge?: string;
		fractionMath?: string;
		blanks: Array<{
			id: string;
			prefix?: string;
			suffix?: string;
			options: Array<{ value: string; label: string }>;
			placeholder?: string;
		}>;
	}>;
	inequalityCard?: {
		title: string;
		chainPrompt: string;
		leftSlot: { id: string; placeholder?: string; options: string[] };
		rightSlot: { id: string; placeholder?: string; options: string[] };
		conclusionPrompt: string;
		conclusionLeftSlot: { id: string; options: string[] };
		conclusionOperator?: string;
		conclusionRightSlot: { id: string; options: string[] };
	};
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
	| FractionOrderingConfig
	| FractionClassificationConfig
	| FractionExpansionConfig
	| PizzaSliceMarkerConfig
	| FractionEquivalenceConfig
	| SentenceCompletionConfig;

// ─── Evaluation Parameters ─────────────────────────────────────────────────

export interface EvaluationParameters {
	expected_answer_keywords: string[];
	common_misconceptions?: string[];
	strictness_level: 'lenient' | 'medium' | 'moderate' | 'strict';
	hints?: string[];
	/** For true_false_table: expected truth value per row, indexed from 0 */
	expected_row_answers?: boolean[];
	/** For fraction_comparison: expected operator per row ('>' | '<' | '=') */
	expected_operators?: string[];
	/** For grid_coloring: expected colored-cell count keyed by color */
	expected_grid_state?: Record<string, number>;
	/** For fraction_classification: expected category key per item index */
	expected_classifications?: Record<number, string>;
	/** For fraction_expansion: expected multiplier number per item index */
	expected_multipliers?: Record<number, number>;
	/** For pizza_slice_marker: expected slice count per pizza index */
	expected_pizza_slices?: Record<number, number>;
	/** For sentence_completion: expected option value per blank id */
	expected_sentence_blanks?: Record<string, string>;
}

// ─── Question Seed Data Shape ───────────────────────────────────────────────

export interface QuestionSeedData {
	learningObjective: string;
	questionType?: QuestionType;
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
