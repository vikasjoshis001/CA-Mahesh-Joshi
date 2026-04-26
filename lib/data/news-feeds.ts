/**
 * Centralized RSS feed configuration for the News page.
 *
 * All industry feeds are sourced from TaxGuru (taxguru.in) — India's #1 CA/tax
 * knowledge portal.  Content is 100% relevant to Chartered Accountants:
 * GST circulars, ITAT / HC judgments (incl. Bombay HC & ITAT Mumbai/Pune),
 * CBDT notifications, ICAI circulars, SEBI/RBI updates, and more.
 *
 * Maharashtra / Pune focus:
 *   The Income Tax feed naturally surfaces Bombay HC and ITAT Mumbai/Pune
 *   judgments — the most relevant jurisdiction for Maharashtra-based CAs.
 *   The ICAI feed covers Pune/Mumbai chapter empanelment and circulars.
 *
 * PIB (Press Information Bureau) is kept as the official government source
 * for Finance Ministry press releases (HTTP 403 during build is expected and
 * handled gracefully — works in Vercel production).
 */

export const REVALIDATE_SECONDS = 3600; // 1 hour

export type FeedTag = "official" | "industry";

export type FeedKey = "pib" | "gst" | "income-tax" | "icai" | "sebi";

export interface FeedVisual {
  /** Tailwind gradient classes for the thumbnail tile (fallback when no image) */
  gradient: string;
  /** Lucide icon name (resolved in components to avoid server/client issues) */
  icon: "landmark" | "bar-chart-3" | "calculator" | "users" | "trending-up";
  /** Short category label shown on the card */
  category: string;
}

export const FEED_VISUALS: Record<FeedKey, FeedVisual> = {
  pib: {
    gradient: "from-rose-700 to-red-500",
    icon: "landmark",
    category: "PIB Official",
  },
  gst: {
    gradient: "from-orange-500 to-amber-400",
    icon: "bar-chart-3",
    category: "GST Updates",
  },
  "income-tax": {
    gradient: "from-blue-900 to-blue-500",
    icon: "calculator",
    category: "Income Tax",
  },
  icai: {
    gradient: "from-teal-600 to-green-400",
    icon: "users",
    category: "ICAI & CA",
  },
  sebi: {
    gradient: "from-purple-700 to-violet-500",
    icon: "trending-up",
    category: "SEBI & Markets",
  },
};

export interface FeedConfig {
  url: string;
  label: string;       // shown as the source badge on news cards
  key: FeedKey;
  tag: FeedTag;
  maxItems?: number;   // cap per feed to avoid flooding from a single source
}

// ── Official Government / Regulatory Feeds ───────────────────────────────────

export const OFFICIAL_FEEDS: FeedConfig[] = [
  {
    url: "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=3&Regid=3",
    label: "PIB — Finance Ministry",
    key: "pib",
    tag: "official",
    maxItems: 5,
  },
];

// ── CA Industry Feeds (TaxGuru) ───────────────────────────────────────────────
// 4 category feeds × 5 maxItems = 20 potential articles (post-filter) → top 8.
//
// Income Tax feed surfaces Bombay HC and ITAT Mumbai/Pune judgments naturally,
// giving Maharashtra CAs jurisdiction-relevant case law alongside national
// CBDT notifications and Section-wise analysis.

export const INDUSTRY_FEEDS: FeedConfig[] = [
  {
    // GST Council decisions, CBIC circulars, AAR orders (incl. Maharashtra AAR)
    url: "https://taxguru.in/goods-and-service-tax/feed/",
    label: "TaxGuru — GST",
    key: "gst",
    tag: "industry",
    maxItems: 5,
  },
  {
    // CBDT notifications, ITAT judgments (Mumbai/Pune/Chennai/Delhi),
    // Bombay HC orders on direct tax — most relevant for Maharashtra CAs
    url: "https://taxguru.in/income-tax/feed/",
    label: "TaxGuru — Income Tax",
    key: "income-tax",
    tag: "industry",
    maxItems: 5,
  },
  {
    // ICAI empanelment notices, MCA circulars, CA exam results,
    // Pune/Mumbai chapter updates, professional development news
    url: "https://taxguru.in/chartered-accountant/feed/",
    label: "TaxGuru — ICAI",
    key: "icai",
    tag: "industry",
    maxItems: 5,
  },
  {
    // SEBI regulations, RBI circulars, capital markets compliance —
    // relevant for CAs advising listed companies and HNI clients
    url: "https://taxguru.in/sebi/feed/",
    label: "TaxGuru — SEBI",
    key: "sebi",
    tag: "industry",
    maxItems: 5,
  },
];

export const ALL_FEEDS: FeedConfig[] = [...OFFICIAL_FEEDS, ...INDUSTRY_FEEDS];
