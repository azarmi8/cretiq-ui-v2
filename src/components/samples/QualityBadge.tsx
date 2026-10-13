/**
 * QualityBadge — Shows strength classification relative to target
 * 
 * 7-day thresholds (relative to 28d target):
 *   ≥ 85% → excellent
 *   70-85% → good
 *   56-70% → warning
 *   < 56% → critical
 * 
 * 28-day thresholds (relative to target):
 *   ≥ 115% → excellent
 *   100-115% → good
 *   90-100% → warning
 *   < 90% → critical
 */

import { useTranslation } from 'react-i18next';
import { cn } from '../../design-system';
import { usePersianNumber } from '../../design-system';

export type QualityLevel = 'excellent' | 'good' | 'warning' | 'critical' | 'unknown';

const LEVEL_STYLES: Record<QualityLevel, { bg: string; border: string; text: string }> = {
  excellent: { bg: 'bg-[#A3D941]/15', border: 'border-[#A3D941]/40', text: 'text-[#A3D941]' },
  good:      { bg: 'bg-[#45D483]/15', border: 'border-[#45D483]/40', text: 'text-[#45D483]' },
  warning:   { bg: 'bg-[#F5B544]/15', border: 'border-[#F5B544]/40', text: 'text-[#F5B544]' },
  critical:  { bg: 'bg-[#FF5C67]/15', border: 'border-[#FF5C67]/40', text: 'text-[#FF5C67]' },
  unknown:   { bg: 'bg-white/5',      border: 'border-white/10',      text: 'text-[#475569]' },
};

/** 7-day: returns null when value is missing */
export function classify7d(pct: number | null): QualityLevel {
  if (pct === null) return 'unknown';
  if (pct >= 0.85) return 'excellent';
  if (pct >= 0.70) return 'good';
  if (pct >= 0.56) return 'warning';
  return 'critical';
}

/** 28-day: returns null when value is missing */
export function classify28d(pct: number | null): QualityLevel {
  if (pct === null) return 'unknown';
  if (pct >= 1.15) return 'excellent';
  if (pct >= 1.00) return 'good';
  if (pct >= 0.90) return 'warning';
  return 'critical';
}

export function QualityBadge({
  level,
  value,
  unit,
  percent,
}: {
  level: QualityLevel;
  value: number | null;
  unit: string;
  percent: number | null;
}) {
  const { t } = useTranslation();
  const { format, formatFixed } = usePersianNumber();
  const style = LEVEL_STYLES[level];

  const label = t(`quality.${level}`);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-mono font-bold',
        style.bg,
        style.border,
        style.text,
      )}
    >
      <span>{value === null ? '—' : formatFixed(value, 1)}</span>
      <span className="opacity-70 text-[9px]">{unit}</span>
      {percent !== null && (
        <span className="opacity-60 text-[10px]">
          ({format(percent * 100)}٪)
        </span>
      )}
    </span>
  );
}
