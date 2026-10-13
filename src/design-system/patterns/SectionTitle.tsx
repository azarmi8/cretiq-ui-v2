/**
 * SectionTitle — Cretiq Design System
 * 
 * Section heading with a colored vertical accent bar.
 * RTL-aware: accent bar on the right in RTL, left in LTR.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';
import { useDirection } from '../hooks/DirectionContext';

export interface SectionTitleProps {
  children: ReactNode;
  /** Accent color of the vertical bar */
  accent?: 'brand' | 'cyan' | 'warning' | 'danger';
  /** Optional action element on the opposite side */
  action?: ReactNode;
  className?: string;
}

const ACCENT_CLASSES = {
  brand: 'bg-[#45D483]',
  cyan: 'bg-[#2DE2E6]',
  warning: 'bg-[#F5B544]',
  danger: 'bg-[#FF5C67]',
} as const;

export function SectionTitle({
  children,
  accent = 'brand',
  action,
  className,
}: SectionTitleProps) {
  const { direction } = useDirection();
  const isRtl = direction === 'rtl';

  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'w-1 h-6 rounded-full',
            ACCENT_CLASSES[accent],
            // In RTL the bar is on the right
            isRtl ? 'order-1' : 'order-2',
          )}
        />
        <h2
          className={cn(
            'text-lg font-bold text-[#E7F7F8]',
            isRtl ? 'order-2' : 'order-1',
          )}
        >
          {children}
        </h2>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
