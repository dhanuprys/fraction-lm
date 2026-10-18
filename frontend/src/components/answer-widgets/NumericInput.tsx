import clsx from "clsx";

interface NumericInputProps {
  config: {
    prompt?: string;
    unit?: string;
  };
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

export function NumericInput({ config, value, onChange, disabled }: NumericInputProps) {
  const handleChange = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed === "") {
      onChange(null);
    } else {
      const n = parseInt(trimmed, 10);
      if (!isNaN(n)) onChange(n);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-2xs">
      {config.prompt && (
        <p className="text-sm font-medium text-slate-600 m-0">{config.prompt}</p>
      )}
      <div className="flex items-center gap-3">
        <input
          type="number"
          inputMode="numeric"
          disabled={disabled}
          value={value ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          className={clsx(
            "w-24 h-12 text-center text-2xl font-bold rounded-xl border-2 transition-all",
            "focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            "bg-white text-slate-800 border-slate-300 hover:border-purple-400",
            disabled && "opacity-60 cursor-not-allowed",
          )}
          aria-label="Jawaban angka"
          placeholder="?"
        />
        {config.unit && (
          <span className="text-sm font-bold text-slate-500">{config.unit}</span>
        )}
      </div>
    </div>
  );
}
