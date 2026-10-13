/**
 * AppShell — Cretiq Design System
 * 
 * Main application layout: Sidebar + TopBar + Main content area.
 * Handles RTL/LTR automatically via DirectionContext.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';
import { useDirection } from '../hooks/DirectionContext';

export interface AppShellProps {
  sidebar: ReactNode;
  topBar?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AppShell({ sidebar, topBar, children, className }: AppShellProps) {
  const { direction } = useDirection();

  return (
    <div
      dir={direction}
      className={cn('flex h-screen bg-[#0B1117] overflow-hidden', className)}
    >
      {/* Sidebar (already handles its own side) */}
      {sidebar}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {topBar}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
