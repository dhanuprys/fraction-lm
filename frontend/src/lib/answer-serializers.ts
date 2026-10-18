/* ─────────────────────────────────────────────────────────────────────────────
 *  Answer Serializers
 *  ──────────────────────────────────────────────────────────────────────────
 *  Each function converts structured answer-widget state into plain-text that
 *  the tutor LLM can evaluate using its existing keyword / misconception
 *  matching.  The serialized text is sent as a regular chat message.
 * ───────────────────────────────────────────────────────────────────────── */

// ─── True / False Table ─────────────────────────────────────────────────────

export function serializeTrueFalseTable(
  statements: string[],
  answers: Record<number, boolean | null>,
): string {
  const lines = statements.map((s, i) => {
    const a = answers[i];
    const label = a === true ? "Benar" : a === false ? "Salah" : "(belum dijawab)";
    return `${i + 1}. "${s}" → ${label}`;
  });
  return `Jawaban saya untuk tabel Benar/Salah:\n${lines.join("\n")}`;
}

// ─── Fraction Input ─────────────────────────────────────────────────────────

export interface FractionFieldValue {
  prompt: string;
  numerator: number | null;
  denominator: number | null;
}

export function serializeFractionInput(fields: FractionFieldValue[]): string {
  const lines = fields.map((f, i) => {
    const n = f.numerator ?? "?";
    const d = f.denominator ?? "?";
    return `${i + 1}. ${f.prompt || "Pecahan"} → ${n}/${d}`;
  });
  return `Jawaban pecahan saya:\n${lines.join("\n")}`;
}

// ─── Grid Coloring ──────────────────────────────────────────────────────────

export interface GridInstruction {
  fraction: string;
  color: string;
  label: string;
}

export function serializeGridColoring(
  grid: (string | null)[][],
  instructions: GridInstruction[],
): string {
  const total = grid.length * (grid[0]?.length ?? 0);
  const counts = instructions.map((inst) => {
    const count = grid.flat().filter((c) => c === inst.color).length;
    return `- ${inst.label}: ${count}/${total} kotak diwarnai (diminta ${inst.fraction})`;
  });
  return `Jawaban pewarnaan grid saya:\n${counts.join("\n")}`;
}

// ─── Numeric ────────────────────────────────────────────────────────────────

export function serializeNumeric(value: number | null, unit?: string): string {
  if (value === null) return "Jawaban saya: (belum dijawab)";
  return `Jawaban saya: ${value}${unit ? ` ${unit}` : ""}`;
}

// ─── Multiple Choice ────────────────────────────────────────────────────────

export interface ChoiceOption {
  label: string;
  value: string;
}

export function serializeMultipleChoice(choices: ChoiceOption[], selected: string | null): string {
  if (!selected) return "Jawaban saya: (belum dipilih)";
  const choice = choices.find((c) => c.value === selected);
  return `Jawaban saya: ${choice?.label || selected}`;
}

// ─── Fraction Identify (from diagrams) ──────────────────────────────────────

export interface FractionIdentifyValue {
  numerator: number | null;
  denominator: number | null;
}

export function serializeFractionIdentify(answers: FractionIdentifyValue[]): string {
  const lines = answers.map((a, i) => {
    const n = a.numerator ?? "?";
    const d = a.denominator ?? "?";
    return `Gambar ${i + 1}: ${n}/${d}`;
  });
  return `Jawaban pecahan dari gambar:\n${lines.join("\n")}`;
}

// ─── Fraction Comparison ────────────────────────────────────────────────────

export interface FractionComparisonItem {
  leftFraction: string;
  rightFraction: string;
  prompt?: string;
}

export function serializeFractionComparison(
  items: FractionComparisonItem[],
  answers: Record<number, string | null>,
): string {
  const lines = items.map((item, i) => {
    const op = answers[i] ?? "(belum dijawab)";
    return `${i + 1}. ${item.leftFraction} ${op} ${item.rightFraction}`;
  });
  return `Jawaban perbandingan pecahan saya:\n${lines.join("\n")}`;
}

// ─── Fraction Ordering ──────────────────────────────────────────────────────

export function serializeFractionOrdering(
  orderedFractions: string[],
  separator: string = "<",
): string {
  const expression = (orderedFractions || []).join(` ${separator} `);
  return `Urutan pecahan saya dari yang terkecil hingga terbesar:\n${expression}`;
}

// ─── Dispatcher ─────────────────────────────────────────────────────────────
// Convenience function to serialize any widget value based on question type.

export function serializeAnswer(
  questionType: string,
  answerConfig: any,
  widgetValue: any,
): string {
  switch (questionType) {
    case "true_false_table":
      return serializeTrueFalseTable(answerConfig?.statements || [], widgetValue || {});

    case "fraction_input":
      return serializeFractionInput(widgetValue || []);

    case "grid_coloring":
      return serializeGridColoring(widgetValue || [[]], answerConfig?.instructions || []);

    case "numeric":
      return serializeNumeric(widgetValue, answerConfig?.unit);

    case "multiple_choice":
      return serializeMultipleChoice(answerConfig?.choices || [], widgetValue);

    case "fraction_identify":
      return serializeFractionIdentify(widgetValue || []);

    case "fraction_comparison":
      return serializeFractionComparison(answerConfig?.items || [], widgetValue || {});

    case "fraction_ordering":
      return serializeFractionOrdering(
        widgetValue || answerConfig?.items || [],
        answerConfig?.separator || "<",
      );

    default:
      return typeof widgetValue === "string" ? widgetValue : JSON.stringify(widgetValue);
  }
}
