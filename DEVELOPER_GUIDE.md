# Developer Guide

Practical guide for common development tasks and workflows for the CA Mahesh Joshi website.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Development Commands](#development-commands)
3. [Common Tasks](#common-tasks)
4. [Environment Variables](#environment-variables)
5. [File Structure Conventions](#file-structure-conventions)
6. [Git Workflow](#git-workflow)
7. [Testing](#testing)

---

## Quick Start

### First Time Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd camaheshjoshi

# 2. Use correct Node version (CRITICAL!)
nvm use 20
# If you don't have Node 20, install it:
# nvm install 20

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your RESEND_API_KEY

# 5. Start development server
npm run dev

# 6. Open browser
# Visit http://localhost:3000
```

### Node Version Issues?

If you encounter "Cannot find native binding" error:

```bash
# Ensure you're using Node 20
nvm use 20

# Clean install
rm -rf node_modules package-lock.json .next
npm install
```

---

## Development Commands

### Essential Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server (must build first)
npm run start

# Run ESLint
npm run lint

# Analyze bundle size
ANALYZE=true npm run build
```

### Port Already in Use?

```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on different port
PORT=3001 npm run dev
```

---

## Common Tasks

### 1. Adding a New Page

#### Step 1: Create the page file
```bash
# Create directory and page file
mkdir app/[route-name]
touch app/[route-name]/page.tsx
```

#### Step 2: Add page metadata
```typescript
// app/[route-name]/page.tsx
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Page Title",
  description: "Page description (150-160 characters)",
  keywords: ["keyword1", "keyword2", "keyword3"],
  path: "/route-name",
});

export default function PageName() {
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

#### Step 3: Add to navigation
```typescript
// components/layout/Header.tsx
// Add to navigation array
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "New Page", href: "/route-name" }, // Add this
];
```

#### Step 4: Update sitemap
```xml
<!-- public/sitemap.xml -->
<url>
  <loc>https://camaheshjoshi.com/route-name</loc>
  <lastmod>2026-04-25</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

#### Step 5: Add breadcrumb (optional)
```typescript
// app/[route-name]/page.tsx
import { BreadcrumbSchema } from "@/components/StructuredData";

export default function PageName() {
  return (
    <div>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://camaheshjoshi.com" },
        { name: "Page Name", url: "https://camaheshjoshi.com/route-name" }
      ]} />
      {/* Rest of page */}
    </div>
  );
}
```

---

### 2. Creating New Components

#### UI Component Template
```typescript
// components/ui/ComponentName.tsx
import { cn } from "@/lib/utils";

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function ComponentName({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: ComponentNameProps) {
  return (
    <div
      className={cn(
        // Base styles
        "rounded-lg transition-colors",
        // Variant styles
        variant === "default" && "bg-background text-foreground",
        variant === "primary" && "bg-primary text-white",
        variant === "secondary" && "bg-secondary text-white",
        // Size styles
        size === "sm" && "p-2 text-sm",
        size === "md" && "p-4 text-base",
        size === "lg" && "p-6 text-lg",
        // Allow override
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

#### Client Component (with interactivity)
```typescript
"use client";

import { useState } from "react";

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

#### Export from index file (if multiple components in directory)
```typescript
// components/ui/index.ts
export { Button } from "./Button";
export { Card, CardHeader, CardTitle, CardContent } from "./Card";
export { ComponentName } from "./ComponentName";
```

---

### 3. Updating Content

#### Update Services
```typescript
// lib/data/services.ts
export const services: Service[] = [
  {
    id: "new-service",
    title: "New Service Name",
    description: "Brief description of the service",
    icon: "FileText", // Must match icon in iconMap
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
    ],
  },
  // ... existing services
];
```

Then update icon map in services page:
```typescript
// app/services/page.tsx
const iconMap: Record<string, any> = {
  FileText,
  Receipt,
  Shield,
  Building,
  Calculator,
  ClipboardCheck,
  // Add new icon import at top of file
};
```

#### Update Testimonials
```typescript
// lib/data/testimonials.ts
export const testimonials: Testimonial[] = [
  {
    id: "unique-id",
    name: "Client Name",
    role: "Designation",
    company: "Company Name",
    content: "Testimonial text here...",
    rating: 5,
  },
  // ... existing testimonials
];
```

#### Update Contact Information
```typescript
// config/site.ts
export const siteConfig = {
  name: "Mahesh Joshi & Associates",
  tagline: "Your Trusted Tax & Audit Partner",
  links: {
    phone: ["+91 9130601393", "+91 1234567890"], // Can add multiple
    email: "camaheshjoshi25@gmail.com",
    whatsapp: "919130601393",
    address: "607, 6th Floor, ANP Landmark...",
  },
  // ... rest of config
};
```

#### Update Office Hours
```typescript
// config/constants.ts
export const OFFICE_HOURS = {
  monday: { open: "10:00 AM", close: "6:00 PM" },
  tuesday: { open: "10:00 AM", close: "6:00 PM" },
  // ... update as needed
};
```

---

### 4. Modifying Branding/Colors

#### Step 1: Update CSS variables
```css
/* app/globals.css */
:root {
  /* Primary brand color */
  --primary: 30 58 138;        /* #1e3a8a */
  --primary-dark: 23 37 84;    /* #172554 */

  /* Secondary color */
  --secondary: 15 23 42;       /* #0f172a */

  /* Accent color */
  --accent: 234 88 12;         /* #ea580c */

  /* Update these values to change colors */
}
```

#### Step 2: Update theme color in layout
```typescript
// app/layout.tsx
export const viewport: Viewport = {
  themeColor: "#1e3a8a", // Match your primary color
};
```

#### Step 3: Update DESIGN_SYSTEM.md
Document your color changes in `DESIGN_SYSTEM.md` for reference.

#### Testing Color Changes
- Check all pages for contrast issues
- Test hover states
- Verify button variants
- Check mobile menu
- Test dark mode compatibility (if implemented)

---

### 5. Adding Animations

#### Using Existing Animation Components

```typescript
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";

// Single element fade
<FadeIn direction="up" delay={0.2}>
  <div>Content</div>
</FadeIn>

// List with staggered animation
<StaggerContainer>
  {items.map((item, index) => (
    <StaggerItem key={index} index={index}>
      <div>{item}</div>
    </StaggerItem>
  ))}
</StaggerContainer>

// Scale animation
<ScaleIn delay={0.3}>
  <div>Content that scales in</div>
</ScaleIn>
```

#### Creating Custom Animation

```typescript
"use client";

import { motion } from "framer-motion";

export function CustomAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

**Important**: All animation components must be client components (`"use client"` directive).

---

### 6. Working with Forms

#### Adding a New Form Field

```typescript
// components/forms/ContactForm.tsx

// 1. Update Zod schema
const contactFormSchema = z.object({
  // ... existing fields
  newField: z.string().min(1, "Field is required"),
});

// 2. Update type
type ContactFormData = z.infer<typeof contactFormSchema>;

// 3. Register field in component
<Input
  {...register("newField")}
  label="New Field"
  error={errors.newField?.message}
  required
/>

// 4. Update API route to handle new field
// app/api/contact/route.ts
```

#### Form Validation Patterns

```typescript
// Email
email: z.string().email("Invalid email address")

// Phone (10-15 digits)
phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number")

// Required string
name: z.string().min(1, "Name is required").max(100, "Name too long")

// Optional field
field: z.string().optional()

// Custom validation
field: z.string().refine((val) => val !== "forbidden", {
  message: "This value is not allowed"
})
```

---

## Environment Variables

### Required Variables

```bash
# .env.local

# Resend API key for email service (REQUIRED for contact form)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx

# Site URL for metadata (optional, defaults to localhost in dev)
NEXT_PUBLIC_SITE_URL=https://camaheshjoshi.com

# Bundle analyzer (optional, set to 'true' to enable)
ANALYZE=false
```

### Getting Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Create a new API key
3. Add to `.env.local`
4. Verify domain (for production)

### Environment Variables in Code

```typescript
// Server-side only
process.env.RESEND_API_KEY

// Client-side (must prefix with NEXT_PUBLIC_)
process.env.NEXT_PUBLIC_SITE_URL
```

---

## File Structure Conventions

### Naming Rules

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `Button.tsx`, `HeroSection.tsx` |
| Utilities | camelCase | `utils.ts`, `metadata.ts` |
| Pages | lowercase | `page.tsx`, `layout.tsx` |
| API Routes | lowercase | `route.ts` |
| Directories | lowercase | `components/`, `lib/` |
| Constants | UPPER_SNAKE_CASE | `OFFICE_HOURS` |

### Export Patterns

```typescript
// Named export (components, utilities)
export function Button() { }
export const metadata = { }

// Default export (pages, layouts)
export default function HomePage() { }

// Barrel exports (index.ts files)
export { Button } from "./Button";
export { Card } from "./Card";
```

### Import Order (recommended)

```typescript
// 1. External libraries
import { useState } from "react";
import Link from "next/link";

// 2. Internal components
import { Button, Card } from "@/components/ui";
import { Header } from "@/components/layout";

// 3. Utilities and config
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// 4. Types
import type { Service } from "@/types";

// 5. Styles (if any)
import "./styles.css";
```

---

## Git Workflow

### Branch Strategy

```bash
# Always work on main branch (or create feature branches)
git checkout main
git pull origin main

# Create feature branch (optional)
git checkout -b feature/new-feature
```

### Commit Format

```bash
# Use clear, descriptive commit messages
git commit -m "Add dark mode toggle to settings"
git commit -m "Fix navigation menu overflow on mobile"
git commit -m "Update contact email address"

# NOT: "fix bug" or "update code"
```

### Recommended Workflow

```bash
# 1. Make changes to files
# 2. Test locally (npm run dev)
# 3. Build to verify (npm run build)
# 4. Stage changes
git add .

# 5. Commit with descriptive message
git commit -m "Add new service card for tax planning"

# 6. Push to remote
git push origin main  # or your branch name
```

### Before Committing Checklist

- [ ] Code runs without errors (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] All pages load correctly
- [ ] Mobile responsive (test on small screen)
- [ ] No TypeScript errors
- [ ] Environment variables documented (if added)

---

## Testing

### Manual Testing Checklist

#### Development Testing
```bash
# Start dev server
npm run dev

# Test in browser
# - All pages load
# - No console errors
# - Links work
# - Forms validate
# - Animations play
```

#### Production Build Testing
```bash
# Build for production
npm run build

# Start production server
npm run start

# Test same items as development
```

#### Responsive Testing

Test at these breakpoints:
- **Mobile**: 375px (iPhone SE)
- **Tablet**: 768px (iPad)
- **Desktop**: 1280px (Standard laptop)
- **Large Desktop**: 1920px (Full HD)

### Common Testing Scenarios

#### Contact Form
1. Submit empty form (should show errors)
2. Enter invalid email (should show error)
3. Enter invalid phone (should show error)
4. Submit valid form (should show success message)
5. Check email received (check spam folder)

#### Navigation
1. Click all nav links
2. Test mobile menu open/close
3. Test on mobile device width
4. Verify active page highlighting

#### WhatsApp Button
1. Verify it appears on all pages except contact
2. Click to open WhatsApp
3. Check pre-filled message
4. Test on mobile (should open app)

---

## Performance Optimization

### Image Optimization

```typescript
// Use Next.js Image component
import Image from "next/image";

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}
  priority  // For above-fold images
/>
```

### Bundle Size

```bash
# Analyze bundle size
ANALYZE=true npm run build

# Opens analyzer in browser showing:
# - Largest packages
# - Duplicate dependencies
# - Code split chunks
```

### Performance Checklist

- [ ] Images optimized (WebP/AVIF)
- [ ] Images have width/height
- [ ] Critical CSS inlined
- [ ] Fonts preloaded
- [ ] Lazy load below-fold content
- [ ] Minimize client-side JavaScript
- [ ] Use Server Components where possible

---

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Cannot find native binding | `nvm use 20` + reinstall |
| Port 3000 in use | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| Styles not applying | Clear `.next` folder |
| Form not sending | Check `RESEND_API_KEY` in `.env.local` |
| Build fails | Run `npm run build` and check errors |
| TypeScript errors | Run `npm run lint` |

For detailed troubleshooting, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

---

## Additional Resources

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Project structure and organization
- **[COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md)** - Component API reference
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Colors, typography, spacing
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production
- **[Next.js Docs](https://nextjs.org/docs)** - Official Next.js documentation
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** - Tailwind documentation
- **[Framer Motion Docs](https://www.framer.com/motion/)** - Animation library docs
