/* ─────────────────────────────────────────────────────────────────────────────
 *  FractionOrdering — Answer Widget
 *  ──────────────────────────────────────────────────────────────────────────
 *  Renders an interactive sequence of fraction cards separated by `<` (or `>`).
 *  Students can reorder cards by:
 *    1. HTML5 Drag-and-Drop (mouse / pointer / touch)
 *    2. Tap / Click to select a card, then tap another card to swap them
 *    3. Direct Left / Right arrow buttons on each card (accessible & mobile-friendly)
 *
 *  Value shape: string[] (e.g. ['15/100', '17/100', '39/100', '65/100'])
 * ───────────────────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";
import clsx from "clsx";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { MathText } from "@/components/common/MathText";
import {
  GripVertical,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export interface FractionOrderingConfig {
  items: string[];
  separator?: "<" | ">";
  instruction?: string;
}

interface Props {
  config: FractionOrderingConfig;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

/** Renders a fraction using KaTeX mathematical typesetting with spacious display fractions. */
function StackedFraction({ fraction }: { fraction: string }) {
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

  try {
    return (
      <div className="inline-flex items-center justify-center text-xl font-semibold select-none text-slate-900">
        <InlineMath math={mathStr} />
      </div>
    );
  } catch {
    return (
      <span className="font-extrabold text-xl text-slate-800 tracking-tight">
        {fraction}
      </span>
    );
  }
}

export function FractionOrdering({ config, value, onChange, disabled }: Props) {
  const separator = config.separator || "<";
  const initialItems = config.items || [];

  // Track drag state
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  // Track click-to-swap selection
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Initialize value if empty or mismatched length
  useEffect(() => {
    if (!value || value.length !== initialItems.length) {
      onChange([...initialItems]);
    }
  }, [initialItems.length]);

  const items =
    value && value.length === initialItems.length ? value : initialItems;

  // Move item from one index to another (insert at new position)
  const moveItem = (fromIdx: number, toIdx: number) => {
    if (disabled || fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || toIdx >= items.length) {
      return;
    }
    const next = [...items];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    onChange(next);
  };

  // Swap two items directly
  const swapItems = (idxA: number, idxB: number) => {
    if (disabled || idxA === idxB) return;
    const next = [...items];
    const temp = next[idxA];
    next[idxA] = next[idxB];
    next[idxB] = temp;
    onChange(next);
  };

  // Reset to initial source order
  const handleReset = () => {
    if (disabled) return;
    setSelectedIdx(null);
    setDraggedIdx(null);
    setDragOverIdx(null);
    onChange([...initialItems]);
  };

  // Handle card click (tap-to-swap)
  const handleCardClick = (idx: number) => {
    if (disabled) return;
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      // Toggle deselect
      setSelectedIdx(null);
    } else {
      // Swap!
      swapItems(selectedIdx, idx);
      setSelectedIdx(null);
    }
  };

  // HTML5 Drag handlers
  const handleDragStart = (e: React.DragEvent, idx: number) => {
    if (disabled) return;
    e.dataTransfer.setData("text/plain", idx.toString());
    e.dataTransfer.effectAllowed = "move";
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (disabled) return;
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== idx) {
      setDragOverIdx(idx);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (disabled) return;
    const sourceIdxStr = e.dataTransfer.getData("text/plain");
    const sourceIdx = sourceIdxStr !== "" ? parseInt(sourceIdxStr, 10) : draggedIdx;
    if (sourceIdx !== null && !isNaN(sourceIdx)) {
      moveItem(sourceIdx, targetIdx);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const isOrderChanged =
    items.length > 0 &&
    items.some((item, idx) => item !== initialItems[idx]);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/90 bg-linear-to-b from-white to-slate-50/50 p-5 sm:p-6 shadow-sm">
      {/* Widget Header & Instructions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shadow-2xs">
            <Sparkles size={16} />
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-800 m-0">
              <MathText text={config.instruction || "Urutkan kartu pecahan berikut:"} />
            </h3>
            <p className="text-xs text-slate-500 font-medium m-0 mt-0.5">
              {selectedIdx !== null ? (
                <span className="text-purple-600 font-semibold animate-pulse">
                  Pilih kartu lain untuk menukar posisi
                </span>
              ) : (
                "Geser kartu (drag) atau gunakan tombol panah untuk mengatur urutan"
              )}
            </p>
          </div>
        </div>

        {/* Reset button */}
        {!disabled && isOrderChanged && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-600 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 border border-slate-200/70 hover:border-purple-200 transition-all cursor-pointer shadow-2xs"
            title="Kembalikan ke urutan awal"
          >
            <RotateCcw size={13} />
            Atur Ulang
          </button>
        )}
      </div>

      {/* Order Labels: Terkecil -> Terbesar */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-2">
        <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 border border-purple-200/60 px-2.5 py-0.5 rounded-full">
          Terkecil
        </span>
        <div className="flex-1 mx-3 border-t border-dashed border-slate-300" />
        <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 border border-purple-200/60 px-2.5 py-0.5 rounded-full">
          Terbesar
        </span>
      </div>

      {/* Slots and Cards Track */}
      <div className="overflow-x-auto pb-2 pt-1 -mx-2 px-2">
        <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-max mx-auto">
          {items.map((fraction, idx) => {
            const isDragging = draggedIdx === idx;
            const isDragOver = dragOverIdx === idx;
            const isSelected = selectedIdx === idx;

            return (
              <div key={`${fraction}-${idx}`} className="flex items-center gap-2 sm:gap-3">
                {/* Separator badge between cards (shown before card 1, 2, 3...) */}
                {idx > 0 && (
                  <div
                    className="w-8 h-8 rounded-full bg-slate-100/90 border border-slate-200/90 text-slate-600 font-black text-lg flex items-center justify-center shadow-2xs select-none flex-shrink-0"
                    aria-hidden="true"
                  >
                    {separator}
                  </div>
                )}

                {/* Fraction Card Slot */}
                <div
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={clsx(
                    "relative flex flex-col items-center justify-between rounded-2xl transition-all duration-200",
                    "p-3 sm:p-4 min-w-[5.25rem] sm:min-w-[5.75rem] min-h-[7.5rem]",
                    "bg-white border-2",
                    // Dragging & Hover states
                    isDragging && "opacity-40 scale-95 border-purple-400 border-dashed",
                    isDragOver && !isDragging && "border-purple-500 ring-4 ring-purple-500/20 bg-purple-50/50 scale-102",
                    isSelected && "border-purple-600 ring-4 ring-purple-600/25 bg-purple-50/80 shadow-md scale-105",
                    !isDragging && !isDragOver && !isSelected && "border-slate-200/90 hover:border-purple-300 shadow-2xs hover:shadow-sm",
                    disabled && "bg-slate-50/80 border-slate-200 shadow-none cursor-default",
                    !disabled && "cursor-grab active:cursor-grabbing",
                  )}
                  draggable={!disabled}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleCardClick(idx)}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  aria-label={`Kartu pecahan urutan ke-${idx + 1}: ${fraction}`}
                  onKeyDown={(e) => {
                    if (disabled) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(idx);
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      moveItem(idx, idx - 1);
                    } else if (e.key === "ArrowRight") {
                      e.preventDefault();
                      moveItem(idx, idx + 1);
                    }
                  }}
                >
                  {/* Top grip handle / slot number */}
                  <div className="w-full flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 px-1 py-0.5 rounded bg-slate-100">
                      #{idx + 1}
                    </span>
                    {!disabled && (
                      <GripVertical
                        size={14}
                        className={clsx(
                          "transition-colors",
                          isSelected ? "text-purple-600" : "text-slate-400 hover:text-slate-600",
                        )}
                      />
                    )}
                  </div>

                  {/* Stacked Fraction Value */}
                  <div className="my-1.5 flex items-center justify-center">
                    <StackedFraction fraction={fraction} />
                  </div>

                  {/* Bottom Quick-Action Arrow Buttons */}
                  {!disabled && (
                    <div
                      className="w-full flex items-center justify-center gap-1.5 mt-2 pt-1 border-t border-slate-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveItem(idx, idx - 1)}
                        className={clsx(
                          "w-6 h-6 rounded-md flex items-center justify-center text-slate-600 transition-all",
                          idx === 0
                            ? "opacity-20 cursor-not-allowed text-slate-300"
                            : "hover:bg-purple-100 hover:text-purple-700 active:scale-90 cursor-pointer bg-slate-100/70",
                        )}
                        title="Geser ke kiri"
                        aria-label={`Geser ${fraction} ke kiri`}
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={idx === items.length - 1}
                        onClick={() => moveItem(idx, idx + 1)}
                        className={clsx(
                          "w-6 h-6 rounded-md flex items-center justify-center text-slate-600 transition-all",
                          idx === items.length - 1
                            ? "opacity-20 cursor-not-allowed text-slate-300"
                            : "hover:bg-purple-100 hover:text-purple-700 active:scale-90 cursor-pointer bg-slate-100/70",
                        )}
                        title="Geser ke kanan"
                        aria-label={`Geser ${fraction} ke kanan`}
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Mathematical Expression Preview */}
      <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-purple-50/70 border border-purple-200/50 text-purple-900 font-bold text-sm sm:text-base tracking-wide">
        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider mr-1">
          Notasi:
        </span>
        <span className="font-extrabold text-purple-950 flex items-center">
          <InlineMath
            math={items
              .map((f) => {
                const trimmed = f.trim();
                if (!trimmed.startsWith("\\") && trimmed.includes("/")) {
                  const [n, d] = trimmed.split("/");
                  return `\\dfrac{${n.trim()}}{${d.trim()}}`;
                }
                return trimmed.replace(/\\frac/g, "\\dfrac");
              })
              .join(` ${separator} `)}
          />
        </span>
      </div>
    </div>
  );
}
