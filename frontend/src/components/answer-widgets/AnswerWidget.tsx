/* ─────────────────────────────────────────────────────────────────────────────
 *  AnswerWidget — Dispatcher Component
 *  ──────────────────────────────────────────────────────────────────────────
 *  Renders the correct interactive answer widget based on `questionType`.
 *  For `short_answer` (or unknown types), returns null — the chat input
 *  handles those questions entirely.
 * ───────────────────────────────────────────────────────────────────────── */

import { TrueFalseTable } from "./TrueFalseTable";
import { FractionInput } from "./FractionInput";
import { ColorableGrid } from "./ColorableGrid";
import { FractionIdentify } from "./FractionIdentify";
import { FractionComparison } from "./FractionComparison";
import { FractionOrdering } from "./FractionOrdering";
import { NumericInput } from "./NumericInput";
import { MultipleChoice } from "./MultipleChoice";

export interface AnswerWidgetProps {
  questionType: string;
  answerConfig: any;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export function AnswerWidget({
  questionType,
  answerConfig,
  value,
  onChange,
  disabled,
}: AnswerWidgetProps) {
  if (!answerConfig) return null;

  switch (questionType) {
    case "true_false_table":
      return (
        <TrueFalseTable
          config={answerConfig}
          value={value || {}}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "fraction_input":
      return (
        <FractionInput
          config={answerConfig}
          value={value || []}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "grid_coloring":
      return (
        <ColorableGrid
          config={answerConfig}
          value={value || []}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "fraction_identify":
      return (
        <FractionIdentify
          config={answerConfig}
          value={value || []}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "numeric":
      return (
        <NumericInput
          config={answerConfig}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "fraction_comparison":
      return (
        <FractionComparison
          config={answerConfig}
          value={value || {}}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "fraction_ordering":
      return (
        <FractionOrdering
          config={answerConfig}
          value={value || []}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "multiple_choice":
      return (
        <MultipleChoice
          config={answerConfig}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "short_answer":
    default:
      // No widget — the chat text input handles short_answer entirely
      return null;
  }
}

/** Returns true when the given questionType uses a structured answer widget
 *  (as opposed to pure-chat short_answer). */
export function hasAnswerWidget(questionType: string): boolean {
  return [
    "true_false_table",
    "fraction_input",
    "grid_coloring",
    "fraction_identify",
    "fraction_comparison",
    "fraction_ordering",
    "numeric",
    "multiple_choice",
  ].includes(questionType);
}

