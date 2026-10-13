/**
 * Cretiq Design System — Typography Tokens
 * 
 * Font: Vazirmatn (Persian) + JetBrains Mono (numbers)
 * RTL-first: numbers are always Latin display, but rendered in Persian style
 */

export const typography = {
  // ── Font Families ──
  fontFamily: {
    sans: 'Vazirmatn, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, SF Mono, Consolas, monospace',
  },

  // ── Font Sizes (px) ──
  fontSize: {
    xs: '11px',      // Caption, tiny labels
    sm: '12px',      // Labels, table headers
    base: '14px',    // Body text
    md: '16px',      // Subheadings
    lg: '18px',      // Card titles
    xl: '24px',      // Section titles
    '2xl': '32px',   // Page titles
    '3xl': '40px',   // Hero titles
    '4xl': '48px',   // Display
  },

  // ── Font Weights ──
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // ── Line Heights ──
  lineHeight: {
    tight: 1.2,      // Titles
    normal: 1.5,     // Body
    relaxed: 1.7,    // Long-form Persian text
  },

  // ── Letter Spacing ──
  letterSpacing: {
    tight: '-0.02em',  // Large titles
    normal: '0',
    wide: '0.05em',    // Uppercase labels
    wider: '0.1em',    // Kicker text
  },

  // ── Composite Text Styles ──
  // Use these for consistent typography
  style: {
    display: {
      fontFamily: 'Vazirmatn, system-ui, sans-serif',
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    pageTitle: {
      fontFamily: 'Vazirmatn, system-ui, sans-serif',
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    sectionTitle: {
      fontFamily: 'Vazirmatn, system-ui, sans-serif',
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    cardTitle: {
      fontFamily: 'Vazirmatn, system-ui, sans-serif',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body: {
      fontFamily: 'Vazirmatn, system-ui, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    label: {
      fontFamily: 'Vazirmatn, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.05em',
    },
    caption: {
      fontFamily: 'Vazirmatn, system-ui, sans-serif',
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    kicker: {
      fontFamily: 'Vazirmatn, system-ui, sans-serif',
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
    },
    mono: {
      fontFamily: 'JetBrains Mono, SF Mono, Consolas, monospace',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    metric: {
      fontFamily: 'JetBrains Mono, SF Mono, Consolas, monospace',
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
  },
} as const;

export type TypographyToken = typeof typography;
