import clsx from "clsx";

interface TrueFalseTableProps {
  config: {
    statements: string[];
    labels?: [string, string];
  };
  value: Record<number, boolean | null>;
  onChange: (value: Record<number, boolean | null>) => void;
  disabled?: boolean;
}

export function TrueFalseTable({ config, value, onChange, disabled }: TrueFalseTableProps) {
  const labels = config.labels || ["Benar", "Salah"];

  const handleToggle = (index: number, answer: boolean) => {
    if (disabled) return;
    onChange({ ...value, [index]: answer });
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs">
      {/* Header */}
      <div className="grid grid-cols-[1fr_80px_80px] gap-2 px-4 py-3 bg-slate-50/80 border-b border-slate-200/60">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Pernyataan
        </span>
        {labels.map((label) => (
          <span
            key={label}
            className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center"
          >
            {label}
          </span>
        ))}
      </div>

      {/* Rows */}
      {config.statements.map((statement, i) => {
        const selected = value[i];
        return (
          <div
            key={i}
            className={clsx(
              "grid grid-cols-[1fr_80px_80px] gap-2 px-4 py-3.5 items-center transition-colors",
              i < config.statements.length - 1 && "border-b border-slate-100",
              selected !== null && selected !== undefined && "bg-purple-50/30",
            )}
          >
            {/* Statement text */}
            <p className="text-sm font-medium text-slate-700 m-0 leading-relaxed pr-2">
              <span className="text-purple-500 font-bold mr-1.5">{i + 1}.</span>
              {statement}
            </p>

            {/* True button */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleToggle(i, true)}
              className={clsx(
                "w-full h-9 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20",
                "disabled:cursor-not-allowed disabled:opacity-60",
                selected === true
                  ? "bg-emerald-500 text-white shadow-xs scale-105"
                  : "bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200/60",
              )}
              aria-label={`${labels[0]} untuk pernyataan ${i + 1}`}
            >
              {labels[0]}
            </button>

            {/* False button */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleToggle(i, false)}
              className={clsx(
                "w-full h-9 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/20",
                "disabled:cursor-not-allowed disabled:opacity-60",
                selected === false
                  ? "bg-rose-500 text-white shadow-xs scale-105"
                  : "bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 border border-slate-200/60",
              )}
              aria-label={`${labels[1]} untuk pernyataan ${i + 1}`}
            >
              {labels[1]}
            </button>
          </div>
        );
      })}
    </div>
  );
}
