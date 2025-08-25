/**
 * Motion Animation Tokens
 * Centralized animation system for consistent motion across components
 */

export const motionTokens = {
  // Common animation variants
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

  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },

  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },

  // Stagger animations for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },

  // Hero section animations
  hero: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  // Section animations
  section: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  // Card animations
  card: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  // Button animations
  button: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  },

  // Icon animations
  icon: {
    whileHover: { rotate: 5, scale: 1.1 },
    transition: { duration: 0.2 },
  },

  // Page transitions
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },

  // Common transition settings
  transitions: {
    fast: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    normal: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    slow: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    slower: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },

  // Easing functions
  easing: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
  },
} as const;

// Type definitions
export type MotionToken = typeof motionTokens;
export type AnimationVariant = keyof typeof motionTokens;
export type TransitionSpeed = keyof typeof motionTokens.transitions;
export type EasingFunction = keyof typeof motionTokens.easing; 