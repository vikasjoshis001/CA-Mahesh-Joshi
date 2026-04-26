# Design System - Mahesh Joshi & Associates

This document outlines the design system extracted from the CA Mahesh Joshi visiting card.

## 🎨 Color Palette

### Brand Colors (From CA India Logo)

#### Primary - Navy Blue
- **Main**: `#1e3a8a` - Primary brand color
- **Dark**: `#172554` - Hover states, darker elements
- **Light**: `#3b82f6` - Accents, lighter touches
- **Usage**: Main headings, buttons, links, navigation

#### Secondary - Orange/Saffron
- **Main**: `#f97316` - Secondary brand color
- **Dark**: `#ea580c` - Hover states
- **Light**: `#fb923c` - Light accents
- **Usage**: Call-to-action buttons, highlights, accents

#### Accent - Green
- **Main**: `#16a34a` - Accent color
- **Dark**: `#15803d` - Darker shade
- **Light**: `#22c55e` - Lighter shade
- **Usage**: Success states, icons, decorative elements

### Neutral Colors

- **Background**: `#fafaf9` - Off-white/cream page background
- **Foreground**: `#1f2937` - Dark gray for body text
- **Muted**: `#f5f5f4` - Light gray for alternate sections
- **Muted Foreground**: `#6b7280` - Secondary text
- **Card**: `#ffffff` - White for cards
- **Border**: `#e5e7eb` - Borders and dividers

### Semantic Colors

- **Success**: `#16a34a` - Success messages (same as accent)
- **Warning**: `#f59e0b` - Warning messages
- **Error**: `#dc2626` - Error messages
- **Info**: `#3b82f6` - Info messages (same as primary-light)

## 📐 Typography

### Font Family
- **Sans Serif**: Geist Sans (primary), system-ui, -apple-system, sans-serif
- **Monospace**: Geist Mono (for code, if needed)

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Subheadings
- **Semibold**: 600 - Section headings
- **Bold**: 700 - Main headings, emphasis

### Typography Scale
```css
/* Headings */
h1: 3rem (48px) - font-bold
h2: 2.25rem (36px) - font-bold
h3: 1.875rem (30px) - font-semibold
h4: 1.5rem (24px) - font-semibold
h5: 1.25rem (20px) - font-medium
h6: 1rem (16px) - font-medium

/* Body */
Base: 1rem (16px) - Regular
Small: 0.875rem (14px)
Extra Small: 0.75rem (12px)
```

## 📏 Spacing

### Section Spacing
- **Between sections**: `5rem` (80px)
- **Container padding**: `1.5rem` (24px)

### Component Spacing
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)

## 🔲 Border Radius

- **Small**: `0.375rem` (6px) - Buttons, inputs
- **Medium**: `0.5rem` (8px) - Cards, small components
- **Large**: `0.75rem` (12px) - Larger cards
- **Extra Large**: `1rem` (16px) - Hero sections, large components

## 🎯 Shadows

```css
/* Subtle elevation */
sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)

/* Standard cards */
md: 0 4px 6px -1px rgb(0 0 0 / 0.1)

/* Elevated elements */
lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)

/* Floating elements */
xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

## 🖱️ Interactive States

### Buttons

**Primary Button (Navy Blue)**
```
Default: bg-primary, text-white
Hover: bg-primary-dark
Active: scale-95
Focus: ring-2 ring-primary
```

**Secondary Button (Orange)**
```
Default: bg-secondary, text-white
Hover: bg-secondary-dark
Active: scale-95
Focus: ring-2 ring-secondary
```

**Outline Button**
```
Default: border-primary, text-primary
Hover: bg-primary, text-white
```

### Links
```
Default: text-primary, underline-offset-4
Hover: text-primary-dark, underline
```

## 📱 Responsive Breakpoints

Using Tailwind's default breakpoints:
- **sm**: 640px - Mobile landscape
- **md**: 768px - Tablet
- **lg**: 1024px - Desktop
- **xl**: 1280px - Large desktop
- **2xl**: 1536px - Extra large

## 🎨 Usage Examples

### Using Colors in Tailwind

```jsx
// Primary color
<button className="bg-primary text-white hover:bg-primary-dark">

// Secondary color
<div className="bg-secondary">

// Accent color
<span className="text-accent">

// Background & text
<div className="bg-background text-foreground">

// Muted section
<section className="bg-muted">
```

### Using in CSS Variables

```css
.custom-element {
  background-color: var(--primary);
  color: var(--card);
  border-radius: var(--radius-md);
}
```

## 🏢 Brand Identity

**Business Name**: Mahesh Joshi & Associates
**Tagline**: Professional Chartered Accountant Services
**Owner**: Mahesh M. Joshi (ACA)
**Location**: Wakad, Pimpri Chinchwad, Maharashtra

## 📞 Contact Information

- **Phone**: +91 9130601393
- **Email**: camaheshjoshi25@gmail.com
- **WhatsApp**: +91 9130601393
- **Address**: 607, 6th Floor, ANP Landmark, Near Bhumkar Chowk, Bhumkar Nagar, Wakad, Pimpri Chinchwad, Maharashtra - 411 057

## 🏷️ Logo & Branding Assets

### CA India Logo

The official CA India (ICAI) logo is used throughout the website to establish professional credibility and compliance with Institute of Chartered Accountants of India standards.

**Logo File:**
- **Location**: `/public/images/ca-india-logo.svg`
- **Format**: SVG (Scalable Vector Graphics)
- **Size**: 1.8KB (optimized)
- **Aspect Ratio**: 1.33:1 (landscape)
- **Colors**:
  - Blue: `#0a70a1`
  - Orange: `#f3782c`
  - Green: `#6cb94e`

### Logo Placement

The CA India logo appears in the following locations:

#### 1. **Header Navigation**
- **File**: `components/layout/Header.tsx`
- **Size**:
  - Mobile: 32px height (`h-8`)
  - Desktop: 40px height (`h-10`)
- **Position**: Next to business name (left of text)
- **Priority**: Loads immediately (above-fold)

```tsx
<Image
  src="/images/ca-india-logo.svg"
  alt="CA India Logo"
  width={40}
  height={30}
  className="h-8 w-auto md:h-10"
  priority
/>
```

#### 2. **Footer**
- **File**: `components/layout/Footer.tsx`
- **Size**: 48px height (`h-12`)
- **Position**: Above business name in About section
- **Background**: Primary blue (`bg-primary`)

```tsx
<Image
  src="/images/ca-india-logo.svg"
  alt="CA India - ICAI"
  width={80}
  height={60}
  className="h-12 w-auto mb-4"
/>
```

#### 3. **Professional Badges**
- **Files**:
  - `components/home/HeroSection.tsx` (Homepage hero)
  - `app/about/page.tsx` (About page hero + qualifications card)
- **Size**: 20px height (`h-5`) for badges
- **Context**: "ACA Qualified | ICAI Registered" credentials

```tsx
<Image
  src="/images/ca-india-logo.svg"
  alt="CA India"
  width={24}
  height={18}
  className="h-5 w-auto"
/>
```

#### 4. **Qualifications Card** (About Page)
- **File**: `app/about/page.tsx`
- **Size**: 64px container with padding
- **Background**: `bg-primary/10` (light blue tint)
- **Effect**: Professional certification display

```tsx
<div className="w-16 h-16 bg-primary/10 rounded-xl mb-4 flex items-center justify-center p-2">
  <Image
    src="/images/ca-india-logo.svg"
    alt="CA India Certified"
    width={64}
    height={48}
    className="w-full h-auto"
  />
</div>
```

### Logo Usage Guidelines

#### ✅ Do's

- **Always maintain aspect ratio** - Never stretch or distort the logo
- **Use adequate clear space** - Minimum 16px padding around logo
- **Use on compatible backgrounds** - Works best on white, light backgrounds, or primary blue
- **Use official SVG file** - Always use the approved SVG for quality
- **Include proper alt text** - For accessibility and SEO

#### ❌ Don'ts

- **Don't change colors** - Logo colors are official ICAI branding
- **Don't add effects** - No shadows, outlines, or filters
- **Don't rotate** - Logo should always be horizontal
- **Don't use on busy backgrounds** - Maintain visibility and clarity
- **Don't scale too small** - Minimum recommended height: 20px (mobile badges)

### Favicon & App Icons

**Favicon**:
- Generated from CA India logo
- Placed in `app/favicon.ico`
- Auto-served by Next.js at `/favicon.ico`

**Apple Touch Icon**:
- 180×180px PNG with CA India logo
- Placed in `public/apple-touch-icon.png`
- Used when site is added to iOS home screen

### Open Graph Image

**Social Media Preview:**
- **File**: `/public/og-image.jpg`
- **Size**: 1200 × 630px
- **Design**: Features CA India logo with business name and contact info
- **Background**: Primary blue gradient
- **Usage**: Displayed when website is shared on Facebook, LinkedIn, Twitter, WhatsApp

### Color Compatibility

The CA India logo colors complement the website's design system:

| Logo Color | Hex Code | Website Match |
|------------|----------|---------------|
| CA Blue | `#0a70a1` | Lighter than primary `#1e3a8a` - good contrast |
| CA Orange | `#f3782c` | Complements accent `#ea580c` |
| CA Green | `#6cb94e` | Accent color for visual interest |

The logo's blue is intentionally lighter than the site primary, ensuring it stands out while harmonizing with the overall color scheme.

### Accessibility

All logo instances include proper alt text:

- **Header**: `"CA India Logo"` - Identifies the logo
- **Footer**: `"CA India - ICAI"` - Adds credential context
- **Badges**: `"CA India"` - Concise for compact display
- **Qualifications**: `"CA India Certified"` - Emphasizes certification

Screen readers announce these descriptions, making the site accessible to all users.

### Performance

**Logo Optimization:**
- SVG format ensures crisp display at any resolution
- Small file size (1.8KB) - negligible performance impact
- Priority loading for header logo (immediate visibility)
- Lazy loading for below-fold instances (better performance)

**Best Practices:**
- Always use Next.js `Image` component for automatic optimization
- Include `width` and `height` props to prevent layout shift
- Use `priority` prop only for above-fold images (header)

## 🎨 Design Principles

1. **Professional**: Clean, corporate aesthetic appropriate for CA services
2. **Trustworthy**: Navy blue conveys trust and professionalism
3. **Patriotic**: Orange and green from Indian flag colors
4. **Accessible**: High contrast ratios for readability
5. **Modern**: Contemporary design with smooth animations
6. **Mobile-first**: Responsive design for all devices

## 🚀 Implementation Notes

- All colors are CSS variables defined in `app/globals.css`
- Use Tailwind utility classes: `bg-primary`, `text-secondary`, etc.
- Colors automatically work with Tailwind's opacity modifiers: `bg-primary/50`
- Design system is fully customizable via CSS variables
