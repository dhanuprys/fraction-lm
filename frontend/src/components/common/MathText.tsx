/* ─────────────────────────────────────────────────────────────────────────────
 *  MathText — KaTeX Math & Text Component
 *  ──────────────────────────────────────────────────────────────────────────
 *  Parses a string that may contain inline math ($...$) or display math ($$...$$)
 *  and renders the math parts using react-katex (KaTeX), while leaving standard
 *  text intact.
 * ───────────────────────────────────────────────────────────────────────── */

import React from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface MathTextProps {
  text: string;
  className?: string;
}

export function MathText({ text, className }: MathTextProps) {
  if (!text) return null;

  // If there are no dollar signs, return plain text directly
  if (!text.includes("$")) {
    return <span className={className}>{text}</span>;
  }

  // Regex matches $$...$$ (display math) or $...$ (inline math)
  // Non-greedy capture groups
  const regex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g;
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith("$$") && part.endsWith("$$")) {
          const math = part.slice(2, -2).trim();
          try {
            return (
              <span key={index} className="inline-block my-1">
                <BlockMath math={math} />
              </span>
            );
          } catch {
            return <span key={index}>{part}</span>;
          }
        }

        if (part.startsWith("$") && part.endsWith("$")) {
          let math = part.slice(1, -1).trim();
          // Upgrade \frac to \dfrac for full-size legible digits and comfortable vertical clearance
          if (math.includes("\\frac") && !math.includes("\\dfrac")) {
            math = math.replace(/\\frac/g, "\\dfrac");
          }
          try {
            return (
              <span key={index} className="inline-flex items-center align-middle mx-0.5">
                <InlineMath math={math} />
              </span>
            );
          } catch {
            return <span key={index}>{part}</span>;
          }
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
