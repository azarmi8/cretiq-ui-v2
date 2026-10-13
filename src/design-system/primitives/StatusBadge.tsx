/**
 * StatusBadge — Cretiq Design System
 * 
 * Colored badge for statuses (live, warning, danger, evidence, etc.)
 * Uses color tokens. Small, compact, RTL-friendly.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';

export type StatusVariant =
  | 'live'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'evidence'
  | 'inactive';

export interface StatusBadgeProps {
  variant: StatusVariant;
  children: ReactNode;
  /** Show a pulsing dot indicator (for live states) */
  pulse?: boolean;
  /** Show a solid dot indicator */
  dot?: boolean;
  className?: string;
}

const VARIANT_CLASSES: Record<StatusVariant, { bg: string; border: string; text: string; dot: string }> = {
  live: {
    bg: 'bg-[#45D483]/10',
    border: 'border-[#45D483]/30',
    text: 'text-[#45D483]',
    dot: 'bg-[#45D483] shadow-[0_0_8px_rgba(69,212,131,0.6)]',
  },
  success: {
    bg: 'bg-[#45D483]/10',
    border: 'border-[#45D483]/30',
    text: 'text-[#45D483]',
    dot: 'bg-[#45D483]',
  },
  warning: {
    bg: 'bg-[#F5B544]/10',
    border: 'border-[#F5B544]/30',
    text: 'text-[#F5B544]',
    dot: 'bg-[#F5B544]',
  },
  danger: {
    bg: 'bg-[#FF5C67]/10',
    border: 'border-[#FF5C67]/30',
    text: 'text-[#FF5C67]',
    dot: 'bg-[#FF5C67]',
  },
  info: {
    bg: 'bg-[#2DE2E6]/10',
    border: 'border-[#2DE2E6]/30',
    text: 'text-[#2DE2E6]',
    dot: 'bg-[#2DE2E6]',
  },
  neutral: {
    bg: 'bg-white/5',
    border: 'border-white/10',
    text: 'text-[#94A3B8]',
    dot: 'bg-[#94A3B8]',
  },
  evidence: {
    bg: 'bg-[#2DE2E6]/10',
    border: 'border-[#2DE2E6]/30',
    text: 'text-[#2DE2E6]',
    dot: 'bg-[#2DE2E6]',
  },
  inactive: {
    bg: 'bg-white/5',
    border: 'border-white/10',
    text: 'text-[#475569]',
    dot: 'bg-[#475569]',
  },
};

export function StatusBadge({
  variant,
  children,
  pulse = false,
  dot = false,
  className,
}: StatusBadgeProps) {
  const v = VARIANT_CLASSES[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium',
        v.bg,
        v.border,
        v.text,
        className,
      )}
    >
      {(dot || pulse) && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            v.dot,
            pulse && 'animate-pulse',
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
