import { useRef, useEffect } from "react";
import clsx from "clsx";

interface FractionField {
  prompt: string;
  prefilled?: { numerator?: number; denominator?: number };
}

interface FractionInputProps {
  config: {
    fields: FractionField[];
  };
  value: Array<{ numerator: number | null; denominator: number | null }>;
  onChange: (value: Array<{ numerator: number | null; denominator: number | null }>) => void;
  disabled?: boolean;
}

function SingleFractionInput({
  index,
  field,
  val,
  disabled,
  onChangeField,
}: {
  index: number;
  field: FractionField;
  val: { numerator: number | null; denominator: number | null };
  disabled?: boolean;
  onChangeField: (
    index: number,
    part: "numerator" | "denominator",
    value: number | null,
  ) => void;
}) {
  const numRef = useRef<HTMLInputElement>(null);
  const denomRef = useRef<HTMLInputElement>(null);
  const numLocked = field.prefilled?.numerator !== undefined;
  const denomLocked = field.prefilled?.denominator !== undefined;

  const handleChange = (part: "numerator" | "denominator", raw: string) => {
    const trimmed = raw.trim();
    if (trimmed === "") {
      onChangeField(index, part, null);
    } else {
      const n = parseInt(trimmed, 10);
      if (!isNaN(n)) onChangeField(index, part, n);
    }
  };

  // Auto-advance to denominator when numerator is filled
  const handleNumKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === "ArrowDown") && denomRef.current && !denomLocked) {
      e.preventDefault();
      denomRef.current.focus();
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
      {/* Number badge */}
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center">
        {index + 1}
      </span>

      {/* Prompt text */}
      {field.prompt && (
        <p className="flex-1 text-sm font-medium text-slate-600 m-0 leading-relaxed min-w-0">
          {field.prompt}
        </p>
      )}

      {/* Fraction display */}
      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
        {/* Numerator */}
        <input
          ref={numRef}
          type="number"
          inputMode="numeric"
          disabled={disabled || numLocked}
          value={numLocked ? (field.prefilled!.numerator ?? "") : (val.numerator ?? "")}
          onChange={(e) => handleChange("numerator", e.target.value)}
          onKeyDown={handleNumKeyDown}
          className={clsx(
            "w-14 h-9 text-center text-lg font-bold rounded-lg border-2 transition-all",
            "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            numLocked
              ? "bg-slate-100 text-slate-600 border-slate-200 cursor-not-allowed"
              : "bg-white text-slate-800 border-slate-300 hover:border-purple-400",
            disabled && "opacity-60 cursor-not-allowed",
          )}
          aria-label={`Pembilang ${index + 1}`}
          placeholder="?"
        />

        {/* Fraction bar */}
        <div className="w-14 h-0.5 bg-slate-800 rounded-full" />

        {/* Denominator */}
        <input
          ref={denomRef}
          type="number"
          inputMode="numeric"
          disabled={disabled || denomLocked}
          value={denomLocked ? (field.prefilled!.denominator ?? "") : (val.denominator ?? "")}
          onChange={(e) => handleChange("denominator", e.target.value)}
          className={clsx(
            "w-14 h-9 text-center text-lg font-bold rounded-lg border-2 transition-all",
            "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            denomLocked
              ? "bg-slate-100 text-slate-600 border-slate-200 cursor-not-allowed"
              : "bg-white text-slate-800 border-slate-300 hover:border-purple-400",
            disabled && "opacity-60 cursor-not-allowed",
          )}
          aria-label={`Penyebut ${index + 1}`}
          placeholder="?"
        />
      </div>
    </div>
  );
}

export function FractionInput({ config, value, onChange, disabled }: FractionInputProps) {
  // Initialise value array if needed
  useEffect(() => {
    if (value.length !== config.fields.length) {
      onChange(
        config.fields.map((f, i) =>
          value[i] || {
            numerator: f.prefilled?.numerator ?? null,
            denominator: f.prefilled?.denominator ?? null,
          },
        ),
      );
    }
  }, [config.fields.length]);

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
      {config.fields.map((field, i) => (
        <SingleFractionInput
          key={i}
          index={i}
          field={field}
          val={value[i] || { numerator: null, denominator: null }}
          disabled={disabled}
          onChangeField={handleFieldChange}
        />
      ))}
    </div>
  );
}
