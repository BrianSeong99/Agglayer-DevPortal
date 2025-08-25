# Agglayer Design System

A comprehensive design system for the Agglayer Developer Portal based on the Figma designs.

## Overview

This design system provides a consistent set of design tokens, components, and patterns for building the Agglayer Developer Portal. It's built on top of Tailwind CSS and integrates seamlessly with Next.js and React.

## Design Tokens

### Colors

The color system is organized into several categories:

#### Primary Colors
- **Primary Blue**: `#0071F7` - Main brand color used for CTAs, links, and primary actions
- **RGB**: `rgb(0, 113, 247)`
- **HSL**: `hsl(212, 100%, 48%)`

#### Neutral Palette
```
gray-50:  #F9F9F9  - Lightest background
gray-100: #F7FAFE  - Card backgrounds
gray-150: #FBFAFA  - Alternative light background
gray-200: #F5F5F5  - Subtle backgrounds
gray-300: #D9D9D9  - Light borders
gray-400: #A1A1AA  - Muted text
gray-500: #8E8E93  - Default gray (from Figma)
gray-600: #6B7280  - Secondary text
gray-700: #23272F  - Dark elements
gray-800: rgba(23, 23, 23, 0.59) - Overlays
gray-900: #0A0A0A  - Near black
```

#### Text Colors
- **Primary**: `#000000` - Main text
- **Secondary**: `rgba(0, 0, 0, 0.9)` - Slightly muted
- **Tertiary**: `rgba(0, 0, 0, 0.6)` - Muted text
- **Quaternary**: `rgba(0, 0, 0, 0.3)` - Very muted
- **Blue Text**: `rgba(0, 46, 101, 0.9)` - Special blue text
- **Link**: `#0071F7` - Links and interactive text

#### Environment Colors
- **Mainnet**: `#00D4AA` - Production chains
- **Cardona**: `#FF8C42` - Testnet environment
- **Bali**: `#8B5CF6` - Alternative testnet
- **Agglayer**: `#3B82F6` - Agglayer specific

### Typography

#### Font Families
- **Headings**: `Inter Tight` - Bold, condensed for impact
- **Body**: `Inter` - Clean, readable for content
- **Code**: `SF Mono` - Monospace for technical content

#### Font Sizes
```
2xs: 10px
xs:  12px  - Captions, labels
sm:  14px  - Small body text
base: 15px - Default body text
lg:  18px  - Large body text
xl:  20px  - Small headings
2xl: 24px  - Medium headings
3xl: 30px  - Large headings
4xl: 36px  - Section headings
5xl: 48px  - Hero headings
```

#### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

### Spacing

The spacing system uses a consistent scale:
```
0:  0px
px: 1px
0.5: 2px
1:  4px
1.5: 6px
2:  8px
3:  12px
4:  16px
6:  24px
8:  32px
12: 48px
16: 64px
24: 96px
32: 128px
48: 192px
49: 196px (section gaps)
```

### Border Radius
```
none: 0px
sm:   8px
md:   10px    - Default radius
lg:   12px
xl:   20px
2xl:  24px
3xl:  40.289px - Input fields
pill: 45px    - Buttons
round: 60px   - Large rounded
full: 9999px  - Fully rounded
```

## Component Patterns

### Buttons

#### Primary Button
```html
<button class="bg-primary text-white px-[15px] py-2 rounded-pill text-xs font-medium">
  Get started
</button>
```

#### Secondary Button
```html
<button class="bg-gray-150 text-gray-500 px-[15px] py-2 rounded-pill text-xs">
  Learn more
</button>
```

### Cards

#### Feature Card (from Figma)
```html
<div class="bg-gray-100 rounded-md p-6 hover:shadow-card transition-all duration-300">
  <div class="mb-3">
    <h3 class="font-heading text-base font-bold text-blue-primary">Title</h3>
    <p class="text-xs text-blue-light mt-3">Description</p>
  </div>
  <a class="text-xs text-link-muted font-medium">View Example →</a>
</div>
```

### Code Blocks
```html
<div class="bg-white rounded-lg p-6 max-h-code overflow-auto">
  <pre class="font-mono text-xs leading-normal text-black">
    <code>// Your code here</code>
  </pre>
</div>
```

## Using the Design System

### In Tailwind Classes

The design tokens are available as Tailwind utilities:

```html
<!-- Colors -->
<div class="bg-primary text-white">Primary button</div>
<div class="bg-gray-100 text-gray-600">Muted card</div>
<div class="text-mainnet">Mainnet indicator</div>

<!-- Typography -->
<h1 class="font-heading text-5xl font-bold">Hero Title</h1>
<p class="font-sans text-base text-gray-600">Body text</p>
<code class="font-mono text-xs">Code snippet</code>

<!-- Spacing -->
<div class="p-6 mb-12 mt-24">Spaced content</div>
<div class="gap-49">Large section gap</div>

<!-- Border Radius -->
<button class="rounded-pill">Pill button</button>
<div class="rounded-md">Card with medium radius</div>
```

### In JavaScript/TypeScript

Import and use design tokens programmatically:

```typescript
import { designTokens } from '@/shared/design-system';

// Access colors
const primaryColor = designTokens.colors.primary.DEFAULT;
const cardBg = designTokens.colors.background.secondary;

// Access typography
const headingFont = designTokens.typography.fontFamily.heading;
const bodySize = designTokens.typography.fontSize.base;

// Access spacing
const sectionGap = designTokens.spacing.component.sectionGap;
const cardPadding = designTokens.spacing.component.cardPadding;
```

### Theme Usage

Use the default theme for semantic values:

```typescript
import { defaultTheme } from '@/shared/design-system/themes/default';

// Component colors
const buttonBg = defaultTheme.colors.components.button.primary.bg;
const cardBg = defaultTheme.colors.components.card.bg;

// Typography presets
const h1Style = defaultTheme.typography.heading.h1;
const bodyStyle = defaultTheme.typography.body.default;
```

## Migration Guide

### From Old Colors to New

| Old Color | New Token | Usage |
|-----------|-----------|--------|
| `#0071F7` | `primary` | Primary actions, links |
| `#D9D9D9` | `gray-300` | Borders, dividers |
| `#000000` | `black` or `text-primary` | Text |
| `#FFFFFF` | `white` or `background` | Backgrounds |
| `#17171797` | `gray-800` | Overlays |
| `#6b7280` | `gray-600` | Secondary text |

### Component Updates

1. **Buttons**: Update to use new padding values and text sizes
2. **Cards**: Use `bg-gray-100` instead of custom colors
3. **Text**: Replace hardcoded colors with semantic text colors
4. **Spacing**: Use design token spacing values

## Best Practices

1. **Use semantic colors**: Prefer `text-primary` over `text-black`
2. **Consistent spacing**: Use the spacing scale, not arbitrary values
3. **Typography hierarchy**: Use the predefined text styles
4. **Responsive design**: The system is mobile-first
5. **Animation timing**: Use the predefined animation tokens

## Examples from Figma

The design system is based on the Figma designs which include:
- Clean, minimal aesthetic with blue accents
- Card-based layouts with subtle backgrounds
- Pill-shaped buttons with consistent padding
- SF Mono for code and technical content
- Inter Tight for impactful headings
- Generous spacing between sections (196px)