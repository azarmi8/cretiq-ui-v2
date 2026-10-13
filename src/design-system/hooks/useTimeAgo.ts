/**
 * useTimeAgo — Re-renders every second, returns a relative time formatter.
 * Locale-aware: Persian vs English labels with correct digits.
 */

import { useEffect, useState } from 'react';
import { useDirection } from './DirectionContext';
import { toPersianDigits } from './usePersianNumber';

export function useTimeAgo() {
  const { language } = useDirection();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  return (timestamp: number): string => {
    const diff = Math.max(0, Math.floor((now - timestamp) / 1000));

    if (language === 'fa') {
      if (diff < 5) return 'همین الان';
      if (diff < 60) return `${toPersianDigits(diff)} ثانیه پیش`;
      if (diff < 3600) return `${toPersianDigits(Math.floor(diff / 60))} دقیقه پیش`;
      return `${toPersianDigits(Math.floor(diff / 3600))} ساعت پیش`;
    }

    if (diff < 5) return 'just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };
}
