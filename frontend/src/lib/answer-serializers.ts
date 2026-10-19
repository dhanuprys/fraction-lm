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

// ─── Fraction Classification ────────────────────────────────────────────────

export interface ClassificationCategory {
  key: string;
  label: string;
  badge?: string;
}

export interface ClassificationItem {
  fraction: string;
  prompt?: string;
}

export function serializeFractionClassification(
  items: ClassificationItem[],
  categories: ClassificationCategory[],
  answers: Record<number, string | null>,
): string {
  const lines = items.map((item, i) => {
    const key = answers[i];
    const cat = categories.find((c) => c.key === key);
    const fracLatex = toLatexFrac(item.fraction);
    const label = cat ? `${cat.label}${cat.badge ? ` (${cat.badge})` : ""}` : "(belum diklasifikasikan)";
    return `- Soal ${i + 1} ($${fracLatex}$): **${label}**`;
  });
  return `Jawaban klasifikasi pecahan saya:\n\n${lines.join("\n")}`;
}

// ─── Fraction Expansion ────────────────────────────────────────────────────

export interface ExpansionItem {
  originalFraction: string;
  targetFraction: string;
  prompt?: string;
}

export function serializeFractionExpansion(
  items: ExpansionItem[],
  multipliers: Record<number, number | null>,
): string {
  const lines = items.map((item, i) => {
    const mult = multipliers[i];
    const origLatex = toLatexFrac(item.originalFraction);
    const targetLatex = toLatexFrac(item.targetFraction);
    if (mult === null || mult === undefined) {
      return `- Soal ${i + 1} ($${origLatex} = \\dots = ${targetLatex}$): (belum dijawab)`;
    }
    const [origN, origD] = item.originalFraction.split("/").map((s) => s.trim());
    return `- Soal ${i + 1} ($${origLatex} = ${targetLatex}$): Bilangan pengali = **${mult}** ($\\frac{${origN} \\times ${mult}}{${origD} \\times ${mult}} = ${targetLatex}$)`;
  });
  return `Jawaban bilangan pengali perluasan pecahan saya:\n\n${lines.join("\n")}`;
}

export function serializePizzaSliceMarker(
  pizzas: Array<{ label: string; totalSlices: number; targetFraction?: string }>,
  value: Record<number, number[]>,
): string {
  const lines = pizzas.map((p, i) => {
    const slices = value[i] || [];
    const count = slices.length;
    return `- ${p.label}: **${count} dari ${p.totalSlices} potong** ditandai ($\\frac{${count}}{${p.totalSlices}}$)`;
  });
  return `Jawaban penandaan pecahan pizza saya:\n\n${lines.join("\n")}`;
}

export function serializeFractionEquivalence(
  items: Array<{ baseFraction: string }>,
  value: Record<number, { numerator: number | null; denominator: number | null }>,
): string {
  const lines = items.map((item, i) => {
    const val = value[i] || { numerator: null, denominator: null };
    const baseLatex = toLatexFrac(item.baseFraction);
    if (val.numerator === null || val.denominator === null) {
      return `- Soal ${i + 1} ($${baseLatex}$): (belum dijawab)`;
    }
    return `- Soal ${i + 1}: $${baseLatex}$ dan $\\frac{${val.numerator}}{${val.denominator}}$ adalah pecahan senilai. Notasi matematika: **$${baseLatex} = \\frac{${val.numerator}}{${val.denominator}}$**`;
  });
  return `Jawaban pecahan senilai saya:\n\n${lines.join("\n")}`;
}

export function serializeSentenceCompletion(
  config: any,
  value: Record<string, string | null>,
): string {
  const lines: string[] = [];
  const sections = config?.sections || [];
  sections.forEach((sec: any) => {
    lines.push(`**${sec.title}**:`);
    (sec.blanks || []).forEach((b: any) => {
      const selected = value[b.id];
      const opt = (b.options || []).find((o: any) => o.value === selected);
      const text = opt ? opt.label : selected || "(belum dipilih)";
      lines.push(`  - ${b.prefix || ""} **${text}** ${b.suffix || ""}`);
    });
  });

  if (config?.inequalityCard) {
    const card = config.inequalityCard;
    const leftVal = value[card.leftSlot?.id] || "?";
    const rightVal = value[card.rightSlot?.id] || "?";
    lines.push(`\n**${card.title}**:`);
    lines.push(`  - Rantai perbandingan: **$${leftVal} < 1 < ${rightVal}$**`);

    const concLeft = value[card.conclusionLeftSlot?.id] || "?";
    const concRight = value[card.conclusionRightSlot?.id] || "?";
    const op = card.conclusionOperator || "<";
    lines.push(`  - Kesimpulan: **$${concLeft} ${op} ${concRight}$**`);
  }

  return `Jawaban penalaran perbandingan pecahan saya:\n\n${lines.join("\n")}`;
}

// ─── Dispatcher ─────────────────────────────────────────────────────────────
// Convenience function to serialize any widget value based on question type.

export function serializeAnswer(questionType: string, answerConfig: any, widgetValue: any): string {
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
      return serializeFractionInput(mergedFields.length > 0 ? mergedFields : widgetValue || []);
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

    case "fraction_classification":
      return serializeFractionClassification(
        answerConfig?.items || [],
        answerConfig?.categories || [],
        widgetValue || {},
      );

    case "fraction_expansion":
      return serializeFractionExpansion(
        answerConfig?.items || [],
        widgetValue || {},
      );

    case "pizza_slice_marker":
      return serializePizzaSliceMarker(
        answerConfig?.pizzas || [],
        widgetValue || {},
      );

    case "fraction_equivalence":
      return serializeFractionEquivalence(
        answerConfig?.items || [],
        widgetValue || {},
      );

    case "sentence_completion":
      return serializeSentenceCompletion(
        answerConfig,
        widgetValue || {},
      );

    default:
      return typeof widgetValue === "string" ? widgetValue : JSON.stringify(widgetValue);
  }
}
