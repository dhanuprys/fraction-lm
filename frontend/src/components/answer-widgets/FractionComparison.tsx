/* ─────────────────────────────────────────────────────────────────────────────
 *  FractionComparison — Answer Widget
 *  ──────────────────────────────────────────────────────────────────────────
 *  Renders one or more fraction-pair rows. For each row the student picks
 *  the correct comparison operator: >, <, or =.
 *
 *  Value shape: Record<number, '>' | '<' | '=' | null>
 *    — keyed by item index
 * ───────────────────────────────────────────────────────────────────────── */

import clsx from "clsx";

interface FractionComparisonConfig {
  items: Array<{
    prompt?: string;
    leftFraction: string;
    rightFraction: string;
  }>;
}

type Operator = ">" | "<" | "=";

interface Props {
  config: FractionComparisonConfig;
  value: Record<number, Operator | null>;
  onChange: (value: Record<number, Operator | null>) => void;
  disabled?: boolean;
}

const OPERATORS: { symbol: Operator; label: string }[] = [
  { symbol: "<", label: "lebih kecil dari" },
  { symbol: "=", label: "sama dengan" },
  { symbol: ">", label: "lebih besar dari" },
];

/** Renders a fraction as a stacked numerator/denominator with a dividing line. */
function FractionDisplay({ fraction }: { fraction: string }) {
  const parts = fraction.split("/");
  if (parts.length !== 2) {
    return <span className="font-bold text-lg text-slate-800">{fraction}</span>;
  }
  const [num, den] = parts;
  return (
    <span className="inline-flex flex-col items-center leading-none gap-0">
      <span className="text-lg font-bold text-slate-800 px-1">{num.trim()}</span>
      <span className="w-full h-px bg-slate-800 min-w-[1.5rem]" />
      <span className="text-lg font-bold text-slate-800 px-1">{den.trim()}</span>
    </span>
  );
}

export function FractionComparison({
  config,
  value,
  onChange,
  disabled,
}: Props) {
  const handleSelect = (idx: number, op: Operator) => {
    if (disabled) return;
    onChange({ ...value, [idx]: value[idx] === op ? null : op });
  };

  return (
    <div className="flex flex-col gap-4">
      {config.items.map((item, idx) => {
        const selected = value[idx] ?? null;

        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs"
          >
            {/* Optional text prompt above the comparison */}
            {item.prompt && (
              <p className="text-sm text-slate-600 font-medium mb-3 m-0 leading-relaxed">
                {item.prompt}
              </p>
            )}

            {/* Fraction — Operator — Fraction row */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
              {/* Left fraction */}
              <div className="flex items-center justify-center min-w-[3rem] py-2 px-3 rounded-xl bg-purple-50/60 border border-purple-200/50">
                <FractionDisplay fraction={item.leftFraction} />
              </div>

              {/* Operator toggle buttons */}
              <div
                className="flex items-center gap-1.5"
                role="radiogroup"
                aria-label={`Pilih simbol perbandingan untuk ${item.leftFraction} dan ${item.rightFraction}`}
              >
                {OPERATORS.map((op) => {
                  const isSelected = selected === op.symbol;
                  return (
                    <button
                      key={op.symbol}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={op.label}
                      disabled={disabled}
                      onClick={() => handleSelect(idx, op.symbol)}
                      className={clsx(
                        "w-11 h-11 rounded-xl text-xl font-bold flex items-center justify-center transition-all duration-150",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/20",
                        isSelected
                          ? "bg-purple-600 text-white shadow-sm scale-105 border-2 border-purple-700"
                          : "bg-slate-100 text-slate-500 border border-slate-200/80 hover:bg-slate-200 hover:text-slate-700",
                        disabled &&
                          isSelected &&
                          "bg-emerald-500 border-emerald-600 cursor-default",
                        disabled &&
                          !isSelected &&
                          "opacity-40 cursor-default",
                      )}
                    >
                      {op.symbol}
                    </button>
                  );
                })}
              </div>

              {/* Right fraction */}
              <div className="flex items-center justify-center min-w-[3rem] py-2 px-3 rounded-xl bg-purple-50/60 border border-purple-200/50">
                <FractionDisplay fraction={item.rightFraction} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
