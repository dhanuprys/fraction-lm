/* ─────────────────────────────────────────────────────────────────────────────
 *  FractionClassification — Answer Widget
 *  ──────────────────────────────────────────────────────────────────────────
 *  Renders a set of fractions to classify into colored category pills/badges
 *  (e.g., Pecahan Sejati [Biru] vs Pecahan Tidak Sejati [Merah]).
 *  Features live classification counter, audio feedback, and spacious KaTeX typography.
 *
 *  Value shape: Record<number, string | null>
 *    — keyed by item index, value is category key (e.g. { 0: "merah", 1: "biru" })
 * ───────────────────────────────────────────────────────────────────────── */

import clsx from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { MathText } from "@/components/common/MathText";
import { useSoundStore } from "@/store/useSoundStore";

export interface FractionClassificationCategory {
  key: string;
  label: string;
  badge?: string;
  color?: "blue" | "red" | "green" | "purple" | "amber";
}

export interface FractionClassificationItem {
  prompt?: string;
  fraction: string;
}

export interface FractionClassificationConfig {
  items: FractionClassificationItem[];
  categories: FractionClassificationCategory[];
}

interface Props {
  config: FractionClassificationConfig;
  value: Record<number, string | null>;
  onChange: (value: Record<number, string | null>) => void;
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
    <span className="text-xl sm:text-2xl text-slate-800 flex items-center justify-center select-none font-bold">
      <InlineMath
        math={mathStr}
        renderError={() => (
          <span className="font-bold text-lg text-slate-800">{fraction}</span>
        )}
      />
    </span>
  );
}

export function FractionClassification({ config, value, onChange, disabled }: Props) {
  const playSFX = useSoundStore((s) => s.playSFX);

  const handleSelect = (itemIdx: number, catKey: string) => {
    if (disabled) return;
    playSFX("CLICK");
    const current = value[itemIdx] ?? null;
    onChange({
      ...value,
      [itemIdx]: current === catKey ? null : catKey,
    });
  };

  const totalItems = config.items.length;
  const answeredCount = Object.values(value || {}).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Top summary & legend bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-3xs">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-slate-600">
            Progress Ditandai:
          </span>
          <span className="font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
            {answeredCount} / {totalItems} Pecahan
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {config.categories.map((cat) => {
            const count = Object.values(value || {}).filter((v) => v === cat.key).length;
            const isBlue = cat.color === "blue";
            const isRed = cat.color === "red";

            return (
              <span
                key={cat.key}
                className={clsx(
                  "text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5",
                  isBlue
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : isRed
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : "bg-slate-100 text-slate-700 border-slate-200",
                )}
              >
                <span>{cat.label}:</span>
                <span className="font-extrabold">{count}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Grid of fraction cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {config.items.map((item, idx) => {
          const selectedKey = value[idx] ?? null;
          const selectedCategory = config.categories.find((c) => c.key === selectedKey);

          const cardBorderClass =
            selectedCategory?.color === "blue"
              ? "border-blue-400 bg-blue-50/30 ring-2 ring-blue-300/40"
              : selectedCategory?.color === "red"
                ? "border-rose-400 bg-rose-50/30 ring-2 ring-rose-300/40"
                : selectedCategory?.color === "green"
                  ? "border-emerald-400 bg-emerald-50/30 ring-2 ring-emerald-300/40"
                  : "border-slate-200/80 bg-white hover:border-purple-200";

          return (
            <div
              key={idx}
              className={clsx(
                "flex flex-col items-center justify-between p-5 rounded-2xl border transition-all duration-200 shadow-2xs",
                cardBorderClass,
              )}
            >
              {/* Top: index badge and optional prompt */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                {item.prompt && (
                  <span className="text-xs text-slate-500 font-medium">
                    <MathText text={item.prompt} />
                  </span>
                )}
              </div>

              {/* Middle: prominent Fraction KaTeX display */}
              <div className="my-2.5 py-2.5 px-4 rounded-xl bg-white border border-slate-200/70 shadow-3xs min-w-[4.5rem] min-h-[3.75rem] flex items-center justify-center">
                <FractionDisplay fraction={item.fraction} />
              </div>

              {/* Bottom: Category toggle pill buttons */}
              <div className="w-full flex flex-col gap-2 mt-3">
                {config.categories.map((cat) => {
                  const isSelected = selectedKey === cat.key;
                  const isBlue = cat.color === "blue";
                  const isRed = cat.color === "red";
                  const isGreen = cat.color === "green";

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleSelect(idx, cat.key)}
                      className={clsx(
                        "w-full py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
                        isSelected
                          ? isBlue
                            ? "bg-blue-600 text-white shadow-xs scale-[1.02] ring-2 ring-blue-300"
                            : isRed
                              ? "bg-rose-600 text-white shadow-xs scale-[1.02] ring-2 ring-rose-300"
                              : isGreen
                                ? "bg-emerald-600 text-white shadow-xs scale-[1.02] ring-2 ring-emerald-300"
                                : "bg-purple-600 text-white shadow-xs scale-[1.02]"
                          : isBlue
                            ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                            : isRed
                              ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                              : isGreen
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100",
                      )}
                    >
                      <span>{isSelected ? "✓" : "○"}</span>
                      <span>{cat.label}</span>
                      {cat.badge && (
                        <span
                          className={clsx(
                            "ml-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase",
                            isSelected
                              ? "bg-white/20 text-white"
                              : isBlue
                                ? "bg-blue-200/60 text-blue-800"
                                : isRed
                                  ? "bg-rose-200/60 text-rose-800"
                                  : "bg-slate-200 text-slate-700",
                          )}
                        >
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
