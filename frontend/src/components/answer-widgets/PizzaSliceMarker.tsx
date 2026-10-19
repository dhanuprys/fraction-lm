/* ─────────────────────────────────────────────────────────────────────────────
 *  PizzaSliceMarker — Answer Widget
 *  ──────────────────────────────────────────────────────────────────────────
 *  Renders one or more interactive circular pizzas divided into wedges/slices.
 *  Features exploded radial wedge pop-out micro-animations, audio feedback,
 *  target fraction tracking, and spacious KaTeX fraction typography.
 *
 *  Value shape: Record<number, number[]>
 *    — keyed by pizza index, value is array of marked slice indices [0, 1, 2, ...]
 * ───────────────────────────────────────────────────────────────────────── */

import { useCallback } from "react";
import clsx from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useSoundStore } from "@/store/useSoundStore";

export interface PizzaSliceConfigItem {
  label: string;
  totalSlices: number;
  targetFraction?: string;
  helperText?: string;
}

export interface PizzaSliceMarkerConfig {
  pizzas: PizzaSliceConfigItem[];
  instruction?: string;
}

interface Props {
  config: PizzaSliceMarkerConfig;
  value: Record<number, number[]>;
  onChange: (value: Record<number, number[]>) => void;
  disabled?: boolean;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function sectorPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export function PizzaSliceMarker({ config, value, onChange, disabled }: Props) {
  const playSFX = useSoundStore((s) => s.playSFX);

  const handleToggleSlice = useCallback(
    (pizzaIdx: number, sliceIdx: number) => {
      if (disabled) return;
      playSFX("CLICK");
      const currentSlices = value[pizzaIdx] || [];
      const isMarked = currentSlices.includes(sliceIdx);
      const nextSlices = isMarked
        ? currentSlices.filter((s) => s !== sliceIdx)
        : [...currentSlices, sliceIdx].sort((a, b) => a - b);

      onChange({
        ...value,
        [pizzaIdx]: nextSlices,
      });
    },
    [disabled, onChange, playSFX, value],
  );

  const handleClearPizza = useCallback(
    (pizzaIdx: number) => {
      if (disabled) return;
      playSFX("CLICK");
      onChange({
        ...value,
        [pizzaIdx]: [],
      });
    },
    [disabled, onChange, playSFX, value],
  );

  return (
    <div className="flex flex-col gap-5">
      {config.instruction && (
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-sm text-purple-900 font-medium shadow-3xs flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
            ℹ
          </span>
          <span>{config.instruction}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {config.pizzas.map((pizza, pizzaIdx) => {
          const marked = value[pizzaIdx] || [];
          const count = marked.length;
          const total = pizza.totalSlices;
          const cx = 100;
          const cy = 100;
          const r = 85;
          const angleStep = 360 / total;

          // Parse target slice count if specified (e.g. "4/8" -> 4)
          let targetCount: number | null = null;
          if (pizza.targetFraction && pizza.targetFraction.includes("/")) {
            const parsed = parseInt(pizza.targetFraction.split("/")[0], 10);
            if (!isNaN(parsed)) targetCount = parsed;
          }
          const isTargetReached = targetCount !== null && count === targetCount;

          return (
            <div
              key={pizzaIdx}
              className={clsx(
                "flex flex-col items-center p-5 sm:p-6 rounded-2xl bg-white border transition-all duration-300 shadow-2xs",
                isTargetReached
                  ? "border-emerald-300 ring-2 ring-emerald-100"
                  : "border-slate-200/80 hover:border-purple-200",
              )}
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="font-bold text-base text-slate-800">
                  {pizza.label}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  {total} Potong
                </span>
              </div>

              {/* Pizza Interactive SVG Canvas with exploded wedge pop-out */}
              <div className="relative my-3 select-none">
                <svg
                  viewBox="0 0 200 200"
                  className="w-52 h-52 sm:w-60 sm:h-60 drop-shadow-md transition-transform"
                >
                  {/* Crust outer glow / circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 7}
                    fill="#e2a465"
                    stroke="#c27d38"
                    strokeWidth="3.5"
                  />
                  {/* Cheese / base filling */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="#fef08a"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />

                  {/* Slices (interactive sectors with exploded translation) */}
                  {Array.from({ length: total }).map((_, sliceIdx) => {
                    const isSelected = marked.includes(sliceIdx);
                    const startAngle = sliceIdx * angleStep;
                    const endAngle = startAngle + angleStep;
                    const midAngle = startAngle + angleStep / 2;

                    // Exploded pop-out radial translation
                    const offset = isSelected ? 5.5 : 0;
                    const radMid = ((midAngle - 90) * Math.PI) / 180;
                    const tx = offset * Math.cos(radMid);
                    const ty = offset * Math.sin(radMid);

                    // Pepperoni / topping dots decoration inside slice
                    const dotPos1 = polarToCartesian(cx, cy, r * 0.55, midAngle - angleStep * 0.15);
                    const dotPos2 = polarToCartesian(cx, cy, r * 0.72, midAngle + angleStep * 0.12);

                    return (
                      <g
                        key={sliceIdx}
                        transform={`translate(${tx.toFixed(2)}, ${ty.toFixed(2)})`}
                        onClick={() => handleToggleSlice(pizzaIdx, sliceIdx)}
                        className={clsx(
                          "cursor-pointer transition-transform duration-200 ease-out select-none",
                          disabled ? "cursor-not-allowed opacity-80" : "hover:opacity-90",
                        )}
                      >
                        {/* Sector wedge */}
                        <path
                          d={sectorPath(cx, cy, r, startAngle, endAngle)}
                          fill={isSelected ? "#f43f5e" : "#fef08a"}
                          fillOpacity={isSelected ? 0.85 : 0.95}
                          stroke={isSelected ? "#9f1239" : "#78350f"}
                          strokeWidth={isSelected ? "2.5" : "1.75"}
                          strokeDasharray={total > 4 && !isSelected ? "4 1" : undefined}
                          className="transition-colors duration-200"
                        />

                        {/* Visual toppings (pepperoni/tomato slice effect) */}
                        <circle
                          cx={dotPos1.x}
                          cy={dotPos1.y}
                          r={total <= 4 ? 6.5 : 4.5}
                          fill={isSelected ? "#fff" : "#ef4444"}
                          fillOpacity={isSelected ? "0.95" : "0.85"}
                          stroke={isSelected ? "#9f1239" : "#991b1b"}
                          strokeWidth="1"
                        />
                        {total <= 6 && (
                          <circle
                            cx={dotPos2.x}
                            cy={dotPos2.y}
                            r={total <= 4 ? 5.5 : 3.5}
                            fill={isSelected ? "#fff" : "#ef4444"}
                            fillOpacity={isSelected ? "0.95" : "0.85"}
                            stroke={isSelected ? "#9f1239" : "#991b1b"}
                            strokeWidth="1"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Center hub */}
                  <circle cx={cx} cy={cy} r="4.5" fill="#78350f" />
                </svg>
              </div>

              {/* Status / Fraction Badge */}
              <div className="w-full mt-3 flex items-center justify-between pt-3.5 border-t border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Ditandai:</span>
                  {isTargetReached ? (
                    <span className="font-extrabold text-sm sm:text-base text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-300 flex items-center gap-1.5 shadow-3xs">
                      <span>✓</span>
                      <InlineMath math={`\\dfrac{\\enspace ${count} \\enspace}{\\enspace ${total} \\enspace}`} />
                      <span className="text-xs font-bold text-emerald-600 ml-1">
                        (Target {count}/{total})
                      </span>
                    </span>
                  ) : (
                    <span className="font-extrabold text-sm sm:text-base text-purple-800 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200 flex items-center gap-1.5 shadow-3xs">
                      <InlineMath math={`\\dfrac{\\enspace ${count} \\enspace}{\\enspace ${total} \\enspace}`} />
                      {pizza.targetFraction && (
                        <span className="text-xs font-semibold text-slate-400 ml-1">
                          (Target: {pizza.targetFraction})
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {!disabled && count > 0 && (
                  <button
                    type="button"
                    onClick={() => handleClearPizza(pizzaIdx)}
                    className="text-xs text-slate-400 hover:text-rose-600 font-bold transition-colors py-1 px-2.5 rounded-lg hover:bg-rose-50 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
