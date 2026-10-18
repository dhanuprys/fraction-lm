/* ─────────────────────────────────────────────────────────────────────────────
 *  latex-utils — LaTeX Formatting & Markdown Preprocessing Helpers
 *  ──────────────────────────────────────────────────────────────────────────
 *  Preprocesses text from LLMs, students, or serializers so that react-markdown,
 *  remark-math, and rehype-katex render math flawlessly without broken syntax.
 * ───────────────────────────────────────────────────────────────────────── */

/**
 * Converts a plain fraction string like "15/100" or "3/8" into LaTeX "\frac{15}{100}".
 * If useDfrac is true, produces "\dfrac{15}{100}".
 * If the string is already formatted as LaTeX or not a simple fraction, it is returned trimmed.
 */
export function toLatexFrac(fractionStr: string, useDfrac = false): string {
  if (!fractionStr) return "";
  const trimmed = fractionStr.trim();
  const fracCmd = useDfrac ? "\\dfrac" : "\\frac";
  if (trimmed.startsWith("\\frac") || trimmed.startsWith("\\dfrac") || trimmed.includes("$")) {
    return useDfrac ? trimmed.replace(/\\frac/g, "\\dfrac") : trimmed;
  }
  const parts = trimmed.split("/");
  if (parts.length === 2 && parts[0].trim() !== "" && parts[1].trim() !== "") {
    return `${fracCmd}{${parts[0].trim()}}{${parts[1].trim()}}`;
  }
  return trimmed;
}

/**
 * Preprocesses markdown text for KaTeX / remark-math:
 * 1. Converts display math `\[ ... \]` to `$$ ... $$`
 * 2. Converts inline math `\( ... \)` to `$ ... $`
 * 3. Trims display math `$$ ... $$`
 * 4. Trims inline math `$ ... $` and upgrades \frac to \dfrac for full legible display
 * 5. Wraps standalone `\frac{...}{...}` expressions that are outside dollar signs with $...$
 */
export function preprocessLatex(text: string): string {
  if (!text) return "";

  let result = text;

  // 1. Convert \[ ... \] to $$ ... $$
  result = result.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `$$\n${math.trim()}\n$$`);

  // 2. Convert \( ... \) to $ ... $
  result = result.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math.trim()}$`);

  // 3. Trim display math $$...$$
  result = result.replace(/\$\$([\s\S]+?)\$\$/g, (_, inner) => `$$\n${inner.trim()}\n$$`);

  // 4. Trim inline math $...$ safely without touching spaces outside dollars,
  // and upgrade \frac to \dfrac for full-size numbers and vertical clearance.
  result = result.replace(/\$([^$\n]+?)\$/g, (_, inner) => {
    const trimmed = inner.trim();
    const withDfrac = trimmed.replace(/\\frac/g, "\\dfrac");
    return `$${withDfrac}$`;
  });

  // 5. Wrap standalone \frac{...}{...} or \dfrac{...}{...} that are not already inside $ or $$
  result = result.replace(
    /(^|[^$])(\\d?frac\{[^{}]+\}\{[^{}]+\})([^$]|$)/g,
    (_, before, frac, after) => `${before}$${frac.replace(/\\frac/g, "\\dfrac")}$${after}`,
  );

  return result;
}
