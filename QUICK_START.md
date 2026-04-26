# ⚡ Quick Start for New Claude Sessions

## Project: CA Mahesh Joshi Website
**Status:** Production-ready, all 20 tasks complete ✅

## 1-Minute Context

**What is this?**
Professional website for Chartered Accountant Mahesh M. Joshi in Wakad, Pune.

**Tech Stack:**
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion (animations)
- React Hook Form + Zod (forms)
- Resend (email)

**Key Features:**
- 4 pages: Home, About, Services, Contact
- Contact form with email integration
- WhatsApp floating button
- Google Maps integration
- Fully responsive
- SEO optimized with structured data
- Performance optimized

## 2-Minute Setup

```bash
# 1. Node version (CRITICAL!)
nvm use 20

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
# Add RESEND_API_KEY=your_key_here

# 4. Run
npm run dev
# Visit http://localhost:3000
```

## Critical Files to Know

### Content Updates
- **Contact Info:** `config/site.ts`
- **Services:** `lib/data/services.ts`
- **Testimonials:** `lib/data/testimonials.ts`
- **Office Hours:** `config/constants.ts`

### Pages
- `app/page.tsx` - Home
- `app/about/page.tsx` - About
- `app/services/page.tsx` - Services
- `app/contact/page.tsx` - Contact

### Key Components
- `components/ui/` - Button, Card, Input, etc.
- `components/layout/` - Header, Footer
- `components/home/` - Home sections
- `components/forms/ContactForm.tsx` - Contact form

### Configuration
- `app/globals.css` - Design tokens (colors, fonts)
- `next.config.ts` - Next.js config
- `lib/metadata.ts` - SEO metadata
- `.env.example` - Required env vars

## Common Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run analyze  # Bundle analysis
```

## Common Tasks

**Update colors:**
→ Edit `app/globals.css` (:root variables)

**Add service:**
→ Edit `lib/data/services.ts`

**Update contact info:**
→ Edit `config/site.ts`

**Add new page:**
→ Create `app/[route]/page.tsx` with metadata

## Client Information

**Business:** Mahesh Joshi & Associates
**Owner:** Mahesh M. Joshi (ACA)
**Phone:** +91 9130601393
**Email:** camaheshjoshi25@gmail.com
**Office:** ANP Landmark, 6th Floor, Wakad, Pune - 411057
**Maps:** https://maps.app.goo.gl/acYMSXZQ53xYgQ9bA

## Node Version Issue?

If you see "Cannot find native binding" error:

```bash
nvm use 20
rm -rf node_modules package-lock.json .next
npm install
```

## Full Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Code organization
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - How to do things
- **[COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md)** - Component usage
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to production
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Colors, typography, spacing
- **[PERFORMANCE.md](PERFORMANCE.md)** - Optimization strategies
- **[SEO-GUIDE.md](SEO-GUIDE.md)** - SEO implementation

**Next.js 16 Note:** Breaking changes from training data. Check `node_modules/next/dist/docs/` for current API docs.

---

**Ready to work! Start with DEVELOPER_GUIDE.md for common tasks.** 🚀
