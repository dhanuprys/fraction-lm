/* ─────────────────────────────────────────────────────────────────────────────
 *  SVG Fraction Diagrams
 *  ──────────────────────────────────────────────────────────────────────────
 *  Pure-display SVG components for rendering rectangle and circle fraction
 *  diagrams.  Used in question visuals (TipTapRenderer) and the
 *  FractionIdentify widget.
 * ───────────────────────────────────────────────────────────────────────── */

// ─── Rectangle Diagram ──────────────────────────────────────────────────────

interface RectangleDiagramProps {
  rows: number;
  cols: number;
  totalParts: number;
  shadedParts: number[];
  /** Width in px — height scales proportionally */
  width?: number;
  className?: string;
}

export function RectangleDiagram({
  rows,
  cols,
  shadedParts,
  width = 200,
  className,
}: RectangleDiagramProps) {
  const cellW = 1;
  const cellH = 1;
  const totalW = cols * cellW;
  const totalH = rows * cellH;
  const pad = 0.05;

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${totalW + pad * 2} ${totalH + pad * 2}`}
      width={width}
      className={className}
      role="img"
      aria-label={`Persegi panjang dibagi ${rows * cols} bagian, ${shadedParts.length} bagian diarsir`}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const partIndex = r * cols + c;
          const isShaded = shadedParts.includes(partIndex);
          return (
            <rect
              key={`${r}-${c}`}
              x={c * cellW}
              y={r * cellH}
              width={cellW}
              height={cellH}
              fill={isShaded ? "#a78bfa" : "#f8fafc"}
              stroke="#94a3b8"
              strokeWidth={0.03}
              rx={0.02}
            />
          );
        }),
      )}
    </svg>
  );
}

// ─── Circle Diagram ─────────────────────────────────────────────────────────

interface CircleDiagramProps {
  totalParts: number;
  shadedParts: number[];
  /** Diameter in px */
  size?: number;
  className?: string;
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

export function CircleDiagram({
  totalParts,
  shadedParts,
  size = 160,
  className,
}: CircleDiagramProps) {
  const cx = 50;
  const cy = 50;
  const r = 45;
  const angleStep = 360 / totalParts;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Lingkaran dibagi ${totalParts} bagian, ${shadedParts.length} bagian diarsir`}
    >
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r} fill="#f8fafc" stroke="#94a3b8" strokeWidth={0.8} />

      {/* Sectors */}
      {Array.from({ length: totalParts }).map((_, i) => {
        const isShaded = shadedParts.includes(i);
        const startAngle = i * angleStep;
        const endAngle = startAngle + angleStep;
        return (
          <path
            key={i}
            d={sectorPath(cx, cy, r, startAngle, endAngle)}
            fill={isShaded ? "#a78bfa" : "transparent"}
            stroke="#94a3b8"
            strokeWidth={0.6}
          />
        );
      })}
    </svg>
  );
}

// ─── Diagonal Rectangle Diagram ─────────────────────────────────────────────
// Each rectangular cell is split diagonally (top-left → bottom-right), forming
// two triangles per cell.  shadedParts indices: for cell at (r,c), the UPPER
// triangle is index (r*cols + c)*2, the LOWER triangle is (r*cols + c)*2 + 1.

interface DiagonalRectangleDiagramProps {
  rows: number;
  cols: number;
  totalParts: number;
  shadedParts: number[];
  width?: number;
  className?: string;
}

export function DiagonalRectangleDiagram({
  rows,
  cols,
  shadedParts,
  width = 200,
  className,
}: DiagonalRectangleDiagramProps) {
  const cellW = 1;
  const cellH = 1;
  const totalW = cols * cellW;
  const totalH = rows * cellH;
  const pad = 0.05;

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${totalW + pad * 2} ${totalH + pad * 2}`}
      width={width}
      className={className}
      role="img"
      aria-label={`Persegi panjang dibagi diagonal, ${shadedParts.length} segitiga diarsir`}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const x = c * cellW;
          const y = r * cellH;
          const upperIdx = (r * cols + c) * 2;
          const lowerIdx = upperIdx + 1;
          const upperShaded = shadedParts.includes(upperIdx);
          const lowerShaded = shadedParts.includes(lowerIdx);

          return (
            <g key={`${r}-${c}`}>
              <polygon
                points={`${x},${y} ${x + cellW},${y} ${x},${y + cellH}`}
                fill={upperShaded ? "#a78bfa" : "#f8fafc"}
                stroke="#94a3b8"
                strokeWidth={0.03}
              />
              <polygon
                points={`${x + cellW},${y} ${x + cellW},${y + cellH} ${x},${y + cellH}`}
                fill={lowerShaded ? "#a78bfa" : "#f8fafc"}
                stroke="#94a3b8"
                strokeWidth={0.03}
              />
              {/* Diagonal line */}
              <line
                x1={x}
                y1={y + cellH}
                x2={x + cellW}
                y2={y}
                stroke="#94a3b8"
                strokeWidth={0.03}
              />
            </g>
          );
        }),
      )}
    </svg>
  );
}
