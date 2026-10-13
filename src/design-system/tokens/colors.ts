/**
 * Cretiq Design System — Color Tokens
 * 
 * Cyber-Industrial Green Palette
 * All values are frozen constants. No runtime computation.
 * Reference: Cretiq README.md + Stone Breaker Gharb brand
 */

export const colors = {
  // ── Background Layers ──
  background: {
    base: '#0B1117',       // Deepest - main canvas
    surface: '#111A22',    // Surface - cards base
    elevated: '#1A2328',   // Elevated - modals, popovers
    glass: 'rgba(255, 255, 255, 0.03)',  // Glass cards
    glassHover: 'rgba(255, 255, 255, 0.05)',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // ── Border System ──
  border: {
    subtle: 'rgba(45, 226, 230, 0.08)',
    medium: 'rgba(45, 226, 230, 0.15)',
    active: 'rgba(45, 226, 230, 0.30)',
    strong: 'rgba(45, 226, 230, 0.50)',
  },

  // ── Brand Colors ──
  brand: {
    primary: '#45D483',    // Primary green
    glow: '#A3D941',       // Brighter green (Stone Breaker Gharb)
    cyan: '#2DE2E6',       // Cyan neon
    teal: '#18B7A0',       // Deep teal
  },

  // ── Status Colors ──
  status: {
    success: '#45D483',
    warning: '#F5B544',
    danger: '#FF5C67',
    info: '#2DE2E6',
    neutral: '#94A3B8',
  },

  // ── Text System ──
  text: {
    primary: '#E7F7F8',    // Main text
    secondary: '#94A3B8',  // Secondary text
    muted: '#475569',      // Muted, disabled
    inverse: '#0B1117',    // Text on brand backgrounds
  },

  // ── Semantic Mappings ──
  semantic: {
    live: '#45D483',       // Live indicator
    inactive: '#475569',
    evidence: '#2DE2E6',   // Evidence-backed data
    unknown: '#94A3B8',    // Data not available
    'action-required': '#F5B544',
  },
} as const;

export type ColorToken = typeof colors;
