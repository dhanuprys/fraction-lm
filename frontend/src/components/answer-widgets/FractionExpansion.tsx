/* ─────────────────────────────────────────────────────────────────────────────
 *  FractionExpansion — Answer Widget
 *  ──────────────────────────────────────────────────────────────────────────
 *  Renders fraction expansion equations where the student determines the
 *  multiplier (bilangan pengali) that scales both numerator and denominator.
 *  Features auto-advance, sound feedback, live multiplier mirroring, and spacious
 *  KaTeX typography.
 *
 *  Value shape: Record<number, number | null>
 *    — keyed by item index (e.g. { 0: 2, 1: 4, 2: 4 })
 * ───────────────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import clsx from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { MathText } from "@/components/common/MathText";
import { useSoundStore } from "@/store/useSoundStore";

export interface FractionExpansionItem {
  prompt?: string;
  originalFraction: string;
  targetFraction: string;
}

export interface FractionExpansionConfig {
  items: FractionExpansionItem[];
}

interface Props {
  config: FractionExpansionConfig;
  value: Record<number, number | null>;
  onChange: (value: Record<number, number | null>) => void;
  disabled?: boolean;
}

function FractionDisplay({ fraction }: { fraction: string }) {
  let mathStr = fraction.trim();
  if (!mathStr.startsWith("\\") && mathStr.includes("/")) {
    const parts = mathStr.split("/");
    if (parts.length === 2) {
      mathStr = `\\dfrac{\\enspace ${parts[0].trim()} \\enspace}{\\enspace ${parts[1].trim()} \\enspace}`;
    }
  } else if (mathStr.startsWith("\\frac{")) {
    mathStr = mathStr.replace(
      /\\frac\{([^{}]+)\}\{([^{}]+)\}/,
      "\\dfrac{\\enspace $1 \\enspace}{\\enspace $2 \\enspace}",
    );
  } else if (mathStr.startsWith("\\dfrac{") && !mathStr.includes("\\enspace")) {
    mathStr = mathStr.replace(
      /\\dfrac\{([^{}]+)\}\{([^{}]+)\}/,
      "\\dfrac{\\enspace $1 \\enspace}{\\enspace $2 \\enspace}",
    );
  }

  return (
    <span className="text-xl sm:text-2xl text-purple-900 flex items-center justify-center select-none font-bold">
      <InlineMath
        math={mathStr}
        renderError={() => (
          <span className="font-bold text-lg text-purple-900">{fraction}</span>
        )}
      />
    </span>
  );
}

export function FractionExpansion({ config, value, onChange, disabled }: Props) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const playSFX = useSoundStore((s) => s.playSFX);

  const handleChange = (idx: number, raw: string) => {
    const trimmed = raw.trim();
    if (trimmed === "") {
      onChange({ ...value, [idx]: null });
    } else {
      const n = parseInt(trimmed, 10);
      if (!isNaN(n)) {
        playSFX("CLICK");
        onChange({ ...value, [idx]: n });
        // Auto-advance to next equation if available
        if (inputRefs.current[idx + 1]) {
          inputRefs.current[idx + 1]?.focus();
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {config.items.map((item, idx) => {
        const multiplier = value[idx] ?? null;
        const [origNum, origDen] = item.originalFraction.split("/").map((s) => s.trim());

        return (
          <div
            key={idx}
            className="flex flex-col gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs transition-all hover:border-purple-200"
          >
            {/* Header row: Index and prompt */}
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-700 m-0 leading-relaxed">
                {item.prompt ? (
                  <MathText text={item.prompt} />
                ) : (
                  <span>
                    Berapa bilangan pengali dari{" "}
                    <span className="font-bold text-purple-700">{item.originalFraction}</span> ke{" "}
                    <span className="font-bold text-purple-700">{item.targetFraction}</span>?
                  </span>
                )}
              </p>
            </div>

            {/* Equation visual row: a/b = (a x ?)/(b x ?) = c/d */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 py-4 px-5 rounded-2xl bg-slate-50/70 border border-slate-200/60">
              {/* Original Fraction */}
              <div className="py-2 px-4 rounded-xl bg-purple-50/80 border border-purple-200/80 shadow-3xs min-w-[3.75rem] min-h-[3.5rem] flex items-center justify-center">
                <FractionDisplay fraction={item.originalFraction} />
              </div>

              <span className="text-2xl font-black text-slate-400">=</span>

              {/* Expansion Fraction: (origNum x ?) / (origDen x ?) */}
              <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-white border border-purple-200 shadow-3xs">
                <div className="flex flex-col items-center">
                  {/* Numerator line */}
                  <div className="flex items-center gap-2 pb-1.5">
                    <span className="text-xl font-bold text-slate-800">{origNum}</span>
                    <span className="text-base font-bold text-purple-600">×</span>
                    <span className="w-9 h-8 text-center font-extrabold text-lg rounded-lg border border-purple-300 bg-purple-50 text-purple-800 flex items-center justify-center shadow-3xs">
                      {multiplier !== null ? multiplier : "?"}
                    </span>
                  </div>

                  {/* Fraction divider bar */}
                  <div className="w-full h-0.5 bg-slate-400 rounded-full my-0.5" />

                  {/* Denominator line */}
                  <div className="flex items-center gap-2 pt-1.5">
                    <span className="text-xl font-bold text-slate-800">{origDen}</span>
                    <span className="text-base font-bold text-purple-600">×</span>
                    <span className="w-9 h-8 text-center font-extrabold text-lg rounded-lg border border-purple-300 bg-purple-50 text-purple-800 flex items-center justify-center shadow-3xs">
                      {multiplier !== null ? multiplier : "?"}
                    </span>
                  </div>
                </div>

                {/* Input box for student to type multiplier */}
                <div className="flex flex-col items-center ml-2 pl-3 border-l border-slate-200">
                  <input
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="number"
                    inputMode="numeric"
                    disabled={disabled}
                    value={multiplier ?? ""}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    className={clsx(
                      "w-14 sm:w-16 h-11 text-center text-xl font-extrabold rounded-xl border-2 transition-all shadow-3xs",
                      "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
                      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                      multiplier !== null
                        ? "bg-purple-50 text-purple-800 border-purple-400"
                        : "bg-white text-slate-800 border-slate-300 hover:border-purple-300",
                      disabled && "opacity-60 cursor-not-allowed",
                    )}
                    placeholder="?"
                    aria-label={`Bilangan pengali nomor ${idx + 1}`}
                  />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    Pengali
                  </span>
                </div>
              </div>

              <span className="text-2xl font-black text-slate-400">=</span>

              {/* Target Fraction */}
              <div className="py-2 px-4 rounded-xl bg-purple-50/80 border border-purple-200/80 shadow-3xs min-w-[3.75rem] min-h-[3.5rem] flex items-center justify-center">
                <FractionDisplay fraction={item.targetFraction} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
