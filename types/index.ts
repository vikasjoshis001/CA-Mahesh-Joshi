// Common TypeScript type definitions

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  rating?: number;
  image?: string;
  source?: "google" | "static";
  publishedAt?: string;
}

// ── Google Places API (New) ──────────────────────────────────────────────────

export interface GoogleReviewAuthor {
  displayName: string;
  uri: string;
  photoUri?: string;
}

export interface GoogleReviewText {
  text: string;
  languageCode: string;
}

export interface GoogleReview {
  name: string;
  rating: number;
  authorAttribution: GoogleReviewAuthor;
  publishTime: string;
  relativePublishTimeDescription: string;
  text?: GoogleReviewText;
  originalText?: GoogleReviewText;
}

export interface GooglePlacesResult {
  reviews: GoogleReview[];
  rating: number;
  userRatingCount: number;
  displayName?: { text: string };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category?: string;
  image?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage?: string;
  links: {
    phone: string[];
    email: string;
    whatsapp: string;
    address: string;
  };
}
