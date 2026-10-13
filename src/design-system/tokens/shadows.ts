/**
 * Cretiq Design System — Shadow Tokens
 * 
 * Shadows communicate elevation and state.
 * Glow shadows are reserved for brand identity and "live" states.
 */

export const shadows = {
  // ── Standard Elevation Shadows ──
  // Communicates depth. Use for cards, modals, dropdowns.
  elevation: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.6)',
    glass: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },

  // ── Brand Glow Shadows ──
  // Reserved for emphasis. Do not overuse.
  glow: {
    brand: '0 0 24px rgba(69, 212, 131, 0.25)',
    brandStrong: '0 0 40px rgba(69, 212, 131, 0.4)',
    cyan: '0 0 24px rgba(45, 226, 230, 0.25)',
    cyanStrong: '0 0 40px rgba(45, 226, 230, 0.4)',
    warning: '0 0 24px rgba(245, 181, 68, 0.25)',
    danger: '0 0 24px rgba(255, 92, 103, 0.25)',
    dangerStrong: '0 0 40px rgba(255, 92, 103, 0.4)',
  },

  // ── Inner Shadows ──
  // For pressed states, inset elements
  inner: {
    sm: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)',
    md: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
    glass: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  },

  // ── Composite ──
  // Common combinations
  composite: {
    // Card at rest - subtle
    card: '0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
    // Card hover - elevated
    cardHover: '0 8px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    // Glass card with border highlight
    glassCard: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    // Dropdown/popover
    popover: '0 16px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    // Modal overlay backdrop
    modalBackdrop: 'inset 0 0 100px rgba(0, 0, 0, 0.8)',
  },
} as const;

export type ShadowToken = typeof shadows;
