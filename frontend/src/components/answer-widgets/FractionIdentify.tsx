import { useRef, useEffect } from "react";
import clsx from "clsx";
import {
  RectangleDiagram,
  CircleDiagram,
  DiagonalRectangleDiagram,
} from "@/components/diagrams/FractionDiagrams";

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

function SingleIdentifyItem({
  index,
  diagram,
  val,
  disabled,
  onChangeField,
}: {
  index: number;
  diagram: DiagramConfig;
  val: { numerator: number | null; denominator: number | null };
  disabled?: boolean;
  onChangeField: (index: number, part: "numerator" | "denominator", value: number | null) => void;
}) {
  const numRef = useRef<HTMLInputElement>(null);
  const denomRef = useRef<HTMLInputElement>(null);

  const handleChange = (part: "numerator" | "denominator", raw: string) => {
    const trimmed = raw.trim();
    if (trimmed === "") {
      onChangeField(index, part, null);
    } else {
      const n = parseInt(trimmed, 10);
      if (!isNaN(n)) onChangeField(index, part, n);
    }
  };

  const handleNumKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === "ArrowDown") && denomRef.current) {
      e.preventDefault();
      denomRef.current.focus();
    }
  };

  return (
    <div className="flex items-center gap-4 sm:gap-6 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/60 shadow-2xs hover:border-purple-200 transition-colors">
      {/* Number badge */}
      <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 text-purple-700 text-xs sm:text-sm font-bold flex items-center justify-center">
        {index + 1}
      </span>

      {/* SVG Diagram Frame */}
      <div className="flex-shrink-0 w-40 sm:w-48 min-h-[110px] flex items-center justify-center bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
        {diagram.type === "rectangle" ? (
          <RectangleDiagram
            rows={diagram.rows || 1}
            cols={diagram.cols || diagram.totalParts}
            totalParts={diagram.totalParts}
            shadedParts={diagram.shadedParts}
          />
        ) : diagram.type === "diagonal_rectangle" ? (
          <DiagonalRectangleDiagram
            rows={diagram.rows || 2}
            cols={diagram.cols || 3}
            totalParts={diagram.totalParts}
            shadedParts={diagram.shadedParts}
          />
        ) : (
          <CircleDiagram
            totalParts={diagram.totalParts}
            shadedParts={diagram.shadedParts}
            size={96}
          />
        )}
      </div>

      {/* Arrow */}
      <span className="text-slate-300 text-base sm:text-lg font-bold flex-shrink-0">→</span>

      {/* Fraction input */}
      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
        <input
          ref={numRef}
          type="number"
          inputMode="numeric"
          disabled={disabled}
          value={val.numerator ?? ""}
          onChange={(e) => handleChange("numerator", e.target.value)}
          onKeyDown={handleNumKeyDown}
          className={clsx(
            "w-14 h-9 text-center text-lg font-bold rounded-lg border-2 transition-all",
            "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            "bg-white text-slate-800 border-slate-300 hover:border-purple-400",
            disabled && "opacity-60 cursor-not-allowed",
          )}
          aria-label={`Pembilang gambar ${index + 1}`}
          placeholder="?"
        />
        <div className="w-14 h-0.5 bg-slate-800 rounded-full" />
        <input
          ref={denomRef}
          type="number"
          inputMode="numeric"
          disabled={disabled}
          value={val.denominator ?? ""}
          onChange={(e) => handleChange("denominator", e.target.value)}
          className={clsx(
            "w-14 h-9 text-center text-lg font-bold rounded-lg border-2 transition-all",
            "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            "bg-white text-slate-800 border-slate-300 hover:border-purple-400",
            disabled && "opacity-60 cursor-not-allowed",
          )}
          aria-label={`Penyebut gambar ${index + 1}`}
          placeholder="?"
        />
      </div>
    </div>
  );
}

export function FractionIdentify({ config, value, onChange, disabled }: FractionIdentifyProps) {
  // Initialize value array
  useEffect(() => {
    if (value.length !== config.diagrams.length) {
      onChange(config.diagrams.map((_, i) => value[i] || { numerator: null, denominator: null }));
    }
  }, [config.diagrams, onChange, value]);

  const handleFieldChange = (
    index: number,
    part: "numerator" | "denominator",
    val: number | null,
  ) => {
    const next = [...value];
    next[index] = { ...next[index], [part]: val };
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {config.diagrams.map((diagram, i) => (
        <SingleIdentifyItem
          key={i}
          index={i}
          diagram={diagram}
          val={value[i] || { numerator: null, denominator: null }}
          disabled={disabled}
          onChangeField={handleFieldChange}
        />
      ))}
    </div>
  );
}
