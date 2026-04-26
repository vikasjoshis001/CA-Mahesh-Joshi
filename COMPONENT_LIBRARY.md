# Component Library

Comprehensive reference for all reusable components in the CA Mahesh Joshi website.

## Table of Contents
1. [UI Components](#ui-components)
2. [Layout Components](#layout-components)
3. [Home Page Sections](#home-page-sections)
4. [Form Components](#form-components)
5. [Animation Components](#animation-components)
6. [Special Components](#special-components)

---

## UI Components

Foundation-level reusable components located in `components/ui/`.

### Button

Interactive button component with multiple variants and sizes.

**Location**: `components/ui/Button.tsx:1`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary"` \| `"secondary"` \| `"outline"` \| `"ghost"` \| `"accent"` | `"primary"` | Visual style variant |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Button size |
| `isLoading` | `boolean` | `false` | Shows loading spinner and disables button |
| `disabled` | `boolean` | `false` | Disables button interaction |
| `children` | `ReactNode` | - | Button content |
| ...rest | `ButtonHTMLAttributes` | - | All standard button HTML attributes |

#### Variant Styles

- **primary**: Blue background, white text, hover darkens
- **secondary**: Dark background, white text
- **accent**: Orange background, white text
- **outline**: Transparent with blue border, fills on hover
- **ghost**: Transparent with primary text, light background on hover

#### Usage Examples

```typescript
import { Button } from "@/components/ui";

// Primary button (default)
<Button>Click Me</Button>

// Secondary button with icon
<Button variant="secondary" size="lg">
  <Phone className="h-5 w-5" />
  Call Now
</Button>

// Outline button
<Button variant="outline">Learn More</Button>

// Loading state
<Button isLoading>Submitting...</Button>

// Disabled
<Button disabled>Unavailable</Button>

// Custom onClick
<Button onClick={() => console.log("Clicked!")}>
  Submit
</Button>

// Link-style button (use with Link component)
<Link href="/contact">
  <Button variant="accent">Get Started</Button>
</Link>
```

---

### Card

Content container with consistent styling and subcomponents.

**Location**: `components/ui/Card.tsx:1`

#### Subcomponents

- **Card**: Main container
- **CardHeader**: Header section
- **CardTitle**: Title text
- **CardDescription**: Subtitle/description text
- **CardContent**: Main content area
- **CardFooter**: Footer section

#### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default"` \| `"bordered"` \| `"elevated"` | `"default"` | Visual style variant |
| `hover` | `boolean` | `false` | Adds hover effect (lift + shadow) |
| `children` | `ReactNode` | - | Card content |
| ...rest | `HTMLDivAttributes` | - | All standard div attributes |

#### Variant Styles

- **default**: Plain background, no border
- **bordered**: Border with subtle shadow
- **elevated**: Elevated with shadow, no border

#### Usage Examples

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/components/ui";

// Basic card
<Card>
  <CardContent>
    <p>Simple card content</p>
  </CardContent>
</Card>

// Full card with all subcomponents
<Card variant="bordered" hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>A brief description of the card content</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Elevated card with hover
<Card variant="elevated" hover className="cursor-pointer">
  <CardHeader>
    <div className="w-12 h-12 bg-primary rounded-lg mb-3 flex items-center justify-center">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <CardTitle>Service Name</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Service description...</p>
  </CardContent>
</Card>
```

---

### Input

Form input field with label, validation, and helper text support.

**Location**: `components/ui/Input.tsx:1`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label text |
| `error` | `string` | - | Error message (shows in red below input) |
| `helperText` | `string` | - | Helper text (shows below input when no error) |
| `type` | `string` | `"text"` | Input type (text, email, tel, etc.) |
| `required` | `boolean` | `false` | Shows red asterisk next to label |
| ...rest | `InputHTMLAttributes` | - | All standard input attributes |

#### Features

- Auto-generates ID from label if not provided
- Shows required asterisk (*) when `required` prop is true
- Accessible with proper ARIA attributes
- Compatible with React Hook Form

#### Usage Examples

```typescript
import { Input } from "@/components/ui";

// Basic input
<Input label="Name" />

// Required input
<Input label="Email" type="email" required />

// Input with error
<Input
  label="Phone"
  type="tel"
  error="Please enter a valid phone number"
/>

// Input with helper text
<Input
  label="Username"
  helperText="Choose a unique username"
/>

// With React Hook Form
import { useForm } from "react-hook-form";

const { register, formState: { errors } } = useForm();

<Input
  {...register("email")}
  label="Email"
  type="email"
  error={errors.email?.message}
  required
/>
```

---

### Container

Responsive width constraint wrapper with automatic padding.

**Location**: `components/ui/Container.tsx:1`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"full"` | `"xl"` | Maximum width constraint |
| `children` | `ReactNode` | - | Container content |
| ...rest | `HTMLDivAttributes` | - | All standard div attributes |

#### Size Values

- **sm**: `768px` (max-w-3xl)
- **md**: `1024px` (max-w-5xl)
- **lg**: `1152px` (max-w-6xl)
- **xl**: `1280px` (max-w-7xl)
- **full**: No constraint (max-w-full)

#### Features

- Automatic responsive padding (px-4 sm:px-6 lg:px-8)
- Centered with `mx-auto`
- Flexible width with `w-full`

#### Usage Examples

```typescript
import { Container } from "@/components/ui";

// Default container (xl = 1280px)
<Container>
  <h1>Page Content</h1>
</Container>

// Smaller container for focused content
<Container size="md">
  <article>Blog post content</article>
</Container>

// Full width container
<Container size="full">
  <div>Full width content</div>
</Container>

// Typical page structure
<section className="py-16">
  <Container>
    <SectionHeading title="Services" subtitle="What we offer" />
    {/* Content */}
  </Container>
</section>
```

---

### SectionHeading

Consistent section header with title, subtitle, and optional accent bar.

**Location**: `components/ui/SectionHeading.tsx:1`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | **Required**. Main heading text |
| `subtitle` | `string` | - | Optional subtitle/description |
| `align` | `"left"` \| `"center"` \| `"right"` | `"center"` | Text alignment |
| `accent` | `boolean` | `false` | Shows gradient accent bar above title |
| ...rest | `HTMLDivAttributes` | - | All standard div attributes |

#### Features

- Responsive typography (text-3xl sm:text-4xl)
- Gradient accent bar with primary, secondary, and accent colors
- Subtitle automatically constrains to max-w-2xl and centers

#### Usage Examples

```typescript
import { SectionHeading } from "@/components/ui";

// Basic centered heading
<SectionHeading title="Our Services" />

// With subtitle
<SectionHeading
  title="Why Choose Us"
  subtitle="Professional expertise you can trust"
/>

// Left-aligned with accent
<SectionHeading
  title="About Us"
  subtitle="Learn more about our firm"
  align="left"
  accent
/>

// Full example in section
<section className="py-16 bg-muted">
  <Container>
    <SectionHeading
      title="Client Testimonials"
      subtitle="See what our clients say about us"
      accent
    />
    {/* Content */}
  </Container>
</section>
```

---

## Layout Components

Site-wide layout components located in `components/layout/`.

### Header

Sticky navigation header with logo and navigation links.

**Location**: `components/layout/Header.tsx:1`

#### Features

- Sticky positioning (sticks to top when scrolling)
- Mobile-responsive (hamburger menu on small screens)
- Active page highlighting
- Logo and brand name
- Smooth scroll to top on logo click

#### Navigation Structure

```typescript
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];
```

#### Customization

To add/remove navigation links, edit the `navigation` array in `Header.tsx:20`.

---

### Footer

Multi-column footer with links, contact info, and social media.

**Location**: `components/layout/Footer.tsx:1`

#### Sections

1. **About**: Brand name and tagline
2. **Quick Links**: Navigation links
3. **Services**: List of services
4. **Contact**: Contact information

#### Features

- 4-column layout on desktop
- Stacks on mobile
- Copyright notice with current year
- Links to privacy policy and terms (if added)

---

### MobileMenu

Slide-in mobile navigation drawer.

**Location**: `components/layout/MobileMenu.tsx:1`

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Controls menu visibility |
| `onClose` | `() => void` | Function to close menu |

#### Features

- Slide-in animation from right
- Backdrop overlay
- Close button (X icon)
- Navigation links
- Closes on link click

#### Usage

Controlled by Header component state. Not typically used directly.

---

## Home Page Sections

Page-specific sections for the home page, located in `components/home/`.

### HeroSection

Hero section with headline, description, stats, and CTAs.

**Location**: `components/home/HeroSection.tsx:1`

#### Features

- Large headline with gradient accent
- Descriptive text
- Dual CTAs (primary and secondary)
- Stats cards (years experience, clients served, satisfaction rate)
- Scroll-triggered animations

#### Customization

Edit content in the component file. Stats data can be moved to `config/constants.ts` if needed.

---

### ServicesOverview

Grid of service cards with icons and descriptions.

**Location**: `components/home/ServicesOverview.tsx:1`

#### Data Source

`lib/data/services.ts` - First 6 services displayed

#### Features

- 6-service grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Icon for each service
- Hover effects
- Staggered animation
- "View All Services" button

---

### WhyChooseUs

Trust indicators and value propositions section.

**Location**: `components/home/WhyChooseUs.tsx:1`

#### Features

- Stats display (100% accuracy, 500+ clients, 5-star rating)
- Benefits grid
- Professional image placeholder
- Animated counters (if implemented)

---

### Testimonials

Client testimonials carousel with navigation.

**Location**: `components/home/Testimonials.tsx:1`

#### Data Source

`lib/data/testimonials.ts`

#### Features

- Auto-scroll every 5 seconds
- Manual navigation (prev/next buttons)
- Dot indicators
- Star rating display
- Responsive design

---

### CTASection

Call-to-action section with CTAs and gradient background.

**Location**: `components/home/CTASection.tsx:1`

#### Features

- Gradient background (primary to dark)
- Compelling headline
- Descriptive text
- Dual CTAs (Get Free Consultation + Call Now)

---

## Form Components

Form-related components located in `components/forms/`.

### ContactForm

Contact form with validation and email integration.

**Location**: `components/forms/ContactForm.tsx:1`

#### Fields

| Field | Type | Validation |
|-------|------|------------|
| `name` | text | Required, 2-100 characters |
| `email` | email | Required, valid email format |
| `phone` | tel | Required, 10-15 digits |
| `service` | select | Optional |
| `message` | textarea | Required, 10-1000 characters |

#### Features

- React Hook Form for state management
- Zod schema validation
- Real-time error messages
- Loading state during submission
- Success/error feedback
- Pre-filled service selector

#### Validation Schema

```typescript
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});
```

#### API Integration

Submits to `/api/contact` endpoint, which sends email via Resend.

#### Usage

```typescript
import { ContactForm } from "@/components/forms/ContactForm";

<ContactForm />
```

---

## Animation Components

Reusable Framer Motion animation wrappers located in `components/animations/`.

All animation components require the parent component to be a client component (`"use client"` directive).

### FadeIn

Directional fade animation triggered on scroll.

**Location**: `components/animations/FadeIn.tsx:1`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required**. Content to animate |
| `direction` | `"up"` \| `"down"` \| `"left"` \| `"right"` | `"up"` | Fade direction |
| `delay` | `number` | `0` | Animation delay in seconds |
| `duration` | `number` | `0.5` | Animation duration in seconds |

#### Usage Examples

```typescript
"use client";

import { FadeIn } from "@/components/animations";

// Fade up (default)
<FadeIn>
  <div>Content fades up from below</div>
</FadeIn>

// Fade from right with delay
<FadeIn direction="right" delay={0.3}>
  <div>Content slides in from right</div>
</FadeIn>

// Custom duration
<FadeIn duration={0.8}>
  <div>Slower fade animation</div>
</FadeIn>
```

---

### StaggerContainer

Parent wrapper for staggered children animations.

**Location**: `components/animations/StaggerContainer.tsx:1`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required**. StaggerItem components |
| `staggerDelay` | `number` | `0.1` | Delay between each child animation |

#### Usage

Must wrap `StaggerItem` components. Use for lists or grids where items should animate sequentially.

```typescript
"use client";

import { StaggerContainer, StaggerItem } from "@/components/animations";

<StaggerContainer>
  {items.map((item, index) => (
    <StaggerItem key={index} index={index}>
      <div>{item.content}</div>
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

### StaggerItem

Individual item in a staggered animation sequence.

**Location**: `components/animations/StaggerItem.tsx:1`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required**. Content to animate |
| `index` | `number` | `0` | Item index (determines delay) |

#### Features

- Fades in from bottom with upward slide
- Delay calculated from index and parent staggerDelay
- Triggers on scroll into view (once)

#### Usage

Always use inside `StaggerContainer`. Pass unique index to each item.

```typescript
"use client";

import { StaggerContainer, StaggerItem } from "@/components/animations";

<StaggerContainer staggerDelay={0.15}>
  <StaggerItem index={0}>
    <Card>First card</Card>
  </StaggerItem>
  <StaggerItem index={1}>
    <Card>Second card (0.15s delay)</Card>
  </StaggerItem>
  <StaggerItem index={2}>
    <Card>Third card (0.30s delay)</Card>
  </StaggerItem>
</StaggerContainer>
```

---

### ScaleIn

Scale + fade animation for elements.

**Location**: `components/animations/ScaleIn.tsx:1`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required**. Content to animate |
| `delay` | `number` | `0` | Animation delay in seconds |
| `duration` | `number` | `0.5` | Animation duration in seconds |

#### Features

- Starts at 95% scale and 0 opacity
- Scales to 100% while fading in
- Smooth cubic-bezier easing

#### Usage Examples

```typescript
"use client";

import { ScaleIn } from "@/components/animations";

// Basic scale-in
<ScaleIn>
  <div className="w-32 h-32 bg-primary rounded-full" />
</ScaleIn>

// With delay
<ScaleIn delay={0.4}>
  <img src="/logo.png" alt="Logo" />
</ScaleIn>
```

---

## Special Components

Unique components with specific purposes located in `components/`.

### WhatsAppButton

Floating WhatsApp chat button.

**Location**: `components/WhatsAppButton.tsx:1`

#### Features

- Fixed position (bottom-right corner)
- Shows on all pages except `/contact`
- Pre-filled message
- Tooltip on hover
- Opens WhatsApp web/app
- Smooth fade-in animation

#### Default Message

"Hi! I am interested in your CA services. I would like to know more."

#### Customization

Edit message in `WhatsAppButton.tsx:15` or make it a prop for dynamic messages.

#### Usage

Already included in `app/layout.tsx`. No need to add manually.

---

### GoogleMap

Lazy-loaded Google Maps iframe component.

**Location**: `components/GoogleMap.tsx:1`

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `embedUrl` | `string` | **Required**. Google Maps embed URL |
| `title` | `string` | **Required**. Accessible title for iframe |

#### Features

- Lazy loading (`loading="lazy"`)
- Loading spinner while map loads
- Accessible with proper title
- Responsive (fills container)
- No API key required (uses embed URL)

#### Usage Examples

```typescript
import { GoogleMap } from "@/components/GoogleMap";

const mapEmbedUrl = `https://www.google.com/maps/embed?pb=...`;

<div className="h-[400px] rounded-lg overflow-hidden">
  <GoogleMap
    embedUrl={mapEmbedUrl}
    title="Office Location - ANP Landmark, Wakad"
  />
</div>
```

#### Generating Embed URL

1. Go to Google Maps
2. Search for location
3. Click "Share" → "Embed a map"
4. Copy iframe src URL
5. Add query parameters for customization

---

### StructuredData

JSON-LD structured data schemas for SEO.

**Location**: `components/StructuredData.tsx:1`

#### Schemas

##### LocalBusinessSchema

Business information for Google My Business and local search.

**Fields:**
- Business name, type, URL
- Address (full postal address)
- Phone number
- Opening hours
- Services offered
- Area served
- Geographic coordinates

**Usage:**
```typescript
import { LocalBusinessSchema } from "@/components/StructuredData";

// In layout.tsx or page
<LocalBusinessSchema />
```

##### PersonSchema

Professional information about Mahesh Joshi.

**Fields:**
- Name, job title
- Qualifications (ACA)
- Email, telephone
- Works for organization
- Address

**Usage:**
```typescript
import { PersonSchema } from "@/components/StructuredData";

<PersonSchema />
```

##### BreadcrumbSchema

Breadcrumb navigation for SEO.

**Props:**
```typescript
interface BreadcrumbItem {
  name: string;
  url: string;
}

<BreadcrumbSchema items={[
  { name: "Home", url: "https://camaheshjoshi.com" },
  { name: "Services", url: "https://camaheshjoshi.com/services" }
]} />
```

#### Benefits

- Rich snippets in Google search results
- Better search engine understanding
- Enhanced local search visibility
- Breadcrumb trails in search results

---

## Best Practices

### Component Usage

1. **Always use UI components** instead of raw HTML elements
2. **Use Container** for consistent page widths
3. **Use SectionHeading** for consistent section headers
4. **Prefer composition** over prop drilling

### Animation Guidelines

1. **Mark as client component** when using animations
2. **Use viewport={{ once: true }}** to prevent re-animation
3. **Don't overuse** animations - they should enhance, not distract
4. **Test performance** on slower devices

### Accessibility

1. **All images** must have alt text
2. **Form inputs** must have labels
3. **Buttons** must have descriptive text or aria-label
4. **Color contrast** must meet WCAG standards

### Performance

1. **Lazy load** below-fold content
2. **Use Server Components** when possible
3. **Minimize client JavaScript** by using "use client" sparingly
4. **Optimize images** with Next.js Image component

---

## Related Documentation

- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - How to create and modify components
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Component organization and structure
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Design tokens and styling guidelines
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common component issues
