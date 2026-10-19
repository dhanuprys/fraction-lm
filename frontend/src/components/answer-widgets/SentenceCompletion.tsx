/* ─────────────────────────────────────────────────────────────────────────────
 *  SentenceCompletion — Answer Widget (Cloze / Sentence Reasoning)
 *  ──────────────────────────────────────────────────────────────────────────
 *  Renders structured sentence reasoning cards with inline selection blanks,
 *  spacious display fractions, and inequality notation slots with live KaTeX
 *  mathematical previews (used in Aktivitas 3.6 for comparing 8/9 and 7/6
 *  against benchmark 1).
 *
 *  Value shape: Record<string, string | null>
 *    — keyed by blank/slot id (e.g. { b_8_9_comp: "kecil", chain_left: "8/9", ... })
 * ───────────────────────────────────────────────────────────────────────── */

import clsx from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { MathText } from "@/components/common/MathText";
import { useSoundStore } from "@/store/useSoundStore";

export interface SentenceBlankConfig {
  id: string;
  prefix?: string;
  suffix?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export interface SentenceSectionConfig {
  title: string;
  badge?: string;
  fractionMath?: string;
  blanks: SentenceBlankConfig[];
}

export interface InequalitySlotConfig {
  id: string;
  placeholder?: string;
  options: string[];
}

export interface SentenceCompletionConfig {
  sections: SentenceSectionConfig[];
  inequalityCard?: {
    title: string;
    chainPrompt: string; // e.g. "Dalam notasi matematika singkat:"
    leftSlot: InequalitySlotConfig;
    rightSlot: InequalitySlotConfig;
    conclusionPrompt: string; // e.g. "Jadi, kesimpulan perbandingan:"
    conclusionLeftSlot: InequalitySlotConfig;
    conclusionOperator?: string; // default "<"
    conclusionRightSlot: InequalitySlotConfig;
  };
}

interface Props {
  config: SentenceCompletionConfig;
  value: Record<string, string | null>;
  onChange: (value: Record<string, string | null>) => void;
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

function formatSlotLatex(val: string | null | undefined): string {
  if (!val || val.trim() === "") return "\\square";
  const trimmed = val.trim();
  if (trimmed.includes("/")) {
    const [num, den] = trimmed.split("/").map((s) => s.trim());
    return `\\dfrac{\\enspace ${num} \\enspace}{\\enspace ${den} \\enspace}`;
  }
  return trimmed;
}

export function SentenceCompletion({ config, value, onChange, disabled }: Props) {
  const playSFX = useSoundStore((s) => s.playSFX);

  const handleSelect = (id: string, selectedVal: string) => {
    if (disabled) return;
    if (selectedVal !== "") {
      playSFX("CLICK");
    }
    onChange({
      ...value,
      [id]: selectedVal === "" ? null : selectedVal,
    });
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* ── Section Cards (e.g. 8/9 Analysis, 7/6 Analysis) ── */}
      {config.sections.map((section, secIdx) => (
        <div
          key={secIdx}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs transition-all hover:border-purple-200"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 flex-wrap">
            {section.badge && (
              <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {section.badge}
              </span>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <h4 className="font-bold text-base sm:text-lg text-slate-800 m-0">
                <MathText text={section.title} />
              </h4>
              {section.fractionMath && (
                <div className="flex items-center justify-center min-w-[3.75rem] min-h-[3.25rem] py-1 px-3.5 rounded-xl bg-purple-50/80 border border-purple-200/80 shadow-3xs">
                  <SpaciousFraction fraction={section.fractionMath} />
                </div>
              )}
            </div>
          </div>

          {/* Sentence Blanks */}
          <div className="flex flex-col gap-3.5">
            {section.blanks.map((blank) => {
              const currentVal = value[blank.id] ?? "";
              return (
                <div
                  key={blank.id}
                  className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-sm sm:text-base text-slate-700 leading-relaxed py-1"
                >
                  {blank.prefix && (
                    <span className="font-medium text-slate-700">
                      <MathText text={blank.prefix} />
                    </span>
                  )}

                  <select
                    value={currentVal}
                    disabled={disabled}
                    onChange={(e) => handleSelect(blank.id, e.target.value)}
                    className={clsx(
                      "px-3.5 py-2 text-sm sm:text-base font-bold rounded-xl border-2 transition-all shadow-3xs cursor-pointer min-h-[2.75rem]",
                      "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
                      currentVal !== ""
                        ? "bg-purple-50 text-purple-800 border-purple-400"
                        : "bg-white text-slate-500 border-slate-300 hover:border-purple-300",
                      disabled && "opacity-60 cursor-not-allowed",
                    )}
                    aria-label={blank.placeholder || "Pilih jawaban"}
                  >
                    <option value="">{blank.placeholder || "— Pilih Jawaban —"}</option>
                    {blank.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {blank.suffix && (
                    <span className="font-medium text-slate-700">
                      <MathText text={blank.suffix} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ── Mathematical Inequality Card ── */}
      {config.inequalityCard && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-5">
          <div className="pb-3 border-b border-slate-100">
            <h4 className="font-bold text-base sm:text-lg text-slate-800 m-0">
              {config.inequalityCard.title}
            </h4>
          </div>

          <div className="flex flex-col gap-5">
            {/* Chain section: [left] < 1 < [right] */}
            <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-sm font-semibold text-slate-700">
                {config.inequalityCard.chainPrompt}
              </span>

              {/* Selector row */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <select
                  value={value[config.inequalityCard.leftSlot.id] ?? ""}
                  disabled={disabled}
                  onChange={(e) =>
                    handleSelect(config.inequalityCard!.leftSlot.id, e.target.value)
                  }
                  className={clsx(
                    "px-4 py-2 text-sm sm:text-base font-bold rounded-xl border-2 transition-all min-h-[2.75rem] shadow-3xs cursor-pointer",
                    value[config.inequalityCard.leftSlot.id]
                      ? "bg-purple-50 text-purple-800 border-purple-400"
                      : "bg-white text-slate-500 border-slate-300 hover:border-purple-300",
                    disabled && "opacity-60 cursor-not-allowed",
                  )}
                >
                  <option value="">{config.inequalityCard.leftSlot.placeholder || "Pilih Pecahan"}</option>
                  {config.inequalityCard.leftSlot.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <span className="font-black text-slate-400 text-xl">&lt;</span>
                <span className="w-9 h-9 rounded-xl bg-purple-100 font-black text-purple-800 text-lg flex items-center justify-center shadow-3xs">
                  1
                </span>
                <span className="font-black text-slate-400 text-xl">&lt;</span>

                <select
                  value={value[config.inequalityCard.rightSlot.id] ?? ""}
                  disabled={disabled}
                  onChange={(e) =>
                    handleSelect(config.inequalityCard!.rightSlot.id, e.target.value)
                  }
                  className={clsx(
                    "px-4 py-2 text-sm sm:text-base font-bold rounded-xl border-2 transition-all min-h-[2.75rem] shadow-3xs cursor-pointer",
                    value[config.inequalityCard.rightSlot.id]
                      ? "bg-purple-50 text-purple-800 border-purple-400"
                      : "bg-white text-slate-500 border-slate-300 hover:border-purple-300",
                    disabled && "opacity-60 cursor-not-allowed",
                  )}
                >
                  <option value="">{config.inequalityCard.rightSlot.placeholder || "Pilih Pecahan"}</option>
                  {config.inequalityCard.rightSlot.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Live KaTeX visual equation box */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 py-2.5 px-4 rounded-xl bg-purple-50/40 border border-purple-200/60 mt-1">
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  Notasi matematika:
                </span>
                <div className="flex items-center justify-center py-2 px-5 rounded-xl bg-white border border-purple-200 shadow-3xs text-xl sm:text-2xl font-bold text-purple-900">
                  <InlineMath
                    math={`${formatSlotLatex(value[config.inequalityCard.leftSlot.id])} \\enspace < \\enspace 1 \\enspace < \\enspace ${formatSlotLatex(value[config.inequalityCard.rightSlot.id])}`}
                  />
                </div>
              </div>
            </div>

            {/* Conclusion section: [left] < [right] */}
            <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-sm font-semibold text-slate-700">
                {config.inequalityCard.conclusionPrompt}
              </span>

              {/* Selector row */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <select
                  value={value[config.inequalityCard.conclusionLeftSlot.id] ?? ""}
                  disabled={disabled}
                  onChange={(e) =>
                    handleSelect(config.inequalityCard!.conclusionLeftSlot.id, e.target.value)
                  }
                  className={clsx(
                    "px-4 py-2 text-sm sm:text-base font-bold rounded-xl border-2 transition-all min-h-[2.75rem] shadow-3xs cursor-pointer",
                    value[config.inequalityCard.conclusionLeftSlot.id]
                      ? "bg-purple-50 text-purple-800 border-purple-400"
                      : "bg-white text-slate-500 border-slate-300 hover:border-purple-300",
                    disabled && "opacity-60 cursor-not-allowed",
                  )}
                >
                  <option value="">Pilih Pecahan</option>
                  {config.inequalityCard.conclusionLeftSlot.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <span className="font-black text-purple-700 text-xl">
                  {config.inequalityCard.conclusionOperator || "<"}
                </span>

                <select
                  value={value[config.inequalityCard.conclusionRightSlot.id] ?? ""}
                  disabled={disabled}
                  onChange={(e) =>
                    handleSelect(config.inequalityCard!.conclusionRightSlot.id, e.target.value)
                  }
                  className={clsx(
                    "px-4 py-2 text-sm sm:text-base font-bold rounded-xl border-2 transition-all min-h-[2.75rem] shadow-3xs cursor-pointer",
                    value[config.inequalityCard.conclusionRightSlot.id]
                      ? "bg-purple-50 text-purple-800 border-purple-400"
                      : "bg-white text-slate-500 border-slate-300 hover:border-purple-300",
                    disabled && "opacity-60 cursor-not-allowed",
                  )}
                >
                  <option value="">Pilih Pecahan</option>
                  {config.inequalityCard.conclusionRightSlot.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Live KaTeX visual equation box */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 py-2.5 px-4 rounded-xl bg-purple-50/40 border border-purple-200/60 mt-1">
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  Notasi matematika:
                </span>
                <div className="flex items-center justify-center py-2 px-5 rounded-xl bg-white border border-purple-200 shadow-3xs text-xl sm:text-2xl font-bold text-purple-900">
                  <InlineMath
                    math={`${formatSlotLatex(value[config.inequalityCard.conclusionLeftSlot.id])} \\enspace ${config.inequalityCard.conclusionOperator || "<"} \\enspace ${formatSlotLatex(value[config.inequalityCard.conclusionRightSlot.id])}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
