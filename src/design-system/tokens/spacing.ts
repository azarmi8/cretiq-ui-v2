/**
 * Cretiq Design System — Spacing Tokens
 * 
 * 4px base grid. All spacing values are multiples of 4.
 * RTL-compatible: left/right are logical, not physical.
 */

export const spacing = {
  // ── Base Scale ──
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',

  // ── Semantic Mappings ──
  // Component-level spacing (easier to reason about)
  component: {
    // Card internal padding
    cardPadding: '24px',
    cardPaddingCompact: '16px',
    cardPaddingLoose: '32px',

    // Gaps
    cardGap: '16px',           // Between cards
    sectionGap: '32px',        // Between sections
    inlineGap: '8px',          // Between inline elements
    stackGap: '12px',          // Vertical stack

    // Form spacing
    fieldGap: '16px',
    labelGap: '6px',

    // Sidebar/Header
    sidebarPadding: '12px',
    headerHeight: '64px',
    sidebarWidth: '256px',
    sidebarWidthCollapsed: '80px',
  },

  // ── Layout Widths ──
  width: {
    sidebar: '256px',
    sidebarCollapsed: '80px',
    maxContent: '1280px',
    maxProse: '720px',
    maxTable: '100%',
  },

  // ── Layout Heights ──
  height: {
    header: '64px',
    input: '40px',
    button: '40px',
    buttonSm: '32px',
    buttonLg: '48px',
    tabBar: '48px',
  },

  // ── Border Radius ──
  radius: {
    none: '0',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },
} as const;

export type SpacingToken = typeof spacing;
