# Project Architecture

This document explains the structure and organization of the CA Mahesh Joshi website codebase.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Component Architecture](#component-architecture)
3. [Page Structure](#page-structure)
4. [Data Flow](#data-flow)
5. [Styling Approach](#styling-approach)
6. [File Naming Conventions](#file-naming-conventions)

---

## Project Structure

```
camaheshjoshi/
├── app/                    # Next.js 16 App Router
│   ├── layout.tsx         # Root layout with metadata, structured data
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles, CSS variables, design tokens
│   ├── about/             # About page route
│   │   └── page.tsx
│   ├── services/          # Services page route
│   │   └── page.tsx
│   ├── contact/           # Contact page route
│   │   └── page.tsx
│   └── api/               # API routes
│       └── contact/       # Contact form endpoint
│           └── route.ts
│
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Input.tsx
│   │   ├── SectionHeading.tsx
│   │   └── index.ts      # Barrel export
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Sticky navigation
│   │   ├── Footer.tsx    # Footer with 4 columns
│   │   ├── MobileMenu.tsx
│   │   └── index.ts
│   ├── home/             # Home page sections
│   │   ├── HeroSection.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTASection.tsx
│   │   └── index.ts
│   ├── forms/            # Form components
│   │   └── ContactForm.tsx  # React Hook Form + Zod validation
│   ├── animations/       # Framer Motion animation wrappers
│   │   ├── FadeIn.tsx
│   │   ├── StaggerContainer.tsx
│   │   ├── StaggerItem.tsx
│   │   └── ScaleIn.tsx
│   ├── GoogleMap.tsx     # Lazy-loaded map component
│   ├── WhatsAppButton.tsx # Floating WhatsApp button
│   └── StructuredData.tsx # JSON-LD schemas for SEO
│
├── lib/                  # Utilities and helpers
│   ├── utils.ts         # Helper functions (cn, etc.)
│   ├── metadata.ts      # SEO metadata configuration
│   └── data/            # Static data
│       ├── services.ts  # Services list
│       └── testimonials.ts # Client testimonials
│
├── config/              # Configuration files
│   ├── site.ts         # Site metadata, contact info, navigation
│   └── constants.ts    # App constants (office hours, etc.)
│
├── types/              # TypeScript type definitions
│   └── index.ts       # Shared types
│
├── public/            # Static assets
│   ├── robots.txt    # Search engine crawler rules
│   ├── sitemap.xml   # Site structure for SEO
│   └── images/       # Images (to be added)
│
├── .nvmrc            # Node version specification (20)
├── .env.example      # Environment variables template
├── next.config.ts    # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json     # TypeScript configuration
```

---

## Component Architecture

### 1. UI Components (`components/ui/`)

Foundation-level reusable components used throughout the app.

#### **Button.tsx**
- **Purpose**: Primary interactive element
- **Variants**: `primary`, `secondary`, `outline`, `ghost`, `accent`
- **Sizes**: `sm`, `md`, `lg`
- **Features**: Loading states, disabled states, icon support
- **Location**: `components/ui/Button.tsx:1`

#### **Card.tsx**
- **Purpose**: Content container with consistent styling
- **Subcomponents**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Variants**: `default`, `bordered`, `elevated`
- **Features**: Hover effects, responsive padding
- **Location**: `components/ui/Card.tsx:1`

#### **Input.tsx**
- **Purpose**: Form input field with validation support
- **Features**: Label, error messages, helper text, required indicator
- **Integration**: Works with React Hook Form
- **Location**: `components/ui/Input.tsx:1`

#### **Container.tsx**
- **Purpose**: Responsive width constraint wrapper
- **Sizes**: `sm`, `md`, `lg`, `xl`, `full`
- **Features**: Responsive padding, max-width control
- **Location**: `components/ui/Container.tsx:1`

#### **SectionHeading.tsx**
- **Purpose**: Consistent section headers
- **Features**: Title, subtitle, accent bar, alignment options
- **Location**: `components/ui/SectionHeading.tsx:1`

### 2. Layout Components (`components/layout/`)

#### **Header.tsx**
- **Purpose**: Site-wide navigation
- **Features**: Sticky positioning, mobile-responsive, logo, navigation links
- **Location**: `components/layout/Header.tsx:1`

#### **Footer.tsx**
- **Purpose**: Site-wide footer
- **Layout**: 4-column grid (About, Quick Links, Services, Contact)
- **Features**: Responsive collapse on mobile
- **Location**: `components/layout/Footer.tsx:1`

#### **MobileMenu.tsx**
- **Purpose**: Mobile navigation drawer
- **Features**: Slide-in animation, backdrop, close button
- **Location**: `components/layout/MobileMenu.tsx:1`

### 3. Home Page Sections (`components/home/`)

#### **HeroSection.tsx**
- **Purpose**: Home page hero with headline and CTAs
- **Features**: Stats cards, gradient background, dual CTAs
- **Animations**: FadeIn, StaggerContainer
- **Location**: `components/home/HeroSection.tsx:1`

#### **ServicesOverview.tsx**
- **Purpose**: Featured services grid
- **Features**: 6 service cards with icons, hover effects
- **Animations**: StaggerItem for each card
- **Location**: `components/home/ServicesOverview.tsx:1`

#### **WhyChooseUs.tsx**
- **Purpose**: Trust indicators and value propositions
- **Features**: Stats, benefits grid, professional image
- **Animations**: FadeIn, ScaleIn
- **Location**: `components/home/WhyChooseUs.tsx:1`

#### **Testimonials.tsx**
- **Purpose**: Client testimonials carousel
- **Features**: Auto-scroll, manual navigation, responsive
- **Animations**: FadeIn for each testimonial
- **Location**: `components/home/Testimonials.tsx:1`

#### **CTASection.tsx**
- **Purpose**: Call-to-action section
- **Features**: Gradient background, dual CTAs (Contact + Call)
- **Location**: `components/home/CTASection.tsx:1`

### 4. Form Components (`components/forms/`)

#### **ContactForm.tsx**
- **Purpose**: Contact form with validation
- **Technology**: React Hook Form + Zod validation
- **Fields**: name, email, phone, service, message
- **Features**: Real-time validation, loading states, success/error handling
- **API**: POSTs to `/api/contact`
- **Location**: `components/forms/ContactForm.tsx:1`

### 5. Animation Components (`components/animations/`)

Reusable Framer Motion wrappers for consistent animations.

#### **FadeIn.tsx**
- **Purpose**: Directional fade animations
- **Directions**: up, down, left, right
- **Trigger**: Scroll into view (once)
- **Location**: `components/animations/FadeIn.tsx:1`

#### **StaggerContainer.tsx**
- **Purpose**: Parent wrapper for staggered child animations
- **Usage**: Wrap around multiple StaggerItem components
- **Location**: `components/animations/StaggerContainer.tsx:1`

#### **StaggerItem.tsx**
- **Purpose**: Individual item in staggered animation
- **Effect**: Fade + slide up with delay
- **Location**: `components/animations/StaggerItem.tsx:1`

#### **ScaleIn.tsx**
- **Purpose**: Scale + fade animation
- **Effect**: Grows from smaller size while fading in
- **Location**: `components/animations/ScaleIn.tsx:1`

### 6. Special Components (`components/`)

#### **WhatsAppButton.tsx**
- **Purpose**: Floating WhatsApp chat button
- **Features**: Fixed positioning, pre-filled message, tooltip
- **Display**: All pages except contact
- **Location**: `components/WhatsAppButton.tsx:1`

#### **GoogleMap.tsx**
- **Purpose**: Embedded Google Maps iframe
- **Features**: Lazy loading, loading spinner, responsive
- **Location**: `components/GoogleMap.tsx:1`

#### **StructuredData.tsx**
- **Purpose**: JSON-LD structured data for SEO
- **Schemas**: LocalBusiness, Person, Breadcrumb
- **Usage**: Embedded in pages for rich snippets
- **Location**: `components/StructuredData.tsx:1`

---

## Page Structure

All pages follow the Next.js 16 App Router convention.

### **app/layout.tsx** (Root Layout)
```typescript
// Root layout applied to all pages
export const viewport: Viewport = { ... }
export const metadata: Metadata = homeMetadata

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LocalBusinessSchema />
        <PersonSchema />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
```

### **app/page.tsx** (Home Page)
```typescript
// Home page with all sections
import { HeroSection, ServicesOverview, WhyChooseUs, Testimonials, CTASection } from "@/components/home"

export const metadata = homeMetadata

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  )
}
```

### **app/about/page.tsx** (About Page)
- Metadata: `aboutMetadata`
- Content: Professional background, qualifications, experience
- Breadcrumb: Home > About

### **app/services/page.tsx** (Services Page)
- Metadata: `servicesMetadata`
- Content: Service cards grid, benefits, industries served
- Data source: `lib/data/services.ts`
- Breadcrumb: Home > Services

### **app/contact/page.tsx** (Contact Page)
- Metadata: `contactMetadata`
- Components: ContactForm, GoogleMap, contact cards
- Features: Phone, email, WhatsApp, office hours
- Breadcrumb: Home > Contact

### **app/api/contact/route.ts** (API Route)
```typescript
// POST endpoint for contact form
export async function POST(request: Request) {
  // 1. Parse form data
  // 2. Validate with Zod
  // 3. Send email via Resend
  // 4. Return success/error response
}
```

---

## Data Flow

### Static Data
All static content is centralized in `/lib/data/` and `/config/`:

1. **Services Data** (`lib/data/services.ts`)
   - Array of service objects
   - Used in: ServicesOverview (home), Services page
   - Fields: id, title, description, icon, features

2. **Testimonials Data** (`lib/data/testimonials.ts`)
   - Array of client testimonials
   - Used in: Testimonials section (home)
   - Fields: id, name, role, company, content, rating

3. **Site Configuration** (`config/site.ts`)
   - Business name, tagline
   - Contact information (phone, email, address)
   - Social media links
   - Navigation structure

4. **Constants** (`config/constants.ts`)
   - Office hours
   - Business hours specifications
   - Other app-wide constants

### Dynamic Data (Contact Form)

```
User fills form
    ↓
ContactForm.tsx validates with Zod
    ↓
POST to /api/contact
    ↓
API route validates again
    ↓
Send email via Resend API
    ↓
Email sent to camaheshjoshi25@gmail.com
    ↓
Success response to user
```

### Metadata Flow

```
Page loads
    ↓
Next.js reads metadata export
    ↓
Metadata from lib/metadata.ts
    ↓
Generates <head> tags:
  - <title>
  - <meta name="description">
  - <meta property="og:...">
  - <meta name="twitter:...">
    ↓
Also injects JSON-LD structured data
```

---

## Styling Approach

### CSS Architecture

1. **Global Styles** (`app/globals.css`)
   - CSS variables (`:root`)
   - Design tokens (colors, typography, spacing)
   - Tailwind directives
   - Global resets

2. **Tailwind CSS 4**
   - Utility-first approach
   - Component classes in components
   - Responsive modifiers (sm:, md:, lg:, xl:)
   - Custom configuration in `tailwind.config.ts`

3. **CSS Variables**
```css
:root {
  --primary: 30 58 138;        /* #1e3a8a */
  --secondary: 15 23 42;       /* #0f172a */
  --accent: 234 88 12;         /* #ea580c */
  /* ... more variables ... */
}
```

4. **Component Styling Pattern**
```typescript
// Use cn() utility to merge classes
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  variant === "primary" && "variant-classes",
  className  // Allow prop override
)} />
```

### Responsive Design

- Mobile-first approach
- Breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

### Animation Strategy

- Hardware-accelerated transforms
- Scroll-triggered animations with `framer-motion`
- `viewport={{ once: true }}` to animate once
- Staggered animations for lists
- Smooth transitions for interactive elements

---

## File Naming Conventions

### Components
- **PascalCase**: `Button.tsx`, `HeroSection.tsx`
- **Export**: Named export matching filename
- **Index files**: Barrel exports for cleaner imports

### Utilities and Data
- **camelCase**: `utils.ts`, `metadata.ts`, `services.ts`
- **Export**: Named exports for functions/constants

### Pages (Next.js convention)
- **lowercase**: `page.tsx`, `layout.tsx`, `route.ts`
- **Export**: Default export for page components

### Directories
- **lowercase**: `components/`, `lib/`, `app/`
- **kebab-case** for multi-word: Not used in this project

---

## Key Architectural Decisions

### 1. Server Components by Default
- All components are Server Components unless marked with `"use client"`
- Client components only for:
  - Interactivity (forms, buttons with onClick)
  - Hooks (useState, useEffect)
  - Animations (framer-motion)

### 2. Centralized Configuration
- All site info in `config/site.ts`
- Single source of truth for contact details
- Easy updates without touching component code

### 3. Reusable UI Components
- Consistent design system
- Variant-based styling
- Composable components (Card with subcomponents)

### 4. SEO-First Approach
- Metadata on every page
- Structured data (JSON-LD)
- Semantic HTML
- Performance optimization

### 5. Type Safety
- TypeScript strict mode
- Zod for runtime validation
- Interface definitions in `types/`

---

## Import Alias

The project uses `@/` alias for clean imports:

```typescript
// Instead of: import { Button } from "../../components/ui/Button"
import { Button } from "@/components/ui/Button"

// Configured in tsconfig.json:
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

---

## Related Documentation

- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - How to modify and extend the codebase
- **[COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md)** - Detailed component API reference
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Colors, typography, spacing
- **[PERFORMANCE.md](PERFORMANCE.md)** - Performance optimizations
- **[SEO-GUIDE.md](SEO-GUIDE.md)** - SEO strategies and implementation
