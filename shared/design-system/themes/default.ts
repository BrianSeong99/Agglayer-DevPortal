/**
 * Default Theme Configuration
 * Maps design tokens to semantic theme values
 */

import { designTokens } from '../index';

export const defaultTheme = {
  // Semantic color mappings
  colors: {
    // Brand
    brand: {
      primary: designTokens.colors.primary.DEFAULT,
      primaryRgb: designTokens.colors.primary.rgb,
      primaryHsl: designTokens.colors.primary.hsl,
    },

    // UI Colors
    ui: {
      background: {
        primary: designTokens.colors.background.primary,
        secondary: designTokens.colors.background.secondary,
        tertiary: designTokens.colors.background.tertiary,
        quaternary: designTokens.colors.background.quaternary,
      },
      text: {
        primary: designTokens.colors.text.primary,
        secondary: designTokens.colors.text.secondary,
        tertiary: designTokens.colors.text.tertiary,
        muted: designTokens.colors.text.quaternary,
        inverse: designTokens.colors.text.inverse,
      },
      border: {
        default: designTokens.colors.border.DEFAULT,
        light: designTokens.colors.border.light,
      },
    },

    // Component-specific colors
    components: {
      button: {
        primary: {
          bg: designTokens.colors.primary.DEFAULT,
          text: designTokens.colors.text.inverse,
          hover: designTokens.colors.primary.DEFAULT,
        },
        secondary: {
          bg: designTokens.colors.background.quaternary,
          text: designTokens.colors.text.tertiary,
          hover: designTokens.colors.background.tertiary,
        },
      },
      card: {
        bg: designTokens.colors.background.secondary,
        hover: designTokens.colors.background.tertiary,
      },
      code: {
        bg: designTokens.colors.background.primary,
        text: designTokens.colors.text.primary,
      },
    },

    // Status colors
    status: designTokens.colors.semantic,

    // Environment colors
    environment: designTokens.colors.environment,
  },

  // Typography presets
  typography: {
    // Heading styles
    heading: {
      h1: designTokens.typography.textStyles.h1,
      h2: designTokens.typography.textStyles.h2,
      h3: designTokens.typography.textStyles.h3,
      h4: designTokens.typography.textStyles.h4,
      h5: designTokens.typography.textStyles.h5,
      h6: designTokens.typography.textStyles.h6,
    },

    // Body styles
    body: {
      default: designTokens.typography.textStyles.body,
      small: designTokens.typography.textStyles.bodySmall,
      large: designTokens.typography.textStyles.bodyLarge,
    },

    // UI styles
    ui: {
      button: designTokens.typography.textStyles.button,
      caption: designTokens.typography.textStyles.caption,
      label: designTokens.typography.textStyles.label,
    },

    // Code styles
    code: {
      inline: designTokens.typography.textStyles.code,
      block: designTokens.typography.textStyles.codeBlock,
    },
  },

  // Layout presets
  layout: {
    container: {
      padding: designTokens.spacing.component.containerPadding,
      maxWidth: designTokens.spacing.layout.maxWidth,
      contentWidth: designTokens.spacing.layout.contentWidth,
      narrowWidth: designTokens.spacing.layout.narrowWidth,
    },
    section: {
      gap: designTokens.spacing.component.sectionGap,
    },
    grid: {
      gap: designTokens.spacing.layout.cardGrid,
    },
  },

  // Component presets
  components: {
    button: {
      height: designTokens.sizing.component.buttonHeight,
      paddingX: designTokens.spacing.component.buttonPaddingX,
      paddingY: designTokens.spacing.component.buttonPaddingY,
      radius: designTokens.radius.pill,
      fontSize: designTokens.typography.fontSize.xs,
      fontWeight: designTokens.typography.fontWeight.medium,
    },
    card: {
      padding: designTokens.spacing.component.cardPadding,
      radius: designTokens.radius.md,
      shadow: designTokens.shadows.card,
    },
    input: {
      height: '28.476px',
      paddingX: '18.75px',
      radius: designTokens.radius['3xl'],
      fontSize: designTokens.typography.fontSize.xs,
    },
  },

  // Animation presets
  animation: {
    duration: designTokens.animations.duration.normal,
    easing: designTokens.animations.easing.smooth,
    transition: designTokens.animations.transition.all,
  },
} as const;

export type Theme = typeof defaultTheme;