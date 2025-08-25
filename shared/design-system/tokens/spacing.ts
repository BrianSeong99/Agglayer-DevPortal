/**
 * Spacing Design Tokens
 * Based on Figma design system for Agglayer Developer Portal
 */

export const spacing = {
  // Base spacing scale
  0: '0px',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  49: '196px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',

  // Component-specific spacing
  component: {
    cardPadding: '24px',
    buttonPaddingX: '15px',
    buttonPaddingY: '8px',
    containerPadding: '48px',
    sectionGap: '196px',
    groupGap: '64px',
    itemGap: '24px',
    tightGap: '12px',
    microGap: '6px',
  },

  // Layout spacing
  layout: {
    pageMargin: '24px',
    maxWidth: '1440px',
    contentWidth: '1392px',
    narrowWidth: '940px',
    cardGrid: '12px',
  },
} as const;

// Size tokens (width/height)
export const sizing = {
  // Icon sizes
  icon: {
    xs: '12px',
    sm: '16px',
    md: '18px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '92px',
    '5xl': '96px',
    '6xl': '128px',
    '7xl': '160px',
    '8xl': '192px',
    '9xl': '224px',
    '10xl': '256px',
    '11xl': '288px',
    '12xl': '320px',
  },

  // Component sizes
  component: {
    buttonHeight: '30px',
    cardHeight: '305px',
    codeBlockMaxHeight: '370px',
    heroHeight: '388px',
  },

  // Container widths
  container: {
    xs: '300px',
    sm: '500px',
    md: '647px',
    lg: '940px',
    xl: '1392px',
    full: '100%',
  },
} as const;

// Border radius tokens
export const radius = {
  none: '0px',
  sm: '8px',
  md: '10px',
  lg: '12px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '40.289px',
  pill: '45px',
  round: '60px',
  full: '9999px',
} as const;

// Type definitions
export type SpacingToken = typeof spacing;
export type SizingToken = typeof sizing;
export type RadiusToken = typeof radius;
export type SpacingValue = keyof typeof spacing;
export type ComponentSpacing = keyof typeof spacing.component;
export type LayoutSpacing = keyof typeof spacing.layout;