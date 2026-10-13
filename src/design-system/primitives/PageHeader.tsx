/**
 * PageHeader — Cretiq Design System
 * 
 * Top-of-page header with kicker, title, description, status, and actions.
 * All text is localized by the caller. Structure is language-agnostic.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';
import { Kicker } from './Kicker';
import { StatusBadge, type StatusVariant } from './StatusBadge';

export interface PageHeaderProps {
  /** Small uppercase kicker text (e.g., "EX-QC · QUALITY OFFICE") */
  kicker: string;
  /** Main title (localized) */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Optional status indicator */
  status?: {
    variant: StatusVariant;
    text: string;
    pulse?: boolean;
  };
  /** Optional actions (buttons, links) */
  actions?: ReactNode;
  /** Optional meta info (badges, chips) */
  meta?: ReactNode;
  className?: string;
}

export function PageHeader({
  kicker,
  title,
  description,
  status,
  actions,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('flex items-start justify-between gap-6', className)}>
      <div className="flex-1 min-w-0">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-2 text-3xl font-bold text-[#E7F7F8] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-[#94A3B8] max-w-2xl">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {status && (
            <StatusBadge variant={status.variant} pulse={status.pulse} dot>
              {status.text}
            </StatusBadge>
          )}
          {meta}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </header>
  );
}
