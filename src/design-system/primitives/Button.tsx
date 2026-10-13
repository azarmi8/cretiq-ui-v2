/**
 * Button — Cretiq Design System
 * 
 * Primary, secondary, ghost variants.
 * Focus states are always visible (accessibility).
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Optional icon on the start (left in LTR, right in RTL) */
  startIcon?: ReactNode;
  /** Optional icon on the end */
  endIcon?: ReactNode;
}

const VARIANT_CLASSES = {
  primary: [
    'bg-[#45D483] text-[#0B1117]',
    'hover:bg-[#A3D941]',
    'focus-visible:ring-2 focus-visible:ring-[#45D483] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1117]',
    'shadow-[0_0_20px_rgba(69,212,131,0.2)]',
  ].join(' '),
  secondary: [
    'bg-white/5 text-[#E7F7F8] border border-white/10',
    'hover:bg-white/10 hover:border-white/20',
    'focus-visible:ring-2 focus-visible:ring-[#2DE2E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1117]',
  ].join(' '),
  ghost: [
    'text-[#94A3B8]',
    'hover:bg-white/5 hover:text-[#E7F7F8]',
    'focus-visible:ring-2 focus-visible:ring-[#2DE2E6]',
  ].join(' '),
  danger: [
    'bg-[#FF5C67] text-white',
    'hover:bg-[#FF5C67]/90',
    'focus-visible:ring-2 focus-visible:ring-[#FF5C67] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1117]',
    'shadow-[0_0_20px_rgba(255,92,103,0.2)]',
  ].join(' '),
} as const;

const SIZE_CLASSES = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-xl',
} as const;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(
        // Base
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-200',
        'focus-visible:outline-none',
        // Variant
        VARIANT_CLASSES[variant],
        // Size
        SIZE_CLASSES[size],
        // Disabled
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        // Custom
        className,
      )}
    >
      {startIcon && <span aria-hidden="true">{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span aria-hidden="true">{endIcon}</span>}
    </button>
  );
}
