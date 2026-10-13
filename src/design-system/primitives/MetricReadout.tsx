/**
 * MetricReadout — Cretiq Design System
 * 
 * Display a single metric (number + label + optional status).
 * Numbers use mono font for engineering precision.
 * Language-aware: numbers rendered in current locale format.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';
import { StatusBadge, type StatusVariant } from './StatusBadge';
import { useDirection } from '../hooks/DirectionContext';

export interface MetricReadoutProps {
  /** Metric label (localized by caller) */
  label: string;
  /** Metric value (number, string, or JSX) */
  value: ReactNode;
  /** Optional unit (MPa, °C, etc.) */
  unit?: string;
  /** Optional status badge */
  status?: StatusVariant;
  /** Optional status text */
  statusText?: string;
  /** Optional detail line */
  detail?: string;
  /** Visual emphasis */
  emphasis?: 'default' | 'brand' | 'cyan' | 'warning' | 'danger';
  className?: string;
}

const EMPHASIS_CLASSES = {
  default: 'text-[#E7F7F8]',
  brand: 'text-[#45D483]',
  cyan: 'text-[#2DE2E6]',
  warning: 'text-[#F5B544]',
  danger: 'text-[#FF5C67]',
} as const;

export function MetricReadout({
  label,
  value,
  unit,
  status,
  statusText,
  detail,
  emphasis = 'default',
  className,
}: MetricReadoutProps) {
  const { direction } = useDirection();

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span className="text-xs text-[#94A3B8] tracking-wider">
        {label}
      </span>
      <div
        className={cn(
          'flex items-baseline gap-1.5',
          // In RTL: number is on the left of unit
          direction === 'rtl' ? 'flex-row-reverse justify-end' : 'flex-row',
        )}
      >
        <span
          className={cn(
            'font-mono text-3xl font-bold tracking-tight',
            EMPHASIS_CLASSES[emphasis],
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs text-[#475569] font-mono">{unit}</span>
        )}
      </div>
      {status && statusText && (
        <StatusBadge variant={status} className="self-start">
          {statusText}
        </StatusBadge>
      )}
      {detail && <span className="text-xs text-[#475569]">{detail}</span>}
    </div>
  );
}
