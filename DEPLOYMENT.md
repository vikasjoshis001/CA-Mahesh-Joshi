# Deployment Guide

Step-by-step guide to deploy the CA Mahesh Joshi website to production.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Deploying to Vercel](#deploying-to-vercel)
3. [Post-Deployment Tasks](#post-deployment-tasks)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Continuous Deployment](#continuous-deployment)
6. [Monitoring & Analytics](#monitoring--analytics)
7. [Troubleshooting Deployment](#troubleshooting-deployment)

---

## Pre-Deployment Checklist

Before deploying, ensure everything works correctly.

### Local Testing

```bash
# 1. Ensure you're using Node 20
nvm use 20

# 2. Install dependencies
npm install

# 3. Test development server
npm run dev
# Visit http://localhost:3000
# Check all pages load correctly

# 4. Test production build
npm run build
npm run start
# Verify no errors during build
# Check production site works at http://localhost:3000
```

### Pre-Deployment Verification

- [ ] All pages load without errors
  - [ ] Home page (/)
  - [ ] About page (/about)
  - [ ] Services page (/services)
  - [ ] Contact page (/contact)

- [ ] Contact form works
  - [ ] Form validation shows errors for invalid input
  - [ ] Form submits successfully with valid data
  - [ ] Email is received at camaheshjoshi25@gmail.com
  - [ ] Success message displays after submission

- [ ] Navigation works
  - [ ] All menu links navigate correctly
  - [ ] Mobile menu opens/closes properly
  - [ ] Active page is highlighted

- [ ] Visual elements
  - [ ] Google Maps loads on contact page
  - [ ] WhatsApp button appears (except on contact page)
  - [ ] All animations play smoothly
  - [ ] Images load correctly

- [ ] Mobile responsive
  - [ ] Test on iPhone SE (375px)
  - [ ] Test on tablet (768px)
  - [ ] Test on desktop (1280px+)
  - [ ] No horizontal scroll
  - [ ] All buttons are tappable

- [ ] Performance
  - [ ] Run Lighthouse audit (aim for 90+ score)
  - [ ] No console errors or warnings
  - [ ] Fast page loads

- [ ] SEO
  - [ ] All pages have unique titles
  - [ ] All pages have meta descriptions
  - [ ] robots.txt accessible
  - [ ] sitemap.xml accessible

- [ ] Environment variables documented
  - [ ] `.env.example` is up to date
  - [ ] All required variables listed in README

---

## Deploying to Vercel

Vercel is recommended for Next.js applications and offers:
- Automatic deployments on git push
- Built-in CDN and SSL
- Serverless functions for API routes
- Environment variable management
- Preview deployments for PRs

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Select your GitHub repository
3. Or import from Git URL:
   - Click "Import Git Repository"
   - Paste repository URL
   - Click "Continue"

### Step 3: Configure Project

**Framework Preset:**
- Should auto-detect "Next.js"

**Root Directory:**
- Leave as `./` (root)

**Build & Development Settings:**
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

**Node.js Version:**
- Click "Environment Variables"
- Add: `NODE_VERSION` = `20`

Or ensure in `package.json`:
```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### Step 4: Environment Variables

Add all required environment variables:

#### For Production

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `RESEND_API_KEY` | `re_xxxxx...` | [resend.com](https://resend.com) → API Keys |
| `NEXT_PUBLIC_SITE_URL` | `https://camaheshjoshi.com` | Your domain |

**How to Add:**
1. In project settings → Environment Variables
2. Add variable name and value
3. Select environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. Click "Save"

**Important:** Environment variables require redeployment to take effect.

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Check for build errors
4. Once complete, click "Visit" to see live site

**Your site is now live at:**
`https://your-project-name.vercel.app`

---

## Post-Deployment Tasks

After deployment, complete these tasks for optimal performance and discoverability.

### 1. Update URLs in Code

Update hardcoded URLs to your production domain.

#### Update `lib/metadata.ts`

```typescript
// Change baseUrl to your domain
export const baseUrl = "https://camaheshjoshi.com"; // Update this
```

#### Update `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://camaheshjoshi.com</loc>  <!-- Update all URLs -->
    <lastmod>2026-04-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Update other URLs -->
</urlset>
```

#### Update `components/StructuredData.tsx`

```typescript
// Update all URL references in schemas
const schema = {
  "@type": "ProfessionalService",
  "url": "https://camaheshjoshi.com", // Update this
  // ... other fields
};
```

#### Commit and Push

```bash
git add lib/metadata.ts public/sitemap.xml components/StructuredData.tsx
git commit -m "Update URLs to production domain"
git push origin main
```

Vercel will automatically redeploy with updated URLs.

---

### 2. Email Configuration (Resend)

For production email to work reliably, verify your domain.

#### Verify Domain in Resend

1. Login to [resend.com](https://resend.com)
2. Go to "Domains"
3. Click "Add Domain"
4. Enter: `camaheshjoshi.com`
5. Add DNS records to your domain provider:

**DNS Records to Add:**

| Type | Name | Value |
|------|------|-------|
| TXT | `@` | `resend._domainkey` value from Resend |
| MX | `@` | `feedback-smtp.resend.com` priority 10 |

6. Click "Verify Domain"
7. Wait for verification (can take up to 48 hours)

#### Update Email Sender

Once domain is verified:

```typescript
// app/api/contact/route.ts
// Change from:
from: "Website Contact Form <onboarding@resend.dev>",

// To:
from: "Website Contact Form <noreply@camaheshjoshi.com>",
```

---

### 3. Create Open Graph Image

For better social media sharing.

#### Create Image

**Specifications:**
- Size: 1200x630px
- Format: JPG or PNG
- Content: Logo, business name, tagline, phone number

**Tools:**
- [Canva](https://canva.com) - Free templates
- Figma - Design tool
- Photoshop - Professional editing

#### Add to Project

1. Save image as `public/og-image.jpg`
2. Update metadata:

```typescript
// lib/metadata.ts
export const defaultOGImage = "https://camaheshjoshi.com/og-image.jpg";
```

3. Commit and push:

```bash
git add public/og-image.jpg lib/metadata.ts
git commit -m "Add Open Graph image for social sharing"
git push origin main
```

---

### 4. Google Search Console Setup

Get your site indexed by Google.

#### Add Property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Add Property"
3. Select "URL prefix"
4. Enter: `https://camaheshjoshi.com`
5. Click "Continue"

#### Verify Ownership

**HTML Tag Method** (Recommended):

1. Copy the meta tag provided:
   ```html
   <meta name="google-site-verification" content="xxxxx..." />
   ```

2. Add to `lib/metadata.ts`:
   ```typescript
   export const metadata: Metadata = {
     // ... other fields
     verification: {
       google: "xxxxx...", // Paste code here
     },
   };
   ```

3. Commit, push, and wait for redeploy

4. Return to Search Console and click "Verify"

#### Submit Sitemap

1. In Google Search Console, go to "Sitemaps"
2. Enter: `https://camaheshjoshi.com/sitemap.xml`
3. Click "Submit"
4. Wait for Google to crawl (can take 1-2 weeks)

#### Monitor Indexing

- Check "Coverage" to see indexed pages
- "Performance" shows search impressions and clicks
- "URL Inspection" lets you request indexing for specific pages

---

### 5. Google Business Profile

Critical for local SEO.

#### Create Profile

1. Go to [business.google.com](https://business.google.com)
2. Click "Manage now"
3. Enter business name: "Mahesh Joshi & Associates"
4. Choose category: "Chartered Accountant"
5. Add location: "ANP Landmark, 6th Floor, Wakad, Pune - 411057"
6. Add phone: +91 9130601393
7. Add website: https://camaheshjoshi.com

#### Verify Business

Google will send verification code via:
- Postcard to business address (5-14 days)
- Or phone call
- Or email (if eligible)

#### Complete Profile

- Add business hours
- Upload photos (office, team, logo)
- Add services offered
- Add business description
- Respond to reviews

**Impact:** Huge boost for local searches like "CA near me" or "CA in Wakad"

---

### 6. Analytics Setup (Optional)

Track visitor behavior and conversions.

#### Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create account and property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to `app/layout.tsx`:

```typescript
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Vercel Analytics

1. In Vercel dashboard → Analytics
2. Click "Enable"
3. Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Custom Domain Setup

Connect your custom domain to Vercel.

### Step 1: Add Domain in Vercel

1. Go to Vercel project → Settings → Domains
2. Enter domain: `camaheshjoshi.com`
3. Click "Add"
4. Also add `www.camaheshjoshi.com` (redirects to main)

### Step 2: Configure DNS

Vercel will show required DNS records. Add these to your domain provider (GoDaddy, Namecheap, etc.):

#### Option A: Using A Record

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

#### Option B: Using CNAME (if allowed)

| Type | Name | Value |
|------|------|-------|
| CNAME | `@` | `cname.vercel-dns.com` |
| CNAME | `www` | `cname.vercel-dns.com` |

### Step 3: Wait for DNS Propagation

- Can take 1-48 hours
- Check status in Vercel dashboard
- SSL certificate provisions automatically

### Step 4: Set Primary Domain

1. In Vercel → Domains
2. Set `camaheshjoshi.com` as primary
3. `www.camaheshjoshi.com` will redirect

### Verify Domain Works

```bash
# Check DNS propagation
nslookup camaheshjoshi.com

# Test in browser
https://camaheshjoshi.com
https://www.camaheshjoshi.com
```

---

## Continuous Deployment

Automatic deployments on code changes.

### How It Works

1. You push code to GitHub:
   ```bash
   git add .
   git commit -m "Update services page"
   git push origin main
   ```

2. Vercel automatically:
   - Detects the push
   - Runs `npm run build`
   - Deploys if build succeeds
   - Updates live site

3. You receive email notification when deploy completes

### Preview Deployments

Every branch and PR gets a preview URL:

```bash
# Create feature branch
git checkout -b feature/new-service

# Make changes, commit, push
git push origin feature/new-service

# Create PR on GitHub
# Vercel creates preview URL: https://camaheshjoshi-git-feature-new-service.vercel.app
```

Benefits:
- Test changes before merging
- Share preview with client
- No impact on production

### Deployment Settings

In Vercel → Settings → Git:

**Production Branch:**
- `main` (or `master`)

**Ignored Build Step:**
- Can skip builds for doc-only changes
- Add to `vercel.json`:
  ```json
  {
    "git": {
      "deploymentEnabled": {
        "main": true
      }
    }
  }
  ```

---

## Monitoring & Analytics

Track your site's health and performance.

### Vercel Dashboard

**Metrics to Monitor:**
- **Deployments:** Success/failure rate
- **Functions:** API route invocations, errors
- **Analytics:** Pageviews, visitors, top pages
- **Speed Insights:** Core Web Vitals scores

**Accessing:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. View each tab

### Google Search Console

**Weekly checks:**
- Coverage: Indexed pages vs errors
- Performance: Search impressions, clicks, CTR
- Enhancements: Rich results, mobile usability

**Accessing:**
[search.google.com/search-console](https://search.google.com/search-console)

### Google Analytics

**Key metrics:**
- Users: Daily/weekly/monthly visitors
- Sessions: Total visits
- Bounce rate: % leaving after one page
- Top pages: Most visited pages
- Traffic sources: Where visitors come from

**Accessing:**
[analytics.google.com](https://analytics.google.com)

### Performance Monitoring

**Tools:**
- [PageSpeed Insights](https://pagespeed.web.dev/) - Google's performance tool
- [GTmetrix](https://gtmetrix.com/) - Detailed performance analysis
- [WebPageTest](https://webpagetest.org/) - Advanced testing

**Aim for:**
- Performance score: 90+
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

## Troubleshooting Deployment

### Build Fails

**Check Build Logs:**
1. Go to Vercel deployment
2. Click "View Build Logs"
3. Scroll to error message

**Common Issues:**
- TypeScript errors → Fix locally, test with `npm run build`
- Missing dependencies → Check `package.json`
- Wrong Node version → Set `NODE_VERSION=20` env var

### Environment Variables Not Working

**Check:**
1. Variables added in Vercel dashboard
2. Correct names (case-sensitive)
3. Applied to correct environment (Production/Preview/Development)
4. Redeployed after adding

**Client-side variables:**
Must prefix with `NEXT_PUBLIC_`

### Domain Not Connecting

**Check:**
1. DNS records correct
2. Wait 24-48 hours for propagation
3. Use [dnschecker.org](https://dnschecker.org) to verify
4. SSL certificate issued (automatic, may take minutes)

### Contact Form Not Sending in Production

**Check:**
1. `RESEND_API_KEY` environment variable set
2. Domain verified in Resend (for production)
3. Check Vercel function logs for errors
4. Test API route directly: `https://camaheshjoshi.com/api/contact`

### Slow Performance

**Check:**
1. Bundle size with `ANALYZE=true npm run build`
2. Image optimization (use Next.js Image component)
3. CDN caching (automatic with Vercel)
4. Run Lighthouse audit

### Images Not Loading

**Check:**
1. Images committed to git
2. Paths correct (use `/image.jpg` for `public/image.jpg`)
3. File sizes reasonable (< 1MB)
4. Formats supported (JPG, PNG, WebP, AVIF)

---

## Deployment Checklist

### Initial Deployment

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] Build succeeds
- [ ] Site accessible at vercel.app URL
- [ ] All pages load
- [ ] Contact form works
- [ ] Mobile responsive

### Post-Deployment

- [ ] URLs updated in code
- [ ] Custom domain connected
- [ ] SSL certificate issued
- [ ] Google Search Console set up
- [ ] Sitemap submitted
- [ ] Google Business Profile created
- [ ] Email domain verified (Resend)
- [ ] Open Graph image created
- [ ] Analytics installed (optional)

### Ongoing Maintenance

- [ ] Monitor deployments (weekly)
- [ ] Check Google Search Console (weekly)
- [ ] Review analytics (monthly)
- [ ] Update content as needed
- [ ] Respond to contact form submissions
- [ ] Update office hours for holidays

---

## Rollback Procedure

If a deployment causes issues:

### Option 1: Instant Rollback (Vercel)

1. Go to Vercel → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"
4. Confirms in seconds

### Option 2: Revert Git Commit

```bash
# Find commit hash
git log

# Revert to previous commit
git revert <commit-hash>

# Or reset (caution: destructive)
git reset --hard <commit-hash>
git push origin main --force
```

Vercel will auto-deploy the reverted code.

---

## Next Steps After Deployment

1. **Monitor initial traffic:**
   - Check Google Search Console weekly
   - Review analytics for user behavior
   - Track contact form submissions

2. **SEO improvements:**
   - Add blog posts for content marketing
   - Get backlinks from local business directories
   - Encourage client reviews on Google Business

3. **Performance optimization:**
   - Optimize images further
   - Add more content gradually
   - Monitor Core Web Vitals

4. **Marketing:**
   - Share on social media
   - Add to email signature
   - Print on business cards
   - List in online directories

---

## Support Resources

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Next.js Deployment:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Google Search Console Help:** [support.google.com/webmasters](https://support.google.com/webmasters)

---

**Congratulations on deploying your website! 🎉**

For development guidance, see [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md).
For troubleshooting, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).
