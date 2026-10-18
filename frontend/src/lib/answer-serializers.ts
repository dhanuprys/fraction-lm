/* ─────────────────────────────────────────────────────────────────────────────
 *  Answer Serializers
 *  ──────────────────────────────────────────────────────────────────────────
 *  Each function converts structured answer-widget state into LaTeX-formatted
 *  text that both renders beautifully in the student chat bubble via KaTeX
 *  and allows the tutor LLM to evaluate using mathematical notation.
 * ───────────────────────────────────────────────────────────────────────── */

import { toLatexFrac } from "./latex-utils";

// ─── True / False Table ─────────────────────────────────────────────────────

export function serializeTrueFalseTable(
  statements: string[],
  answers: Record<number, boolean | null>,
): string {
  const lines = statements.map((s, i) => {
    const a = answers[i];
    const label = a === true ? "Benar" : a === false ? "Salah" : "(belum dijawab)";
    return `- Pernyataan ${i + 1} (${s}): **${label}**`;
  });
  return `Jawaban saya untuk tabel Benar/Salah:\n\n${lines.join("\n")}`;
}

// ─── Fraction Input ─────────────────────────────────────────────────────────

export interface FractionFieldValue {
  prompt?: string;
  mode?: "fraction" | "identify";
  displayFraction?: { numerator: number; denominator: number };
  numerator: number | null;
  denominator: number | null;
}

export function serializeFractionInput(fields: FractionFieldValue[]): string {
  if (fields.length === 1) {
    const f = fields[0];
    const n = f.numerator ?? "?";
    const d = f.denominator ?? "?";
    if (f.mode === "identify" && f.displayFraction) {
      return `Jawaban pecahan saya untuk $\\frac{${f.displayFraction.numerator}}{${f.displayFraction.denominator}}$: Pembilang = ${n}, Penyebut = ${d}`;
    }
    const promptStr = f.prompt ? `${f.prompt} → ` : "";
    return `Jawaban pecahan saya: ${promptStr}$\\frac{${n}}{${d}}$`;
  }
  const lines = fields.map((f, i) => {
    const n = f.numerator ?? "?";
    const d = f.denominator ?? "?";
    if (f.mode === "identify" && f.displayFraction) {
      return `- Soal ${i + 1} (${f.prompt || `Pecahan $\\frac{${f.displayFraction.numerator}}{${f.displayFraction.denominator}}$`}): Pembilang = **${n}**, Penyebut = **${d}**`;
    }
    const promptStr = f.prompt ? `${f.prompt} → ` : "";
    return `- Soal ${i + 1}: ${promptStr}$\\frac{${n}}{${d}}$`;
  });
  return `Jawaban pecahan saya:\n\n${lines.join("\n")}`;
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
    const fractionLatex = toLatexFrac(inst.fraction);
    return `- ${inst.label}: $\\frac{${count}}{${total}}$ kotak diwarnai (diminta $${fractionLatex}$)`;
  });
  return `Jawaban pewarnaan grid saya:\n\n${counts.join("\n")}`;
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
  if (answers.length === 1) {
    const n = answers[0].numerator ?? "?";
    const d = answers[0].denominator ?? "?";
    return `Jawaban pecahan dari gambar: $\\frac{${n}}{${d}}$`;
  }
  const lines = answers.map((a, i) => {
    const n = a.numerator ?? "?";
    const d = a.denominator ?? "?";
    return `- Gambar ${i + 1}: $\\frac{${n}}{${d}}$`;
  });
  return `Jawaban pecahan dari gambar:\n\n${lines.join("\n")}`;
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
  if (items.length === 1) {
    const op = answers[0];
    const left = toLatexFrac(items[0].leftFraction);
    const right = toLatexFrac(items[0].rightFraction);
    if (!op) {
      return `Jawaban perbandingan pecahan saya: $${left}$ dan $${right}$ (belum dijawab)`;
    }
    return `Jawaban perbandingan pecahan saya: $${left} ${op} ${right}$`;
  }
  const lines = items.map((item, i) => {
    const op = answers[i];
    const left = toLatexFrac(item.leftFraction);
    const right = toLatexFrac(item.rightFraction);
    if (!op) {
      return `- Soal ${i + 1}: $${left}$ dan $${right}$ (belum dijawab)`;
    }
    return `- Soal ${i + 1}: $${left} ${op} ${right}$`;
  });
  return `Jawaban perbandingan pecahan saya:\n\n${lines.join("\n")}`;
}

// ─── Fraction Ordering ──────────────────────────────────────────────────────

export function serializeFractionOrdering(
  orderedFractions: string[],
  separator: string = "<",
): string {
  const latexFractions = (orderedFractions || []).map((f) => toLatexFrac(f));
  const expression = latexFractions.join(` ${separator} `);
  return `Urutan pecahan saya dari yang terkecil hingga terbesar:\n\n$${expression}$`;
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

    case "fraction_input": {
      const configFields = answerConfig?.fields || [];
      const mergedFields = configFields.map((f: any, i: number) => ({
        prompt: f.prompt || "",
        mode: f.mode,
        displayFraction: f.displayFraction,
        numerator: widgetValue?.[i]?.numerator ?? null,
        denominator: widgetValue?.[i]?.denominator ?? null,
      }));
      return serializeFractionInput(mergedFields.length > 0 ? mergedFields : (widgetValue || []));
    }

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
