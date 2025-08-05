# Design System Migration Guide

This guide helps you migrate existing components to use the new Figma-based design system.

## Quick Start

1. **Import design tokens** in your components:
```typescript
import { designTokens } from '@/shared/design-system';
```

2. **Update color classes** to use new tokens
3. **Replace hardcoded values** with design tokens
4. **Test components** in light mode (dark mode support coming later)

## Color Migration

### Hardcoded Colors to Tokens

| Find | Replace With | Notes |
|------|--------------|-------|
| `#0071F7` | `text-primary` or `bg-primary` | Primary brand color |
| `#D9D9D9` | `border-gray-300` or `bg-gray-300` | Borders and dividers |
| `#000000` | `text-black` or `text-primary` | Text color |
| `#FFFFFF` | `bg-white` or `text-white` | Background/text |
| `#17171797` | `bg-gray-800` | Overlay backgrounds |
| `#6b7280` | `text-gray-600` | Secondary text |
| `#a1a1aa` | `text-gray-400` | Muted text |
| `#f5f5f5` | `bg-gray-200` | Light backgrounds |
| `#23272f` | `bg-gray-700` | Dark elements |
| `rgba(0,0,0,0.6)` | `text-tertiary` | 60% black text |
| `rgba(0,0,0,0.3)` | `text-quaternary` | 30% black text |

### Environment Colors

Keep existing environment colors for AggNiverse:
- Mainnet: `bg-mainnet` or `text-mainnet` (#00D4AA)
- Cardona: `bg-cardona` or `text-cardona` (#FF8C42)
- Bali: `bg-bali` or `text-bali` (#8B5CF6)
- Agglayer: `bg-agglayer` or `text-agglayer` (#3B82F6)

## Typography Migration

### Font Family Updates

```jsx
// Before
<h1 className="font-sans">Title</h1>

// After
<h1 className="font-heading">Title</h1>
```

### Font Sizes

| Old Size | New Class | Pixel Value |
|----------|-----------|-------------|
| `text-[48px]` | `text-5xl` | 48px |
| `text-[36px]` | `text-4xl` | 36px |
| `text-[24px]` | `text-2xl` | 24px |
| `text-[18px]` | `text-lg` | 18px |
| `text-[15px]` | `text-base` | 15px |
| `text-[12px]` | `text-xs` | 12px |

### Text Styles from Figma

```jsx
// Hero heading
<h1 className="font-heading text-5xl font-bold leading-snug text-black">
  Start Building <span className="font-medium text-primary">Cross-Chain Apps</span>
</h1>

// Section heading
<h2 className="font-heading text-4xl font-bold leading-snug">
  Start your <span className="font-medium text-primary">Journey</span>
</h2>

// Card title
<h3 className="font-heading text-base font-bold text-blue-primary">
  Cross-Chain DEX
</h3>

// Body text
<p className="font-sans text-base text-secondary">
  Ship faster with unified liquidity
</p>

// Caption text
<p className="font-mono text-xs text-blue-light">
  Step-by-step tutorials and guides
</p>

// Code block
<pre className="font-mono text-xs leading-normal">
  # Clone and install AggSandbox
</pre>
```

## Component Patterns

### Button Migration

```jsx
// Before
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>

// After - Primary button from Figma
<button className="bg-primary text-white px-[15px] py-2 rounded-pill text-xs font-medium transition-all duration-300 hover:shadow-primary">
  Get started
</button>

// After - Secondary button from Figma
<button className="bg-gray-150 text-gray-500 px-[15px] py-2 rounded-pill text-xs font-normal transition-all duration-300 hover:bg-gray-100">
  Learn more
</button>
```

### Card Migration

```jsx
// Before
<div className="bg-gray-100 p-4 rounded">
  <h3>Title</h3>
  <p>Description</p>
</div>

// After - Feature card from Figma
<div className="bg-gray-100 rounded-md p-6 hover:shadow-card transition-all duration-300">
  <div className="mb-6">
    <h3 className="font-heading text-base font-bold text-blue-primary leading-tight">
      Learn
    </h3>
    <p className="font-mono text-xs text-blue-light leading-normal mt-3">
      Step-by-step tutorials and guides
    </p>
  </div>
  <a className="font-mono text-xs text-link-muted font-medium">
    View Example →
  </a>
</div>
```

### Code Block Migration

```jsx
// Before
<pre className="bg-gray-100 p-4">
  <code>const example = true;</code>
</pre>

// After - Code block from Figma
<div className="bg-white rounded-lg p-6 max-h-code overflow-auto">
  <pre className="font-mono text-xs text-black leading-normal tracking-mono">
    # Clone and install AggSandbox
    git clone https://github.com/NethermindEth/agg-sandbox.git
    cd agg-sandbox && make install
  </pre>
</div>
```

### Layout Container Migration

```jsx
// Before
<div className="max-w-7xl mx-auto px-4">
  Content
</div>

// After - Using design system container
<div className="max-w-narrow mx-auto px-6">
  Content
</div>
```

## Spacing Migration

### Common Spacing Patterns

| Old Pattern | New Pattern | Value |
|-------------|-------------|-------|
| `gap-4` | `gap-3` | 12px |
| `p-4` | `p-4` | 16px |
| `p-6` | `p-6` | 24px |
| `mb-8` | `mb-6` | 24px |
| `gap-[196px]` | `gap-49` | 196px |
| `gap-[64px]` | `gap-16` | 64px |

### Section Spacing from Figma

```jsx
// Hero to content
<div className="flex flex-col gap-49">
  {/* 196px gap between sections */}
</div>

// Content groups
<div className="flex flex-col gap-16">
  {/* 64px gap between groups */}
</div>

// Within sections
<div className="flex flex-col gap-6">
  {/* 24px gap within sections */}
</div>

// Card grid
<div className="flex gap-3">
  {/* 12px gap between cards */}
</div>
```

## Border Radius Migration

| Old | New | Usage |
|-----|-----|-------|
| `rounded` | `rounded-md` | Default cards (10px) |
| `rounded-lg` | `rounded-lg` | Large cards (12px) |
| `rounded-full` | `rounded-pill` | Buttons (45px) |
| `rounded-[60px]` | `rounded-round` | Large rounded (60px) |

## Animation Migration

### Transition Classes

```jsx
// Before
<div className="transition-all duration-200">

// After - matching agglayer.dev timing (400ms)
<div className="transition-all duration-400">

// For hover states
<div className="transition-all duration-300 hover:shadow-card">
```

## ShadCN Component Updates

The new Tailwind config maintains ShadCN compatibility. Components should work but may need color adjustments:

```jsx
// Update ShadCN button variant
<Button variant="default" className="bg-primary hover:bg-primary/90">
  Get Started
</Button>

// Update ShadCN card
<Card className="bg-gray-100 border-0">
  <CardContent className="p-6">
    Content
  </CardContent>
</Card>
```

## Testing Your Migration

1. **Visual Regression**: Compare before/after screenshots
2. **Color Contrast**: Ensure text remains readable
3. **Responsive Design**: Test on mobile viewports
4. **Interactive States**: Check hover, focus, active states
5. **Dark Mode**: Currently uses light theme, dark mode pending

## Common Issues

### Issue: Colors look different
**Solution**: The new design uses a lighter, cleaner palette. This is intentional.

### Issue: Spacing feels too large
**Solution**: The Figma design uses generous spacing. This improves readability.

### Issue: Fonts not loading
**Solution**: Ensure Inter Tight and SF Mono fonts are imported in globals.css

### Issue: Hardcoded colors in components
**Solution**: Search for hex values and replace with design tokens:
```bash
# Find hardcoded colors
grep -r "#[0-9a-fA-F]\{6\}" --include="*.tsx" --include="*.jsx"
```

## Gradual Migration Strategy

1. **Phase 1**: Update global styles and Tailwind config ✅
2. **Phase 2**: Migrate shared components
3. **Phase 3**: Update page-specific components
4. **Phase 4**: Remove old color variables
5. **Phase 5**: Optimize and clean up

## Need Help?

- Check the [Design System Documentation](./README.md)
- Review the [Figma designs](https://figma.com/...)
- Look at migrated components for examples
- Use the design token exports for programmatic access