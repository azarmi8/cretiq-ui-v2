/**
 * usePersianNumber — Cretiq Design System
 * 
 * Renders numbers in the correct locale format.
 * Persian locale uses ۰-۹ digits, English uses 0-9.
 */

import { useDirection } from './DirectionContext';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function usePersianNumber() {
  const { language } = useDirection();

  return {
    /** Convert to current locale digits */
    format: (value: string | number): string =>
      language === 'fa' ? toPersianDigits(value) : String(value),

    /** Convert to current locale with fixed decimal places */
    formatFixed: (value: number, digits = 1): string => {
      const fixed = value.toFixed(digits);
      return language === 'fa' ? toPersianDigits(fixed) : fixed;
    },

    /** Check if current locale is Persian */
    isPersian: language === 'fa',
  };
}
