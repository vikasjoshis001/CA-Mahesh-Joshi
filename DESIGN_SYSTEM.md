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
