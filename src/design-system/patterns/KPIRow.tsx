/**
 * KPIRow — Cretiq Design System
 * 
 * A responsive grid of MetricReadout cards.
 * 1 col mobile → 2 cols tablet → 4 cols desktop.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';
import { GlassCard } from '../primitives/GlassCard';

export interface KPIRowProps {
  children: ReactNode;
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLUMN_CLASSES = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
} as const;

export function KPIRow({ children, columns = 4, className }: KPIRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-4',
        COLUMN_CLASSES[columns],
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A single KPI card wrapper (GlassCard + padding) */
export function KPICard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <GlassCard interactive className={cn('group', className)}>
      {children}
    </GlassCard>
  );
}
