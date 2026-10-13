/**
 * DataTable — Cretiq Design System
 * 
 * Generic, RTL-aware data table with:
 * - Column grouping (multi-level headers)
 * - Sticky first N columns
 * - Zebra + hover rows
 * - Horizontal scroll
 * - Empty state support
 * 
 * All text localized by caller.
 */

import type { ReactNode } from 'react';
import { cn } from '../utils';
import { useDirection } from '../hooks/DirectionContext';

export interface ColumnDef<T> {
  id: string;
  /** Column header (localized) */
  header: string;
  /** Optional group label — columns with same group share a merged header cell */
  group?: string;
  /** Column width (px number or CSS string) */
  width?: number | string;
  /** Content alignment within cell */
  align?: 'start' | 'center' | 'end';
  /** Render cell content from row */
  render: (row: T, index: number) => ReactNode;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  rows: T[];
  /** Unique key per row */
  getRowKey: (row: T, index: number) => string;
  /** Number of first columns to freeze (default 0) */
  stickyColumns?: number;
  /** Rendered when rows is empty */
  emptyState?: ReactNode;
  className?: string;
}

const ALIGN_CLASSES = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
} as const;

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  stickyColumns = 0,
  emptyState,
  className,
}: DataTableProps<T>) {
  const { direction } = useDirection();
  const isRtl = direction === 'rtl';

  // Group columns preserving order of first appearance
  const groups: Array<{ label: string | null; span: number; startIndex: number }> = [];
  for (let i = 0; i < columns.length; i++) {
    const g = columns[i].group ?? null;
    const last = groups[groups.length - 1];
    if (last && last.label === g) {
      last.span += 1;
    } else {
      groups.push({ label: g, span: 1, startIndex: i });
    }
  }

  // Compute sticky offsets (cumulative widths of previous sticky columns)
  const stickyOffsets: number[] = [];
  let acc = 0;
  for (let i = 0; i < columns.length; i++) {
    if (i < stickyColumns) {
      stickyOffsets[i] = acc;
      const w = typeof columns[i].width === 'number' ? columns[i].width : 120;
      acc += w;
    } else {
      stickyOffsets[i] = 0;
    }
  }

  const stickyBg = '#0F1410';

  const renderStickyStyle = (i: number): React.CSSProperties => {
    if (i >= stickyColumns) return {};
    const offset = stickyOffsets[i];
    return {
      position: 'sticky',
      [isRtl ? 'right' : 'left']: `${offset}px`,
      zIndex: 10,
      backgroundColor: stickyBg,
    };
  };

  const hasGroups = groups.some((g) => g.label !== null);

  return (
    <div className={cn('w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]', className)}>
      <table className="w-full text-sm" dir={direction}>
        <thead>
          {/* Group row */}
          {hasGroups && (
            <tr className="border-b border-white/10">
              {groups.map((g, gi) => (
                <th
                  key={`g-${gi}`}
                  colSpan={g.span}
                  className={cn(
                    'h-8 px-3 text-center text-[10px] font-bold tracking-widest uppercase',
                    g.label === null ? 'text-transparent' : 'text-[#94A3B8]',
                    'bg-white/[0.02] border-e border-white/5',
                  )}
                >
                  {g.label ?? '·'}
                </th>
              ))}
            </tr>
          )}
          {/* Column headers */}
          <tr className="border-b border-white/10 bg-white/[0.03]">
            {columns.map((col, i) => (
              <th
                key={col.id}
                style={{
                  width: col.width,
                  ...renderStickyStyle(i),
                }}
                className={cn(
                  'h-10 px-3 text-[11px] font-bold tracking-wide',
                  ALIGN_CLASSES[col.align ?? 'start'],
                  'text-[#E7F7F8] whitespace-nowrap',
                  i < stickyColumns && 'border-e border-white/10',
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8">
                {emptyState ?? (
                  <div className="text-center text-sm text-[#475569]">داده‌ای برای نمایش نیست</div>
                )}
              </td>
            </tr>
          ) : (
            rows.map((row, ri) => (
              <tr
                key={getRowKey(row, ri)}
                className={cn(
                  'border-b border-white/5 transition-colors',
                  ri % 2 === 1 ? 'bg-white/[0.01]' : '',
                  'hover:bg-white/[0.05]',
                )}
              >
                {columns.map((col, i) => (
                  <td
                    key={col.id}
                    style={renderStickyStyle(i)}
                    className={cn(
                      'h-11 px-3 text-[12px]',
                      ALIGN_CLASSES[col.align ?? 'start'],
                      'text-[#E7F7F8] whitespace-nowrap',
                      i < stickyColumns && 'border-e border-white/5',
                    )}
                  >
                    {col.render(row, ri)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
