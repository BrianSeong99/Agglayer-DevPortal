/**
 * Shadow Design Tokens
 * Based on Figma design system for Agglayer Developer Portal
 */

export const shadows = {
  // Elevation levels
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Component-specific shadows
  card: '0 2px 8px rgba(0, 0, 0, 0.08)',
  button: '0 1px 3px rgba(0, 0, 0, 0.12)',
  buttonHover: '0 4px 12px rgba(0, 113, 247, 0.15)',
  
  // Inset shadows
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  innerLg: 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)',

  // Colored shadows
  primary: '0 4px 14px 0 rgba(0, 113, 247, 0.3)',
  success: '0 4px 14px 0 rgba(0, 212, 170, 0.3)',
  warning: '0 4px 14px 0 rgba(255, 140, 66, 0.3)',
  error: '0 4px 14px 0 rgba(239, 68, 68, 0.3)',
} as const;

// Animation tokens
export const animations = {
  // Durations
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '400ms',
    slower: '600ms',
    slowest: '1000ms',
  },

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Transitions
  transition: {
    all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'background-color, border-color, color, fill, stroke 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Type definitions
export type ShadowToken = typeof shadows;
export type AnimationToken = typeof animations;
export type ShadowValue = keyof typeof shadows;
export type Duration = keyof typeof animations.duration;
export type Easing = keyof typeof animations.easing;