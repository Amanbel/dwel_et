---
name: Digital Wellness Enhancement Lab
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#6a1edb'
  on-tertiary: '#ffffff'
  tertiary-container: '#8343f4'
  on-tertiary-container: '#f7edff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system for this product is rooted in **Modern Minimalism** with a focus on cognitive clarity and professional reliability. Designed for researchers, students, and professionals, the interface prioritizes information density without sacrificing breathing room. The aesthetic is "Clinical-Cerebral"—clean, sterile but welcoming, and intentionally structured to reduce digital fatigue, mirroring the product's mission of digital wellness.

The visual language uses high-quality whitespace to separate complex data streams, ensuring that privacy-focused insights are the hero. Interactions are purposeful and subdued, avoiding erratic animations to maintain a calm, focused environment.

## Colors
This design system utilizes a refined, trust-inducing palette centered on professional cool tones. 

- **Primary (Soft Blue):** Used for primary actions and brand presence. It signals reliability.
- **Secondary (Teal):** Applied to success states and wellness-positive metrics.
- **Tertiary (Purple):** Reserved for data visualization highlights, insights, and innovative "Lab" features.
- **Neutrals:** A sophisticated Slate/Gray scale handles the UI skeleton. Surfaces use `Slate-50` (#F8FAFC) for backgrounds to reduce eye strain compared to pure white. Borders use `Slate-200` (#E2E8F0) for a crisp, low-contrast definition.

## Typography
The typography strategy pairs **Geist** for headings and UI labels with **Inter** for body copy. Geist’s technical precision gives the "Lab" an engineered, data-driven feel, while Inter ensures maximum legibility for long-form research and insights.

- **Headlines:** Use tighter letter spacing and semi-bold weights to command attention.
- **Body:** Standardized on a 16px base for accessibility. 
- **Labels:** Monospaced-leaning Geist is used for metadata and button text to emphasize the analytical nature of the platform.

## Layout & Spacing
The system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A strict 8px rhythmic scale is used to define all margins and paddings, ensuring mathematical harmony across the UI.

- **Desktop:** 40px outer margins with 24px gutters. Content is often capped at a 1280px max-width to maintain readability.
- **Mobile:** 16px outer margins. Vertical stack patterns are preferred over horizontal scrolling for data tables.
- **Container Strategy:** Use "Logical Grouping"—related data points should be encapsulated in cards with 24px internal padding.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Ambient Shadows**. Instead of heavy black shadows, this design system uses soft, diffused shadows tinted with the primary blue to maintain a "clean" atmosphere.

- **Level 0 (Base):** Background color (`#F8FAFC`).
- **Level 1 (Cards):** Pure white surface (`#FFFFFF`) with a 1px border (`#E2E8F0`) and a subtle 4px blur shadow.
- **Level 2 (Dropdowns/Modals):** Pure white surface with a 12px blur shadow and 0.08 opacity.
- **Interactive Depth:** On hover, cards should lift slightly (shadow expands) to provide tactile feedback without looking "heavy."

## Shapes
The shape language is consistently **Rounded**, promoting a sense of approachability and safety—essential for a wellness-focused product.

- **Cards & Large Containers:** 16px (`rounded-lg` per this system's mapping).
- **Buttons & Inputs:** 8px (`base` roundedness).
- **Data Tags/Chips:** Full pill-shape (999px) to distinguish them from actionable buttons.

## Components
Consistent styling across the lab environment:

- **Buttons:** Primary buttons use a solid Soft Blue fill. Hover states should be a subtle darken (5-10%) with a slight scale up (1.02x). Ghost buttons use the primary color for text and a 1px border.
- **Cards:** White backgrounds, 16px corner radius, and a subtle light-gray border. Data-heavy cards should include a 4px left-accent border in either Blue, Teal, or Purple to categorize the insight type.
- **Input Fields:** 8px radius, Slate-200 border. On focus, the border transitions to Primary Blue with a 2px outer "glow" (0.1 opacity).
- **Data Visualization:** Line charts and progress bars should use Secondary Teal for "Positive Growth" and Tertiary Purple for "Deep Work/Focus" metrics.
- **Status Chips:** Small, semi-transparent background versions of the primary/secondary colors with high-contrast text for status labeling.
- **Navigation:** A vertical sidebar on desktop with 20px icon sizes and Geist-Medium labels.