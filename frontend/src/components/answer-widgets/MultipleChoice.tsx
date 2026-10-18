import clsx from "clsx";
import { MathText } from "@/components/common/MathText";

interface MultipleChoiceProps {
  config: {
    choices: Array<{
      label: string;
      value: string;
    }>;
  };
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export function MultipleChoice({ config, value, onChange, disabled }: MultipleChoiceProps) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup" aria-label="Pilihan jawaban">
      {config.choices.map((choice, i) => {
        const isSelected = value === choice.value;
        return (
          <button
            key={choice.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange(isSelected ? null : choice.value)}
            className={clsx(
              "flex items-center gap-3.5 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/20",
              "disabled:cursor-not-allowed disabled:opacity-60",
              isSelected
                ? "bg-purple-50 border-purple-500 shadow-xs"
                : "bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300",
            )}
          >
            {/* Radio circle */}
            <span
              className={clsx(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                isSelected ? "border-purple-500 bg-purple-500" : "border-slate-300",
              )}
            >
              {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>

            {/* Letter badge */}
            <span
              className={clsx(
                "w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0",
                isSelected ? "bg-purple-500 text-white" : "bg-slate-100 text-slate-500",
              )}
            >
              {String.fromCharCode(65 + i)}
            </span>

            {/* Choice label */}
            <span
              className={clsx(
                "text-sm font-medium leading-relaxed",
                isSelected ? "text-purple-800" : "text-slate-700",
              )}
            >
              <MathText text={choice.label} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
