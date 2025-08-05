/** @type {import('tailwindcss').Config} */
const { designTokens } = require('./shared/design-system/index.ts');

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  theme: {
    // Override default theme values
    colors: {
      // Transparent and current
      transparent: 'transparent',
      current: 'currentColor',
      
      // Primary brand color
      primary: {
        DEFAULT: designTokens.colors.primary.DEFAULT,
        foreground: designTokens.colors.text.inverse,
      },
      
      // Neutral colors
      white: designTokens.colors.neutral.white,
      black: designTokens.colors.neutral.black,
      gray: designTokens.colors.neutral.gray,
      
      // Semantic colors
      success: designTokens.colors.semantic.success,
      warning: designTokens.colors.semantic.warning,
      error: designTokens.colors.semantic.error,
      info: designTokens.colors.semantic.info,
      
      // Environment colors
      mainnet: designTokens.colors.environment.mainnet,
      cardona: designTokens.colors.environment.cardona,
      bali: designTokens.colors.environment.bali,
      agglayer: designTokens.colors.environment.agglayer,
      
      // ShadCN compatibility layer (maps to new tokens)
      border: designTokens.colors.border.DEFAULT,
      input: designTokens.colors.border.DEFAULT,
      ring: designTokens.colors.primary.DEFAULT,
      background: designTokens.colors.background.primary,
      foreground: designTokens.colors.text.primary,
      
      secondary: {
        DEFAULT: designTokens.colors.background.secondary,
        foreground: designTokens.colors.text.secondary,
      },
      
      destructive: {
        DEFAULT: designTokens.colors.semantic.error,
        foreground: designTokens.colors.text.inverse,
      },
      
      muted: {
        DEFAULT: designTokens.colors.background.tertiary,
        foreground: designTokens.colors.text.tertiary,
      },
      
      accent: {
        DEFAULT: designTokens.colors.background.secondary,
        foreground: designTokens.colors.text.primary,
      },
      
      popover: {
        DEFAULT: designTokens.colors.background.primary,
        foreground: designTokens.colors.text.primary,
      },
      
      card: {
        DEFAULT: designTokens.colors.background.secondary,
        foreground: designTokens.colors.text.primary,
      },
    },
    
    fontFamily: {
      sans: designTokens.typography.fontFamily.body,
      heading: designTokens.typography.fontFamily.heading,
      mono: designTokens.typography.fontFamily.mono,
    },
    
    fontSize: designTokens.typography.fontSize,
    fontWeight: designTokens.typography.fontWeight,
    lineHeight: designTokens.typography.lineHeight,
    letterSpacing: {
      ...designTokens.typography.letterSpacing,
      tighter: '-0.02em',
    },
    
    spacing: designTokens.spacing,
    
    borderRadius: {
      ...designTokens.radius,
      // ShadCN compatibility
      lg: designTokens.radius.lg,
      md: designTokens.radius.md,
      sm: designTokens.radius.sm,
    },
    
    boxShadow: designTokens.shadows,
    
    container: {
      center: true,
      padding: {
        DEFAULT: designTokens.spacing.layout.pageMargin,
        sm: designTokens.spacing[6],
        lg: designTokens.spacing[12],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': designTokens.spacing.layout.maxWidth,
      },
    },
    
    extend: {
      // Additional custom values
      maxWidth: {
        container: designTokens.spacing.layout.maxWidth,
        content: designTokens.spacing.layout.contentWidth,
        narrow: designTokens.spacing.layout.narrowWidth,
      },
      
      height: {
        button: designTokens.sizing.component.buttonHeight,
        card: designTokens.sizing.component.cardHeight,
        hero: designTokens.sizing.component.heroHeight,
      },
      
      maxHeight: {
        code: designTokens.sizing.component.codeBlockMaxHeight,
      },
      
      width: {
        ...designTokens.sizing.container,
      },
      
      transitionDuration: designTokens.animations.duration,
      transitionTimingFunction: designTokens.animations.easing,
      
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      
      // Typography plugin customization
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            color: theme('colors.foreground'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.DEFAULT'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: theme('fontWeight.bold'),
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: theme('fontSize.xs'),
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
}