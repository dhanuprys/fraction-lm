import { useEffect } from "react";
import clsx from "clsx";
import { RectangleDiagram, CircleDiagram, DiagonalRectangleDiagram } from "@/components/diagrams/FractionDiagrams";

interface DiagramConfig {
  type: "rectangle" | "circle" | "diagonal_rectangle";
  totalParts: number;
  shadedParts: number[];
  rows?: number;
  cols?: number;
}

interface FractionIdentifyProps {
  config: {
    diagrams: DiagramConfig[];
  };
  value: Array<{ numerator: number | null; denominator: number | null }>;
  onChange: (value: Array<{ numerator: number | null; denominator: number | null }>) => void;
  disabled?: boolean;
}

export function FractionIdentify({ config, value, onChange, disabled }: FractionIdentifyProps) {
  // Initialize value array
  useEffect(() => {
    if (value.length !== config.diagrams.length) {
      onChange(
        config.diagrams.map((_, i) => value[i] || { numerator: null, denominator: null }),
      );
    }
  }, [config.diagrams.length]);

  const handleChange = (
    index: number,
    part: "numerator" | "denominator",
    raw: string,
  ) => {
    const trimmed = raw.trim();
    const next = [...value];
    next[index] = {
      ...next[index],
      [part]: trimmed === "" ? null : parseInt(trimmed, 10) || null,
    };
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {config.diagrams.map((diagram, i) => {
        const val = value[i] || { numerator: null, denominator: null };

        return (
          <div
            key={i}
            className="flex items-center gap-5 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-2xs"
          >
            {/* Number badge */}
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>

            {/* SVG Diagram */}
            <div className="flex-shrink-0">
              {diagram.type === "rectangle" ? (
                <RectangleDiagram
                  rows={diagram.rows || 1}
                  cols={diagram.cols || diagram.totalParts}
                  totalParts={diagram.totalParts}
                  shadedParts={diagram.shadedParts}
                  width={140}
                />
              ) : diagram.type === "diagonal_rectangle" ? (
                <DiagonalRectangleDiagram
                  rows={diagram.rows || 2}
                  cols={diagram.cols || 3}
                  totalParts={diagram.totalParts}
                  shadedParts={diagram.shadedParts}
                  width={140}
                />
              ) : (
                <CircleDiagram
                  totalParts={diagram.totalParts}
                  shadedParts={diagram.shadedParts}
                  size={100}
                />
              )}
            </div>

            {/* Arrow */}
            <span className="text-slate-400 text-lg font-bold flex-shrink-0">→</span>

            {/* Fraction input */}
            <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
              <input
                type="number"
                inputMode="numeric"
                disabled={disabled}
                value={val.numerator ?? ""}
                onChange={(e) => handleChange(i, "numerator", e.target.value)}
                className={clsx(
                  "w-12 h-8 text-center text-base font-bold rounded-lg border-2 transition-all",
                  "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                  "bg-white text-slate-800 border-slate-300 hover:border-purple-400",
                  disabled && "opacity-60 cursor-not-allowed",
                )}
                aria-label={`Pembilang gambar ${i + 1}`}
                placeholder="?"
              />
              <div className="w-12 h-0.5 bg-slate-800 rounded-full" />
              <input
                type="number"
                inputMode="numeric"
                disabled={disabled}
                value={val.denominator ?? ""}
                onChange={(e) => handleChange(i, "denominator", e.target.value)}
                className={clsx(
                  "w-12 h-8 text-center text-base font-bold rounded-lg border-2 transition-all",
                  "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                  "bg-white text-slate-800 border-slate-300 hover:border-purple-400",
                  disabled && "opacity-60 cursor-not-allowed",
                )}
                aria-label={`Penyebut gambar ${i + 1}`}
                placeholder="?"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
