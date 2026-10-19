/* ─────────────────────────────────────────────────────────────────────────────
 *  FractionEquivalence — Answer Widget
 *  ──────────────────────────────────────────────────────────────────────────
 *  Renders equivalent-fraction completion cards where the student enters an
 *  equivalent fraction for each given base fraction, and the widget displays
 *  the short mathematical equality statement with spacious, full-size KaTeX
 *  fractions and comfortable inputs.
 *  (Used in Aktivitas 3.2: 2/4, 1/3, 1/2, 2/2).
 *
 *  Value shape: Record<number, { numerator: number | null; denominator: number | null }>
 * ───────────────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import clsx from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useSoundStore } from "@/store/useSoundStore";

export interface FractionEquivalenceItem {
  baseFraction: string; // e.g. "2/4"
  prompt?: string;
}

export interface FractionEquivalenceConfig {
  items: FractionEquivalenceItem[];
}

export interface FractionValue {
  numerator: number | null;
  denominator: number | null;
}

interface Props {
  config: FractionEquivalenceConfig;
  value: Record<number, FractionValue>;
  onChange: (value: Record<number, FractionValue>) => void;
  disabled?: boolean;
}

/** Renders a spacious display fraction with KaTeX and extra horizontal clearance. */
function SpaciousFraction({ fraction }: { fraction: string }) {
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

function formatEqualityEquation(
  baseFraction: string,
  num: number | null,
  den: number | null,
): string {
  const parts = baseFraction.includes("/")
    ? baseFraction.split("/").map((s) => s.trim())
    : ["?", "?"];
  const numDisplay = num !== null ? String(num) : "\\square";
  const denDisplay = den !== null ? String(den) : "\\square";

  return `\\dfrac{\\enspace ${parts[0]} \\enspace}{\\enspace ${parts[1]} \\enspace} \\enspace = \\enspace \\dfrac{\\enspace ${numDisplay} \\enspace}{\\enspace ${denDisplay} \\enspace}`;
}

export function FractionEquivalence({ config, value, onChange, disabled }: Props) {
  const denRefs = useRef<Array<HTMLInputElement | null>>([]);
  const playSFX = useSoundStore((s) => s.playSFX);

  const handleNumChange = (idx: number, raw: string) => {
    const trimmed = raw.trim();
    const current = value[idx] || { numerator: null, denominator: null };
    const num = trimmed === "" ? null : parseInt(trimmed, 10);
    if (!isNaN(num as number) && trimmed !== "") {
      playSFX("CLICK");
    }
    onChange({
      ...value,
      [idx]: {
        ...current,
        numerator: isNaN(num as number) ? null : num,
      },
    });

    if (trimmed !== "" && !isNaN(num as number) && denRefs.current[idx]) {
      denRefs.current[idx]?.focus();
    }
  };

  const handleDenChange = (idx: number, raw: string) => {
    const trimmed = raw.trim();
    const current = value[idx] || { numerator: null, denominator: null };
    const den = trimmed === "" ? null : parseInt(trimmed, 10);
    if (!isNaN(den as number) && trimmed !== "") {
      playSFX("CLICK");
    }
    onChange({
      ...value,
      [idx]: {
        ...current,
        denominator: isNaN(den as number) ? null : den,
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {config.items.map((item, idx) => {
        const val = value[idx] || { numerator: null, denominator: null };
        const parts = item.baseFraction.split("/").map((s) => s.trim());

        return (
          <div
            key={idx}
            className="flex flex-col gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs transition-all hover:border-purple-200"
          >
            {/* Header: Item index */}
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-700 flex items-center gap-2 flex-wrap">
                <span>Lengkapi pecahan yang senilai dengan</span>
                <span className="inline-flex items-center py-0.5 px-2.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-bold">
                  <InlineMath
                    math={`\\dfrac{\\enspace ${parts[0]} \\enspace}{\\enspace ${parts[1]} \\enspace}`}
                  />
                </span>
                <span>:</span>
              </span>
            </div>

            {/* Row 1: "... dan [input] adalah pecahan senilai" */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 py-3 px-4 sm:px-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 text-sm sm:text-base text-slate-800">
              {/* Given Base Fraction Pill */}
              <div className="flex items-center justify-center min-w-[3.75rem] min-h-[3.5rem] py-2 px-3.5 rounded-xl bg-purple-50/80 border border-purple-200/80 shadow-3xs">
                <SpaciousFraction fraction={item.baseFraction} />
              </div>

              <span className="font-bold text-slate-600 text-base">dan</span>

              {/* Fraction Input Box */}
              <div className="inline-flex flex-col items-center">
                <input
                  type="number"
                  inputMode="numeric"
                  disabled={disabled}
                  value={val.numerator ?? ""}
                  onChange={(e) => handleNumChange(idx, e.target.value)}
                  placeholder="?"
                  className={clsx(
                    "w-14 sm:w-16 h-10 text-center text-lg font-extrabold rounded-xl border-2 transition-all shadow-3xs",
                    "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    val.numerator !== null
                      ? "bg-purple-50 text-purple-800 border-purple-400"
                      : "bg-white text-slate-800 border-slate-300 hover:border-purple-300",
                    disabled && "opacity-60 cursor-not-allowed",
                  )}
                  aria-label={`Pembilang pecahan senilai nomor ${idx + 1}`}
                />
                <div className="w-14 sm:w-16 h-0.5 bg-slate-400 rounded-full my-1" />
                <input
                  ref={(el) => {
                    denRefs.current[idx] = el;
                  }}
                  type="number"
                  inputMode="numeric"
                  disabled={disabled}
                  value={val.denominator ?? ""}
                  onChange={(e) => handleDenChange(idx, e.target.value)}
                  placeholder="?"
                  className={clsx(
                    "w-14 sm:w-16 h-10 text-center text-lg font-extrabold rounded-xl border-2 transition-all shadow-3xs",
                    "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    val.denominator !== null
                      ? "bg-purple-50 text-purple-800 border-purple-400"
                      : "bg-white text-slate-800 border-slate-300 hover:border-purple-300",
                    disabled && "opacity-60 cursor-not-allowed",
                  )}
                  aria-label={`Penyebut pecahan senilai nomor ${idx + 1}`}
                />
              </div>

              <span className="font-bold text-slate-600 text-base">adalah pecahan senilai.</span>
            </div>

            {/* Row 2: "Dalam penulisan matematika secara singkat:" */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 py-2.5 px-4 rounded-xl bg-purple-50/40 border border-purple-200/60">
              <span className="text-xs sm:text-sm font-semibold text-slate-600">
                Dalam penulisan matematika singkat:
              </span>
              <div className="flex items-center justify-center py-2 px-5 rounded-xl bg-white border border-purple-200 shadow-3xs text-xl sm:text-2xl font-bold text-purple-900">
                <InlineMath
                  math={formatEqualityEquation(item.baseFraction, val.numerator, val.denominator)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
