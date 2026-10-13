/**
 * Cretiq Design System — Motion Tokens
 * 
 * Motion is intentional. Every animation communicates state,
 * hierarchy, continuity, or feedback. Nothing decorative.
 * Reference: Emil Kowalski design-eng skill
 */

export const motion = {
  // ── Durations (ms) ──
  duration: {
    instant: 100,      // Micro-feedback (hover, focus)
    fast: 150,         // Quick state changes
    normal: 200,       // Default animation
    slow: 300,         // Complex transitions
    slower: 500,       // Page transitions
    loading: 1200,     // Loop animations
  },

  // ── Easing Curves ──
  easing: {
    // Standard ease-out: elements entering or appearing
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',

    // Standard ease-in: elements exiting
    easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',

    // Both directions: elements changing state
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Sharp: quick feedback (button press, toggle)
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

    // Spring-like: for playful micro-interactions
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',

    // Linear: for continuous loops (spinner, pulse)
    linear: 'linear',
  },

  // ── Common Transitions ──
  // Ready-to-use transition strings
  transition: {
    // Quick state feedback (hover colors, focus rings)
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Default for most UI changes
    normal: '200ms cubic-bezier(0.16, 1, 0.3, 1)',

    // Slow, smooth (page transitions, modal open)
    slow: '300ms cubic-bezier(0.16, 1, 0.3, 1)',

    // Transform-only (for performance - GPU accelerated)
    transform: '200ms cubic-bezier(0.16, 1, 0.3, 1)',

    // Opacity-only (for fade effects)
    opacity: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // ── Framer Motion Variants ──
  // Use these for Framer Motion animations
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    slideInRight: {
      initial: { opacity: 0, x: 20 },   // RTL: from right
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    slideInLeft: {
      initial: { opacity: 0, x: -20 },  // LTR: from left
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    // Stagger container for lists
    staggerContainer: {
      animate: {
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.1,
        },
      },
    },
  },

  // ── Ambient Animations ──
  // Repeating, subtle motions (for "live" indicators)
  ambient: {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      duration: 2000,
    },
    breathe: {
      opacity: [0.4, 1, 0.4],
      duration: 3000,
    },
    shimmer: {
      backgroundPosition: ['-1000px 0', '1000px 0'],
      duration: 2000,
    },
  },
} as const;

export type MotionToken = typeof motion;
