/**
 * CommandPalette — Global ⌘K command menu.
 * RTL-aware, keyboard-driven, fuzzy-ish filtering.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils';

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export function CommandPalette({
  items,
  open,
  onOpenChange,
  placeholder,
}: {
  items: CommandItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.group?.toLowerCase().includes(q) ?? false),
    );
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) {
        item.onSelect();
        onOpenChange(false);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl z-50"
            dir="rtl"
          >
            <div
              className="rounded-2xl border border-white/10 bg-[#0F1410]/95 backdrop-blur-2xl overflow-hidden"
              style={{
                boxShadow:
                  '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(69,212,131,0.08), 0 0 40px rgba(69,212,131,0.06)',
              }}
              onKeyDown={handleKeyDown}
            >
              <div className="flex items-center gap-3 px-4 h-14 border-b border-white/10">
                <Search className="w-4 h-4 text-[#45D483] shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder={placeholder ?? t('command.placeholder')}
                  className="flex-1 bg-transparent outline-none text-sm text-[#E7F7F8] placeholder:text-[#475569]"
                />
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#475569] font-mono">
                  ESC
                </kbd>
              </div>

              <div ref={listRef} className="max-h-[360px] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-xs text-[#475569]">
                    {t('command.empty')}
                  </div>
                ) : (
                  filtered.map((item, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={item.id}
                        data-index={i}
                        onClick={() => {
                          item.onSelect();
                          onOpenChange(false);
                        }}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start transition-colors',
                          isActive
                            ? 'bg-[#45D483]/10 border border-[#45D483]/30'
                            : 'border border-transparent hover:bg-white/5',
                        )}
                      >
                        {item.icon && (
                          <span
                            className={cn(
                              'shrink-0',
                              isActive ? 'text-[#45D483]' : 'text-[#94A3B8]',
                            )}
                          >
                            {item.icon}
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div
                            className={cn(
                              'text-sm font-medium truncate',
                              isActive ? 'text-[#45D483]' : 'text-[#E7F7F8]',
                            )}
                          >
                            {item.label}
                          </div>
                          {item.group && (
                            <div className="text-[10px] text-[#475569] mt-0.5">
                              {item.group}
                            </div>
                          )}
                        </div>
                        {item.shortcut && (
                          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#475569] font-mono shrink-0">
                            {item.shortcut}
                          </kbd>
                        )}
                        {isActive && (
                          <CornerDownLeft className="w-3 h-3 text-[#45D483] shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="px-4 h-10 border-t border-white/10 flex items-center justify-between text-[10px] text-[#475569] font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 rounded bg-white/5 border border-white/10">↑↓</kbd>
                    {t('command.navigate')}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 rounded bg-white/5 border border-white/10">↵</kbd>
                    {t('command.select')}
                  </span>
                </div>
                <span>
                  {filtered.length} {t('command.results')}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
