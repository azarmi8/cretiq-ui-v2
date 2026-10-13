/**
 * EmptyState — Cretiq Design System
 * 
 * Shown when a section has no data. Icon + message + optional action.
 * Bilingual: all text provided by caller.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';

export interface EmptyStateProps {
  /** Icon element (from lucide-react, etc.) */
  icon?: ReactNode;
  /** Title (localized) */
  title: string;
  /** Optional description */
  description?: string;
  /** Optional action button */
  action?: ReactNode;
  /** Compact variant (for small panels) */
  compact?: boolean;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'py-6 px-4 gap-2' : 'py-12 px-6 gap-4',
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            'rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center',
            compact ? 'w-10 h-10' : 'w-14 h-14',
          )}
        >
          <span className={compact ? 'text-[#475569]' : 'text-[#475569]'}>
            {icon}
          </span>
        </div>
      )}
      <div className="space-y-1">
        <div
          className={cn(
            'font-medium text-[#94A3B8]',
            compact ? 'text-sm' : 'text-base',
          )}
        >
          {title}
        </div>
        {description && (
          <div className="text-xs text-[#475569] max-w-md">
            {description}
          </div>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
