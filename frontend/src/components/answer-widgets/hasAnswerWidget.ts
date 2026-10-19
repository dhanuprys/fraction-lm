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
    "fraction_classification",
    "fraction_expansion",
    "pizza_slice_marker",
    "fraction_equivalence",
    "sentence_completion",
    "numeric",
    "multiple_choice",
  ].includes(questionType);
}
