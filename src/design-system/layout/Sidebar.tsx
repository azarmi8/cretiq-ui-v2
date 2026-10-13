/**
 * Sidebar — Cretiq Design System
 * 
 * Router-agnostic navigation sidebar.
 * RTL-aware: in RTL, sidebar is on the right.
 * Collapsible: shows only icons when collapsed.
 * 
 * All localized text is passed as props — no hardcoded strings.
 */

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';
import { useDirection } from '../hooks/DirectionContext';

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number;
}

export interface SidebarLabels {
  /** Text shown on the collapse button */
  collapse: string;
}

export interface SidebarProps {
  /** Logo area (top of sidebar) */
  logo: ReactNode;
  /** Navigation items */
  items: NavItem[];
  /** Currently active item id */
  activeId: string;
  /** Navigation handler */
  onNavigate: (id: string) => void;
  /** Localized UI labels */
  labels: SidebarLabels;
  /** Whether sidebar is collapsed (icons only) */
  collapsed?: boolean;
  /** Toggle collapsed state */
  onToggleCollapsed?: () => void;
  /** Optional footer content */
  footer?: ReactNode;
  className?: string;
}

export function Sidebar({
  logo,
  items,
  activeId,
  onNavigate,
  labels,
  collapsed = false,
  onToggleCollapsed,
  footer,
  className,
}: SidebarProps) {
  const { direction } = useDirection();
  const isRtl = direction === 'rtl';

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen bg-[#0A0F0D] transition-all duration-300',
        isRtl ? 'border-l' : 'border-r',
        'border-white/5',
        collapsed ? 'w-20' : 'w-64',
        className,
      )}
    >
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        {logo}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={cn(
                'w-full flex items-center rounded-xl transition-all duration-200 group relative',
                collapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-2.5',
                isActive
                  ? 'bg-gradient-to-l from-[#45D483]/15 to-transparent border border-[#45D483]/30'
                  : 'hover:bg-white/5 border border-transparent',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeIndicator"
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-[#45D483] rounded-full',
                    isRtl ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full',
                  )}
                  style={{ boxShadow: '0 0 20px rgba(69, 212, 131, 0.4)' }}
                />
              )}

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'shrink-0 transition-colors',
                    isActive ? 'text-[#45D483]' : 'text-gray-400 group-hover:text-white',
                  )}
                >
                  {item.icon}
                </span>
                {!collapsed && (
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isActive ? 'text-[#45D483]' : 'text-gray-400 group-hover:text-white',
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </div>

              {!collapsed && item.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full bg-[#FF5C67]/20 border border-[#FF5C67]/30 text-[#FF5C67] text-xs font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/5 space-y-2">
        {onToggleCollapsed && (
          <button
            onClick={onToggleCollapsed}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all text-xs"
          >
            <span className={cn('transition-transform', collapsed && 'rotate-180')}>
              {isRtl ? '←' : '→'}
            </span>
            {!collapsed && <span>{labels.collapse}</span>}
          </button>
        )}
        {footer}
      </div>
    </aside>
  );
}
