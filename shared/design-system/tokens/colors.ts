/**
 * Color Design Tokens
 * Based on Figma design system for Agglayer Developer Portal
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    DEFAULT: '#0071F7',
    rgb: '0, 113, 247',
    hsl: '212, 100%, 48%',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      DEFAULT: '#8E8E93',
      50: '#F9F9F9',
      100: '#F7FAFE',
      150: '#FBFAFA',
      200: '#F5F5F5',
      300: '#D9D9D9',
      400: '#A1A1AA',
      500: '#8E8E93',
      600: '#6B7280',
      700: '#23272F',
      800: '#17171797',
      900: '#0A0A0A',
    },
  },

  // Text Colors
  text: {
    primary: '#000000',
    secondary: 'rgba(0, 0, 0, 0.9)',
    tertiary: 'rgba(0, 0, 0, 0.6)',
    quaternary: 'rgba(0, 0, 0, 0.3)',
    inverse: '#FFFFFF',
    blue: {
      DEFAULT: 'rgba(0, 46, 101, 0.9)',
      muted: 'rgba(0, 46, 101, 0.8)',
      light: 'rgba(0, 46, 101, 0.6)',
    },
    link: '#0071F7',
    linkMuted: 'rgba(0, 113, 247, 0.8)',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F7FAFE',
    tertiary: '#F9F9F9',
    quaternary: '#FBFAFA',
    overlay: 'rgba(255, 255, 255, 0.94)',
  },

  // Environment Colors (keeping existing for AggNiverse)
  environment: {
    mainnet: '#00D4AA',
    cardona: '#FF8C42',
    bali: '#8B5CF6',
    agglayer: '#3B82F6',
  },

  // Border Colors
  border: {
    DEFAULT: 'rgba(0, 0, 0, 0.2)',
    light: 'rgba(0, 0, 0, 0.1)',
  },

  // Semantic Colors
  semantic: {
    success: '#00D4AA',
    warning: '#FF8C42',
    error: '#EF4444',
    info: '#0071F7',
  },
} as const;

// Type definitions
export type ColorToken = typeof colors;
export type PrimaryColor = keyof typeof colors.primary;
export type NeutralColor = keyof typeof colors.neutral;
export type TextColor = keyof typeof colors.text;
export type BackgroundColor = keyof typeof colors.background;
export type EnvironmentColor = keyof typeof colors.environment;