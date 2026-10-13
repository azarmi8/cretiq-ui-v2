/**
 * Kicker — Cretiq Design System
 * 
 * Small uppercase text label used above titles.
 * Always rendered in Latin for that "industrial" feel.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';

export interface KickerProps {
  children: ReactNode;
  /** Semantic color variant */
  variant?: 'default' | 'brand' | 'cyan' | 'muted';
  className?: string;
}

const VARIANT_CLASSES = {
  default: 'text-[#94A3B8]',
  brand: 'text-[#45D483]',
  cyan: 'text-[#2DE2E6]',
  muted: 'text-[#475569]',
} as const;

export function Kicker({ children, variant = 'default', className }: KickerProps) {
  return (
    <span
      className={cn(
        'text-[11px] font-semibold tracking-[0.1em] uppercase',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
