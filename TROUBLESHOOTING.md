# Troubleshooting Guide

Common issues and solutions for the CA Mahesh Joshi website project.

## Table of Contents
1. [Build & Development Issues](#build--development-issues)
2. [Contact Form Issues](#contact-form-issues)
3. [Performance Issues](#performance-issues)
4. [Deployment Issues](#deployment-issues)
5. [SEO & Metadata Issues](#seo--metadata-issues)
6. [Mobile Responsiveness Issues](#mobile-responsiveness-issues)
7. [Animation Issues](#animation-issues)
8. [Environment Variables](#environment-variables)

---

## Build & Development Issues

### "Cannot find native binding" Error

**Symptom:**
```
Error: Cannot find native binding at '...'
Error: Cannot find module @next/swc-darwin-arm64
```

**Cause:**
Wrong Node.js version. The project requires Node.js 20+ for Next.js 16 and Tailwind CSS 4 compatibility.

**Solution:**
```bash
# 1. Switch to Node 20
nvm use 20

# If you don't have Node 20:
nvm install 20
nvm use 20

# 2. Clean install
rm -rf node_modules package-lock.json .next
npm install

# 3. Restart dev server
npm run dev
```

**Prevention:**
- Always run `nvm use` before working on the project
- The `.nvmrc` file ensures correct version
- Add to your shell profile to auto-switch:
  ```bash
  # Add to ~/.zshrc or ~/.bashrc
  autoload -U add-zsh-hook
  load-nvmrc() {
    if [[ -f .nvmrc && -r .nvmrc ]]; then
      nvm use
    fi
  }
  add-zsh-hook chpwd load-nvmrc
  ```

---

### Tailwind Styles Not Applying

**Symptom:**
- CSS classes not working
- Components have no styling
- Tailwind utilities don't apply

**Possible Causes & Solutions:**

#### 1. Missing Tailwind Imports
**Check:** `app/globals.css`
```css
/* These lines must be present at the top */
@import "tailwindcss";
```

#### 2. Stale Build Cache
**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

#### 3. Incorrect Tailwind Configuration
**Check:** `tailwind.config.ts`
```typescript
// Ensure content paths are correct
content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
],
```

#### 4. Dynamic Class Names Not Working
**Problem:** Tailwind can't detect dynamic classes
```typescript
// ❌ This won't work
<div className={`bg-${color}`} />

// ✅ Use this instead
<div className={color === 'primary' ? 'bg-primary' : 'bg-secondary'} />
```

---

### TypeScript Errors in Animations

**Symptom:**
```
Type 'Variants' is not assignable to type 'Variants'
Property 'variants' does not exist on type...
```

**Cause:**
Missing or incorrect type imports from Framer Motion.

**Solution:**
```typescript
// Import Variants type explicitly
import { motion, Variants } from "framer-motion";

// Add type annotation to variants
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Use in motion component
<motion.div variants={itemVariants}>
  {children}
</motion.div>
```

---

### Module Not Found Errors

**Symptom:**
```
Module not found: Can't resolve '@/components/ui/Button'
```

**Possible Causes & Solutions:**

#### 1. Incorrect Import Path
**Check:** Ensure you're using the `@/` alias correctly
```typescript
// ✅ Correct
import { Button } from "@/components/ui/Button";
import { Button } from "@/components/ui"; // If exported from index.ts

// ❌ Incorrect
import { Button } from "components/ui/Button";
import { Button } from "../../../components/ui/Button";
```

#### 2. Missing tsconfig.json Paths
**Check:** `tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### 3. File Doesn't Exist
**Verify:**
```bash
# Check if file exists
ls -la components/ui/Button.tsx
```

---

### Port 3000 Already in Use

**Symptom:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution 1: Kill Process on Port 3000**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2: Use Different Port**
```bash
PORT=3001 npm run dev
```

---

### styled-jsx Syntax Errors

**Symptom:**
```
Error: Could not parse module
Expected '</', got 'jsx text'
```

**Cause:**
Using `<style jsx>` without the styled-jsx package, or syntax errors in styled-jsx.

**Solution:**
Don't use styled-jsx in this project. Use Tailwind CSS instead.

```typescript
// ❌ Don't do this
<style jsx>{`
  .button { color: red; }
`}</style>

// ✅ Do this
<div className="text-red-500">
  Content
</div>
```

If you need custom animations, use Tailwind's animation utilities:
```typescript
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
  Content
</div>
```

---

## Contact Form Issues

### Form Not Sending Emails

**Symptom:**
- Form submits but no email received
- Console error: "Failed to send email"
- Response: 500 Internal Server Error

**Possible Causes & Solutions:**

#### 1. Missing RESEND_API_KEY
**Check:** `.env.local` file exists and has the API key
```bash
# Verify file exists
cat .env.local

# Should contain:
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

**Solution:**
```bash
# Create .env.local from template
cp .env.example .env.local

# Edit and add your Resend API key
# Get key from https://resend.com/api-keys
```

#### 2. Invalid API Key
**Check:** API key is active in Resend dashboard
- Login to [resend.com](https://resend.com)
- Go to API Keys
- Verify key is not expired or deleted
- Generate new key if needed

#### 3. API Route Error
**Check:** Browser console and server logs
```bash
# Check server logs in terminal where npm run dev is running
# Look for errors from /api/contact
```

**Debug:**
```typescript
// Add console.log in app/api/contact/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received form data:", body);

    // ... rest of code

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error in contact API:", error);
  }
}
```

#### 4. Email Going to Spam
**Check:** Spam/junk folder in recipient email (camaheshjoshi25@gmail.com)

**Solution for Production:**
- Verify domain in Resend
- Add SPF and DKIM records to DNS
- Use verified sender domain

---

### Form Validation Errors

**Symptom:**
- Fields marked as error when they shouldn't be
- Validation messages incorrect
- Form submits when it shouldn't

**Solution:**
Check Zod schema in `components/forms/ContactForm.tsx`:

```typescript
// Ensure schema matches your requirements
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});
```

**Common Validation Issues:**
- **Phone not validating:** Check regex pattern
- **Email rejecting valid emails:** Test with z.string().email()
- **Required fields submitting empty:** Ensure .min(1) for required fields

---

### Form Submission Loading State Stuck

**Symptom:**
- Submit button shows loading spinner indefinitely
- Form never shows success/error message

**Cause:**
API call not completing or error not handled.

**Solution:**
```typescript
// Ensure try/catch in form submit handler
const onSubmit = async (data: ContactFormData) => {
  setIsSubmitting(true);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    // Success handling
    setShowSuccess(true);
    reset();
  } catch (error) {
    // Error handling
    setSubmitError("Failed to send message. Please try again.");
  } finally {
    // Always reset loading state
    setIsSubmitting(false);
  }
};
```

---

## Performance Issues

### Slow Page Loads

**Symptom:**
- Pages take > 3 seconds to load
- Large bundle sizes
- Slow First Contentful Paint (FCP)

**Diagnosis:**
```bash
# Analyze bundle size
ANALYZE=true npm run build

# Check bundle analyzer report in browser
# Look for:
# - Largest packages
# - Duplicate dependencies
# - Unnecessary imports
```

**Solutions:**

#### 1. Optimize Images
```typescript
// Use Next.js Image component
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}
  priority  // For above-fold images only
/>
```

#### 2. Lazy Load Below-Fold Content
```typescript
// Use dynamic imports
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

#### 3. Minimize Client JavaScript
```typescript
// Use Server Components (default)
// Only add "use client" when necessary

// ❌ Unnecessary client component
"use client";
export function StaticCard() {
  return <div>Static content</div>;
}

// ✅ Server component
export function StaticCard() {
  return <div>Static content</div>;
}
```

#### 4. Optimize Package Imports
```typescript
// ❌ Imports entire library
import { motion } from "framer-motion";

// ✅ Already optimized in next.config.ts
// experimental.optimizePackageImports: ['lucide-react', 'framer-motion']
```

---

### Layout Shift (CLS)

**Symptom:**
- Content jumps as page loads
- Poor Core Web Vitals score
- Elements shift position

**Causes & Solutions:**

#### 1. Images Without Dimensions
```typescript
// ❌ No dimensions
<img src="/image.jpg" alt="Image" />

// ✅ With dimensions
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
/>
```

#### 2. Font Loading
**Already fixed in `app/layout.tsx`:**
```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",  // Prevents layout shift
  preload: true,
});
```

#### 3. Dynamic Content Height
```typescript
// ❌ Height changes on load
<div>
  {loading ? <Spinner /> : <Content />}
</div>

// ✅ Fixed minimum height
<div className="min-h-[200px]">
  {loading ? <Spinner /> : <Content />}
</div>
```

---

## Deployment Issues

### Build Fails on Vercel

**Symptom:**
```
Build failed with exit code 1
Type error: ...
Module not found: ...
```

**Solutions:**

#### 1. Check Node.js Version
**Ensure Vercel uses Node 20:**
- Go to Vercel project settings
- Environment Variables → Add `NODE_VERSION` = `20`
- Or add to `package.json`:
```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

#### 2. TypeScript Errors
```bash
# Test build locally
npm run build

# Fix any TypeScript errors shown
# Common issues:
# - Missing type imports
# - Incorrect prop types
# - Missing return types
```

#### 3. Missing Dependencies
```bash
# Ensure all dependencies are in package.json
npm install <missing-package>

# Commit package.json and package-lock.json
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

---

### Environment Variables Not Working

**Symptom:**
- `process.env.RESEND_API_KEY` is undefined
- Features work locally but not in production
- API calls failing in production

**Solution:**

#### 1. Add to Vercel Dashboard
1. Go to Vercel project → Settings → Environment Variables
2. Add each variable:
   - Key: `RESEND_API_KEY`
   - Value: Your API key
   - Environment: Production, Preview, Development (select all)

#### 2. Use NEXT_PUBLIC_ Prefix for Client-Side
```typescript
// ❌ Won't work on client
const url = process.env.SITE_URL;

// ✅ Works on client
const url = process.env.NEXT_PUBLIC_SITE_URL;
```

#### 3. Redeploy After Adding Variables
- Environment variables require redeployment
- Go to Deployments → Redeploy

---

### Domain Not Working After Deployment

**Symptom:**
- Site works on vercel.app URL
- Custom domain shows error or doesn't load

**Solution:**

#### 1. Verify DNS Settings
- Check DNS records in domain provider
- Should have:
  - A record: `76.76.21.21` (Vercel IP)
  - CNAME record: `cname.vercel-dns.com`

#### 2. Wait for DNS Propagation
- Can take 24-48 hours
- Check status: [dnschecker.org](https://dnschecker.org)

#### 3. SSL Certificate
- Vercel automatically provisions SSL
- May take a few minutes
- Check in Vercel domain settings

---

## SEO & Metadata Issues

### Open Graph Image Not Showing

**Symptom:**
- Sharing on social media shows no image
- Or shows broken image icon

**Solutions:**

#### 1. Create OG Image
```bash
# Create image at correct size
# 1200x630px (optimal for all platforms)
# Save as: public/og-image.jpg
```

#### 2. Update Metadata
```typescript
// lib/metadata.ts
export const defaultOGImage = "/og-image.jpg";
// Or full URL for production:
export const defaultOGImage = "https://camaheshjoshi.com/og-image.jpg";
```

#### 3. Test with Debuggers
- **Facebook:** [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
- **Twitter:** [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
- **LinkedIn:** [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)

**Clear cache** after updating image.

---

### Google Not Indexing Pages

**Symptom:**
- `site:camaheshjoshi.com` shows no results
- Pages not appearing in Google search
- Sitemap not being crawled

**Solutions:**

#### 1. Submit Sitemap to Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://camaheshjoshi.com`
3. Verify ownership (use HTML tag method)
4. Go to Sitemaps → Add: `https://camaheshjoshi.com/sitemap.xml`

#### 2. Check robots.txt
```bash
# Visit in browser:
https://camaheshjoshi.com/robots.txt

# Should allow crawling:
User-agent: *
Allow: /
```

#### 3. Request Indexing
- In Google Search Console
- Go to URL Inspection
- Enter page URL
- Click "Request Indexing"

#### 4. Wait for Crawling
- Initial indexing: 1-2 weeks
- Full indexing: 1-3 months
- Be patient!

---

### Metadata Not Updating

**Symptom:**
- Changed metadata but still shows old title/description
- Social media preview shows old content

**Solutions:**

#### 1. Hard Refresh Browser
```
macOS: Cmd + Shift + R
Windows: Ctrl + Shift + R
```

#### 2. Clear Next.js Cache
```bash
rm -rf .next
npm run build
npm run start
```

#### 3. Social Media Cache
- Facebook: Use debug tool to scrape again
- Twitter: Can take 1 week to update
- LinkedIn: Use post inspector to refresh

---

## Mobile Responsiveness Issues

### Layout Breaking on Mobile

**Symptom:**
- Horizontal scroll on mobile
- Content overflow
- Elements overlapping

**Solutions:**

#### 1. Check Container Widths
```typescript
// ❌ Fixed width
<div className="w-[1200px]">

// ✅ Responsive width
<div className="w-full max-w-7xl">
```

#### 2. Test Responsive Classes
```typescript
// Use Tailwind responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col on mobile, 2 on tablet, 3 on desktop */}
</div>
```

#### 3. Test at Multiple Breakpoints
- iPhone SE: 375px (smallest)
- iPhone 12/13: 390px
- iPad: 768px
- Desktop: 1280px

**Testing:**
```bash
# In Chrome DevTools
# Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
# Test at different screen sizes
```

#### 4. Fix Overflow
```css
/* Add to container causing overflow */
.container {
  overflow-x: hidden;
}
```

---

### Touch Targets Too Small

**Symptom:**
- Buttons hard to tap on mobile
- Links too close together
- Poor mobile usability

**Solution:**
Ensure minimum 44x44px touch targets (WCAG guideline).

```typescript
// ❌ Too small
<button className="h-8 px-2 text-sm">Click</button>

// ✅ Proper size
<Button size="md">Click</Button>  // h-11 (44px)
```

---

### Mobile Menu Not Working

**Symptom:**
- Hamburger icon doesn't open menu
- Menu doesn't close after clicking link
- Scroll behind menu

**Check:**

#### 1. Z-Index
```typescript
// MobileMenu should have high z-index
<div className="fixed inset-0 z-50">
  {/* Menu content */}
</div>
```

#### 2. Click Handlers
```typescript
// Ensure onClose is called
<Link href="/about" onClick={onClose}>
  About
</Link>
```

#### 3. Body Scroll Lock
```typescript
// In MobileMenu component
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isOpen]);
```

---

## Animation Issues

### Animations Not Playing

**Symptom:**
- No fade-in effects
- Elements appear instantly
- No scroll-triggered animations

**Solutions:**

#### 1. Missing "use client" Directive
```typescript
// ❌ Server component with animations
export function AnimatedComponent() {
  return <motion.div>...</motion.div>;
}

// ✅ Client component
"use client";
export function AnimatedComponent() {
  return <motion.div>...</motion.div>;
}
```

#### 2. Framer Motion Not Installed
```bash
npm install framer-motion
```

#### 3. Viewport Not Configured
```typescript
// Ensure viewport prop for scroll animations
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
>
  Content
</motion.div>
```

---

### Animation Performance Issues

**Symptom:**
- Janky/stuttering animations
- Page lag during animations
- High CPU usage

**Solutions:**

#### 1. Use Hardware-Accelerated Properties
```typescript
// ✅ Good (transform, opacity)
animate={{ opacity: 1, x: 0 }}

// ❌ Bad (width, height, top, left)
animate={{ width: "100%", left: 0 }}
```

#### 2. Reduce Simultaneous Animations
```typescript
// Stagger instead of animating all at once
<StaggerContainer staggerDelay={0.1}>
  {items.map((item, i) => (
    <StaggerItem key={i} index={i}>
      {item}
    </StaggerItem>
  ))}
</StaggerContainer>
```

#### 3. Use viewport.once
```typescript
// Animate only once, not every scroll
viewport={{ once: true }}
```

---

## Environment Variables

### Variable Not Accessible

**Check:**
1. **File name:** Must be `.env.local` (not .env)
2. **Location:** Root directory
3. **Restart required:** Restart dev server after changes
4. **Naming:**
   - Server-only: `RESEND_API_KEY`
   - Client-side: `NEXT_PUBLIC_SITE_URL`

### Getting Variables

```bash
# Create from template
cp .env.example .env.local

# Edit file
nano .env.local
# or
code .env.local
```

**Required Variables:**
- `RESEND_API_KEY` - Get from [resend.com](https://resend.com)
- `NEXT_PUBLIC_SITE_URL` - Your site URL (optional for dev)

---

## Quick Diagnostics

### Health Check Commands

```bash
# Check Node version
node -v  # Should be v20.x.x

# Check if dev server can start
npm run dev

# Check if production build works
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npm run lint

# Verify environment file
cat .env.local
```

### Common Error Messages

| Error | Likely Cause | Fix |
|-------|--------------|-----|
| Cannot find native binding | Wrong Node version | `nvm use 20` + reinstall |
| Port 3000 in use | Dev server already running | Kill process or use different port |
| Module not found | Missing dependency or wrong import | Check import path and npm install |
| Type error | TypeScript issue | Check types and imports |
| ECONNREFUSED | API server not running | Start dev server |
| 500 Internal Server Error | Server-side error | Check API route logs |

---

## Getting Help

If you've tried the solutions above and still have issues:

1. **Check the logs:**
   - Browser console (F12)
   - Terminal where `npm run dev` is running
   - Vercel deployment logs

2. **Search for error:**
   - Copy exact error message
   - Search in GitHub issues, Stack Overflow
   - Check Next.js documentation

3. **Documentation:**
   - [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Development workflows
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Code structure
   - [COMPONENT_LIBRARY.md](COMPONENT_LIBRARY.md) - Component usage

4. **Official Docs:**
   - [Next.js Docs](https://nextjs.org/docs)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
   - [Framer Motion Docs](https://www.framer.com/motion/)
   - [React Hook Form Docs](https://react-hook-form.com/)
   - [Zod Docs](https://zod.dev/)

---

**Remember:** Most issues can be resolved by:
1. Using the correct Node version (20+)
2. Clearing cache and reinstalling dependencies
3. Checking environment variables
4. Reading error messages carefully
