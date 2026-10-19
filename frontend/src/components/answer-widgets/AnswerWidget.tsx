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
import { FractionClassification } from "./FractionClassification";
import { FractionExpansion } from "./FractionExpansion";
import { PizzaSliceMarker } from "./PizzaSliceMarker";
import { FractionEquivalence } from "./FractionEquivalence";
import { SentenceCompletion } from "./SentenceCompletion";
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
        <NumericInput config={answerConfig} value={value} onChange={onChange} disabled={disabled} />
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

    case "fraction_classification":
      return (
        <FractionClassification
          config={answerConfig}
          value={value || {}}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "fraction_expansion":
      return (
        <FractionExpansion
          config={answerConfig}
          value={value || {}}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "pizza_slice_marker":
      return (
        <PizzaSliceMarker
          config={answerConfig}
          value={value || {}}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "fraction_equivalence":
      return (
        <FractionEquivalence
          config={answerConfig}
          value={value || {}}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case "sentence_completion":
      return (
        <SentenceCompletion
          config={answerConfig}
          value={value || {}}
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
