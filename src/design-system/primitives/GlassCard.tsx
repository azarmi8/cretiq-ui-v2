/**
 * GlassCard — Cretiq Design System
 * 
 * The foundational card primitive.
 * Glassmorphism + Cyber-Industrial aesthetic.
 * 
 * Uses design tokens. No hardcoded values.
 */

import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../utils';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Visual variant */
  variant?: 'default' | 'elevated' | 'flat';
  /** Whether the card reacts to hover */
  interactive?: boolean;
  /** Padding size */
  padding?: 'compact' | 'default' | 'loose' | 'none';
  /** Optional accent border (brand color) */
  accent?: 'none' | 'brand' | 'cyan' | 'warning' | 'danger';
}

const PADDING_CLASSES = {
  none: '',
  compact: 'p-4',
  default: 'p-6',
  loose: 'p-8',
} as const;

const ACCENT_CLASSES = {
  none: 'border-white/10',
  brand: 'border-[#45D483]/30',
  cyan: 'border-[#2DE2E6]/30',
  warning: 'border-[#F5B544]/30',
  danger: 'border-[#FF5C67]/30',
} as const;

const VARIANT_CLASSES = {
  default: 'bg-white/[0.03] backdrop-blur-2xl',
  elevated: 'bg-white/[0.05] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
  flat: 'bg-white/[0.02]',
} as const;

export function GlassCard({
  children,
  variant = 'default',
  interactive = false,
  padding = 'default',
  accent = 'none',
  className,
  ...rest
}: GlassCardProps) {
  return (
    <div
      {...rest}
      className={cn(
        // Base
        'rounded-2xl border transition-all duration-200',
        // Variant
        VARIANT_CLASSES[variant],
        // Accent border
        ACCENT_CLASSES[accent],
        // Padding
        PADDING_CLASSES[padding],
        // Interactive state
        interactive && 'hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-0.5 cursor-pointer',
        // Custom
        className,
      )}
    >
      {children}
    </div>
  );
}
