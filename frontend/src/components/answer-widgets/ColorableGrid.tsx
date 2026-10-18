import { useState, useCallback, useRef } from "react";
import clsx from "clsx";
import { MathText } from "@/components/common/MathText";

interface GridColoringProps {
  config: {
    rows: number;
    cols: number;
    instructions: Array<{
      fraction: string;
      color: string;
      label: string;
    }>;
  };
  value: (string | null)[][];
  onChange: (value: (string | null)[][]) => void;
  disabled?: boolean;
}

/** Maps color names to Tailwind-friendly display colors */
const COLOR_MAP: Record<string, { bg: string; ring: string; swatch: string }> = {
  red: { bg: "bg-red-400", ring: "ring-red-500/40", swatch: "#f87171" },
  blue: { bg: "bg-blue-400", ring: "ring-blue-500/40", swatch: "#60a5fa" },
  green: { bg: "bg-green-400", ring: "ring-green-500/40", swatch: "#4ade80" },
  black: { bg: "bg-slate-700", ring: "ring-slate-700/40", swatch: "#334155" },
  orange: { bg: "bg-orange-400", ring: "ring-orange-500/40", swatch: "#fb923c" },
  yellow: { bg: "bg-yellow-400", ring: "ring-yellow-500/40", swatch: "#facc15" },
  cyan: { bg: "bg-cyan-400", ring: "ring-cyan-500/40", swatch: "#22d3ee" },
  gray: { bg: "bg-gray-400", ring: "ring-gray-500/40", swatch: "#9ca3af" },
  purple: { bg: "bg-purple-400", ring: "ring-purple-500/40", swatch: "#c084fc" },
};

function getColorStyle(color: string) {
  return COLOR_MAP[color] || { bg: "bg-slate-300", ring: "ring-slate-400/40", swatch: color };
}

export function ColorableGrid({ config, value, onChange, disabled }: GridColoringProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    config.instructions[0]?.color || "red",
  );
  const isPaintingRef = useRef(false);

  // Ensure grid is initialized
  const grid: (string | null)[][] =
    value.length === config.rows && value[0]?.length === config.cols
      ? value
      : Array.from({ length: config.rows }, () => Array(config.cols).fill(null));

  const toggleCell = useCallback(
    (row: number, col: number) => {
      if (disabled) return;
      const next = grid.map((r) => [...r]);
      if (next[row][col] === selectedColor) {
        next[row][col] = null; // Erase
      } else {
        next[row][col] = selectedColor;
      }
      onChange(next);
    },
    [grid, selectedColor, disabled, onChange],
  );

  const paintCell = useCallback(
    (row: number, col: number) => {
      if (disabled || !isPaintingRef.current) return;
      const next = grid.map((r) => [...r]);
      if (next[row][col] !== selectedColor) {
        next[row][col] = selectedColor;
        onChange(next);
      }
    },
    [grid, selectedColor, disabled, onChange],
  );

  // Count cells per color for the progress display
  const colorCounts: Record<string, number> = {};
  for (const row of grid) {
    for (const cell of row) {
      if (cell) colorCounts[cell] = (colorCounts[cell] || 0) + 1;
    }
  }

  // Compute cell size based on grid dimensions
  const cellSize =
    config.cols <= 6 ? "w-10 h-10" : config.cols <= 10 ? "w-7 h-7 sm:w-8 sm:h-8" : "w-6 h-6";

  return (
    <div className="flex flex-col gap-4">
      {/* Color Palette */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
          Warna:
        </span>
        {config.instructions.map((inst) => {
          const style = getColorStyle(inst.color);
          const isActive = selectedColor === inst.color;
          return (
            <button
              key={inst.color}
              type="button"
              disabled={disabled}
              onClick={() => setSelectedColor(inst.color)}
              className={clsx(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-4",
                "disabled:cursor-not-allowed disabled:opacity-60",
                isActive
                  ? `${style.bg} text-white shadow-sm scale-105 ring-2 ${style.ring}`
                  : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 shadow-2xs",
              )}
              aria-label={`Pilih ${inst.label}`}
              aria-pressed={isActive}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/50 flex-shrink-0"
                style={{ backgroundColor: style.swatch }}
              />
              <MathText text={inst.label} />
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div
        className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs overflow-x-auto"
        onMouseLeave={() => {
          isPaintingRef.current = false;
        }}
      >
        <div
          className="inline-grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))` }}
          role="grid"
          aria-label="Grid pewarnaan"
        >
          {grid.map((row, ri) =>
            row.map((cell, ci) => {
              const style = cell ? getColorStyle(cell) : null;
              return (
                <button
                  key={`${ri}-${ci}`}
                  type="button"
                  disabled={disabled}
                  role="gridcell"
                  aria-label={`Baris ${ri + 1}, Kolom ${ci + 1}${cell ? `, diwarnai ${cell}` : ""}`}
                  className={clsx(
                    cellSize,
                    "rounded-md border transition-all duration-100 cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30",
                    "disabled:cursor-not-allowed",
                    cell
                      ? `${style!.bg} border-white/40 shadow-xs`
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300",
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    isPaintingRef.current = true;
                    toggleCell(ri, ci);
                  }}
                  onMouseEnter={() => paintCell(ri, ci)}
                  onMouseUp={() => {
                    isPaintingRef.current = false;
                  }}
                  onTouchStart={() => {
                    // Prevent scroll while painting on mobile
                    toggleCell(ri, ci);
                  }}
                />
              );
            }),
          )}
        </div>
      </div>

      {/* Progress per color */}
      <div className="flex flex-wrap gap-2 px-1">
        {config.instructions.map((inst) => {
          const [numStr] = inst.fraction.split("/");
          const target = parseInt(numStr, 10);
          const count = colorCounts[inst.color] || 0;
          const isDone = count === target;
          const style = getColorStyle(inst.color);

          return (
            <div
              key={inst.color}
              className={clsx(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors",
                isDone
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                  : "bg-white text-slate-600 border-slate-200/60",
              )}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: style.swatch }}
              />
              {count}/{target}
              {isDone && " ✓"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
