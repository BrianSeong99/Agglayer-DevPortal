/**
 * Typography Design Tokens
 * Based on Figma design system for Agglayer Developer Portal
 */

export const typography = {
  // Font Families
  fontFamily: {
    heading: ['Inter Tight', 'sans-serif'],
    body: ['Inter', 'sans-serif'],
    mono: ['SF Mono', 'monospace'],
  },

  // Font Sizes
  fontSize: {
    '2xs': '10px',
    xs: '12px',
    sm: '14px',
    base: '15px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.08,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    // Specific values from Figma
    mono: '-0.36px',
    button: '0.24px',
  },

  // Text Styles (Compound tokens)
  textStyles: {
    // Headings
    h1: {
      fontFamily: 'Inter Tight',
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Inter Tight',
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: 'Inter Tight',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'Inter Tight',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: 'Inter Tight',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'Inter Tight',
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: 1.08,
    },

    // Body text
    body: {
      fontFamily: 'Inter',
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodyLarge: {
      fontFamily: 'Inter',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: 1.5,
    },

    // UI text
    button: {
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.08,
      letterSpacing: '0.24px',
    },
    caption: {
      fontFamily: 'SF Mono',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    label: {
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: 2,
    },

    // Code
    code: {
      fontFamily: 'SF Mono',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '-0.36px',
    },
    codeBlock: {
      fontFamily: 'SF Mono',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
} as const;

// Type definitions
export type TypographyToken = typeof typography;
export type FontFamily = keyof typeof typography.fontFamily;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type LineHeight = keyof typeof typography.lineHeight;
export type TextStyle = keyof typeof typography.textStyles;