/**
 * TopBar — Cretiq Design System
 * 
 * Top header bar with page title, status, and user actions.
 * All text is localized by the caller.
 */

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';
import { useDirection } from '../hooks/DirectionContext';
import { StatusBadge, type StatusVariant } from '../primitives/StatusBadge';

export interface TopBarProps {
  /** Page title (localized) */
  title: string;
  /** Optional subtitle / breadcrumb */
  subtitle?: string;
  /** Optional live status indicator */
  liveStatus?: {
    variant: StatusVariant;
    text: string;
    pulse?: boolean;
  };
  /** Right-side actions (language toggle, notifications, etc.) */
  actions?: ReactNode;
  /** User menu element */
  user?: ReactNode;
  className?: string;
}

export function TopBar({
  title,
  subtitle,
  liveStatus,
  actions,
  user,
  className,
}: TopBarProps) {
  const { direction } = useDirection();
  const isRtl = direction === 'rtl';

  return (
    <header
      className={cn(
        'h-16 flex items-center justify-between gap-4 px-6',
        'border-b border-white/5 bg-[#0A0F0D]/80 backdrop-blur-xl',
        'sticky top-0 z-40',
        className,
      )}
    >
      {/* Left: title + status */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="min-w-0">
          <h1 className="text-base font-bold text-[#E7F7F8] truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-[#475569] font-mono truncate">
              {subtitle}
            </p>
          )}
        </div>

        {liveStatus && (
          <StatusBadge
            variant={liveStatus.variant}
            pulse={liveStatus.pulse}
            dot
          >
            {liveStatus.text}
          </StatusBadge>
        )}
      </div>

      {/* Right: actions + user */}
      <div className={cn('flex items-center gap-2', isRtl && 'flex-row-reverse')}>
        {actions}
        {user && <div className="ms-2">{user}</div>}
      </div>
    </header>
  );
}
