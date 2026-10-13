/**
 * Sparkline — Minimal SVG mini-chart for KPI cards.
 */

import { useId } from 'react';

export function Sparkline({
  data,
  color = '#45D483',
  width = 80,
  height = 24,
  showArea = true,
  className,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  showArea?: boolean;
  className?: string;
}) {
  const id = useId();
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;
  const last = data[data.length - 1];
  const lastY = height - ((last - min) / range) * (height - 4) - 2;

  return (
    <svg width={width} height={height} className={className} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`spark-area-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showArea && <polygon points={areaPoints} fill={`url(#spark-area-${id})`} />}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={width} cy={lastY} r="2" fill={color} />
    </svg>
  );
}
