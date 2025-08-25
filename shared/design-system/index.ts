/**
 * Agglayer Design System
 * Centralized design tokens and theme configuration
 */

export * from './tokens/colors';
export * from './tokens/typography';
export * from './tokens/spacing';
export * from './tokens/shadows';
export * from './tokens/motion';

// Re-export all tokens as a unified object
import { colors } from './tokens/colors';
import { typography } from './tokens/typography';
import { spacing, sizing, radius } from './tokens/spacing';
import { shadows, animations } from './tokens/shadows';
import { motionTokens } from './tokens/motion';

export const designTokens = {
  colors,
  typography,
  spacing,
  sizing,
  radius,
  shadows,
  animations,
  motion: motionTokens,
} as const;

// Helper functions for using tokens
export const token = {
  color: (path: string) => {
    const keys = path.split('.');
    let value: any = colors;
    for (const key of keys) {
      value = value[key];
    }
    return value;
  },
  
  space: (value: keyof typeof spacing) => spacing[value],
  
  size: (path: string) => {
    const keys = path.split('.');
    let value: any = sizing;
    for (const key of keys) {
      value = value[key];
    }
    return value;
  },
  
  radius: (value: keyof typeof radius) => radius[value],
  
  shadow: (value: keyof typeof shadows) => shadows[value],
  
  font: (path: string) => {
    const keys = path.split('.');
    let value: any = typography;
    for (const key of keys) {
      value = value[key];
    }
    return value;
  },
};