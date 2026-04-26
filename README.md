# CA Mahesh Joshi - Professional Website

A modern, professional website for Chartered Accountant Mahesh M. Joshi (ACA) built with Next.js 16, TypeScript, and Tailwind CSS 4.

**Business:** Mahesh Joshi & Associates
**Location:** Wakad, Pune, Maharashtra
**Services:** Income Tax, GST, Audit, Business Registration, Accounting

## Prerequisites

This project requires **Node.js 20+**. The project is configured to automatically use the correct Node version.

### Using nvm (Node Version Manager)

**Install nvm:**
```bash
# Mac/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Windows: Download from https://github.com/coreybutler/nvm-windows
```

**Auto-switch Node version:**
```bash
# When you cd into this project, run:
nvm use

# This will automatically use Node 20 as specified in .nvmrc
```

**Install Node 20 (if not installed):**
```bash
nvm install 20
nvm use 20
```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework with CSS variables
- **Framer Motion** - Smooth scroll-triggered animations
- **React Hook Form + Zod** - Form handling and validation
- **Lucide React** - Beautiful icon library
- **Resend** - Email service for contact form
- **Google Maps Embed** - Interactive location map

## Project Structure

```
camaheshjoshi/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & design tokens
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Header, Footer, MobileMenu
│   ├── home/             # Home page sections
│   ├── forms/            # ContactForm
│   └── animations/       # Animation wrappers
├── lib/                  # Utilities and data
│   ├── data/            # Services and testimonials data
│   ├── utils.ts         # Helper functions
│   └── metadata.ts      # SEO metadata configuration
├── config/              # Configuration files
│   ├── site.ts         # Site metadata and contact info
│   └── constants.ts    # App constants
├── types/              # TypeScript type definitions
├── public/             # Static assets
│   ├── robots.txt     # Search engine crawler rules
│   └── sitemap.xml    # Site structure for SEO
├── .nvmrc             # Node version (20)
└── .env.example       # Environment variables template
```

## Features

✅ **4 Pages:** Home, About, Services, Contact
✅ **Contact Form:** With validation and email integration
✅ **WhatsApp Integration:** Floating chat button
✅ **Google Maps:** Interactive location map
✅ **Fully Responsive:** Mobile, tablet, and desktop optimized
✅ **SEO Optimized:** Meta tags, Open Graph, JSON-LD structured data
✅ **Performance Optimized:** Lazy loading, image optimization, bundle splitting
✅ **Smooth Animations:** Scroll-triggered with Framer Motion
✅ **Accessible:** WCAG compliant with proper ARIA labels

## Documentation

Complete guides for working with this project:

### Quick Start
- **[QUICK_START.md](QUICK_START.md)** ⚡ - Get started in under 5 minutes

### Development Guides
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Common tasks and workflows
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Project structure and code organization
- **[COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md)** - All components with usage examples

### Styling & Design
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Colors, typography, spacing

### Performance & SEO
- **[PERFORMANCE.md](PERFORMANCE.md)** - Optimization strategies and metrics
- **[SEO-GUIDE.md](SEO-GUIDE.md)** - SEO implementation and best practices

### Deployment & Troubleshooting
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production (Vercel)
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions

### Setup Instructions
- **[SETUP.md](SETUP.md)** - Detailed first-time setup guide

## Quick Reference

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run analyze  # Analyze bundle size (set ANALYZE=true)
```

### Environment Variables
Create `.env.local` file with:
```bash
# Required for contact form
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx

# Optional - Site URL for metadata
NEXT_PUBLIC_SITE_URL=https://camaheshjoshi.com
```

Get Resend API key from [resend.com](https://resend.com)

### Updating Content
- **Contact info:** `config/site.ts`
- **Services:** `lib/data/services.ts`
- **Testimonials:** `lib/data/testimonials.ts`
- **Office hours:** `config/constants.ts`
- **Colors:** `app/globals.css` (CSS variables)

## Contact Information

**Business:** Mahesh Joshi & Associates
**Owner:** Mahesh M. Joshi (ACA)
**Phone:** +91 9130601393
**Email:** camaheshjoshi25@gmail.com
**Office:** 607, 6th Floor, ANP Landmark, Near Bhumkar Chowk, Wakad, Pimpri Chinchwad, Pune - 411057
**Google Maps:** [View Location](https://maps.app.goo.gl/acYMSXZQ53xYgQ9bA)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
