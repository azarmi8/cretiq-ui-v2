/**
 * Cretiq Design System — Utility Functions
 */

/**
 * Merge class names conditionally.
 * Lightweight alternative to clsx + tailwind-merge.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
