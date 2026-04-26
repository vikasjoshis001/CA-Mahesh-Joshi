import { XMLParser } from "fast-xml-parser";
import { unstable_cache } from "next/cache";
import type { FeedConfig, FeedKey, FeedTag } from "@/lib/data/news-feeds";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: string;            // deterministic hash of title+link — stable across refetches
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  pubDateRaw: string;    // original string from the feed (for display)
  source: string;        // feed label (e.g. "PIB — Finance Ministry")
  tag: FeedTag;
  feedKey: FeedKey;      // used to look up gradient + icon in FEED_VISUALS
  imageUrl?: string;     // og:image scraped from the article page (optional)
}

// ── XML parser instance ───────────────────────────────────────────────────────

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  // Google News wraps titles/descriptions in CDATA — this handles it
  cdataPropName: "__cdata",
  // Parse media:content, media:thumbnail namespace elements
  allowBooleanAttributes: true,
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Strips HTML tags from RSS description snippets. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Extracts plain text from a value that may be a CDATA wrapper or plain string. */
function extractText(val: unknown): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null) {
    const obj = val as Record<string, unknown>;
    if (obj.__cdata) return String(obj.__cdata);
    if (obj["#text"]) return String(obj["#text"]);
  }
  return String(val);
}

/** Simple non-crypto hash for stable IDs without external deps. */
function simpleHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

// ── Relevance filter ─────────────────────────────────────────────────────────

/**
 * Patterns that indicate a generic how-to guide or explainer article
 * targeted at the general public — not relevant for a CA professional feed.
 */
const SKIP_PATTERNS: RegExp[] = [
  /^how\s+to\b/i,
  /\bhow\s+to\s+(file|register|apply|check|calculate|pay|download|link|update|activate|verify|open|close|submit|claim|get|obtain|generate|create|add|change|correct|cancel|transfer|convert|withdraw|login|reset|fill)/i,
  /\bstep[s]?\s+(to|for|by\s+step)\b/i,
  /\bguide\s+(to|for)\b/i,
  /\bprocess\s+(of|for|to)\b/i,
  /\bcomplete\s+guide\b/i,
  /\bbeginner[s]?\b/i,
  /\bwhat\s+is\s+(gst|tds|tcs|itr|pan|tan|gstr|itr-\d|form\s+\d|section\s+\d)/i,
  /\beligibilit(y|ies)\s+(for|to|of)\b/i,
  /\bbenefits?\s+of\b/i,
  /\bdifference\s+between\b/i,
  /\bmeaning\s+of\b/i,
  /\beverything\s+you\s+need\s+to\s+know\b/i,
  /\b(register|registration)\s+(process|procedure|steps?)\b/i,
  /\b(file|filing)\s+(your|my|their)\s+(itr|gst|return|taxes?)\b/i,
  /\b(late\s+fee|penalty)\s+(for\s+)?(not\s+)?(filing|paying)\b/i,  // keep circulars, skip basic explainers
  /\bdue\s+date[s]?\s+(for\s+)?(filing|payment|submission)\b/i,
];

/**
 * Returns true if the article title looks like a professional CA update
 * (notification, circular, judgment, order, amendment, etc.)
 * rather than a generic how-to guide.
 */
function isProfessionalContent(title: string): boolean {
  // Whitelist: known professional keywords always pass
  const PROFESSIONAL_PATTERNS: RegExp[] = [
    /\b(notification|circular|order|gazette|press\s+release|amendment|ordinance)\b/i,
    /\b(judgment|judgement|verdict|ruling|decision|bench|tribunal|court)\b/i,
    /\b(itat|hc|high\s+court|supreme\s+court|bombay\s+hc|delhi\s+hc|madras\s+hc)\b/i,
    /\b(cbdt|cbic|sebi|rbi|mca|icai|gstn|gstin|cbi&c)\b/i,
    /\b(section\s+\d+|rule\s+\d+|schedule\s+[ivx\d]+|form\s+\d+[a-z]?)\b/i,
    /\b(budget\s+\d{4}|finance\s+bill|finance\s+act)\b/i,
    /\b(gst\s+council|gst\s+rate|reverse\s+charge|input\s+tax\s+credit|itc\b)\b/i,
    /\b(tds\s+rate|advance\s+tax|tax\s+audit|statutory\s+audit|internal\s+audit)\b/i,
    /\b(empanelment|empanel|tender|recruitment|exam\s+result|ca\s+result)\b/i,
    /\b(aar|advance\s+ruling|anti-dumping|safeguard\s+duty)\b/i,
    /\b(penalty|prosecution|search|survey|assessment|reassessment|demand)\b/i,
    /\b(extension\s+of\s+(due\s+date|deadline|last\s+date|time\s+limit))\b/i,
    /\b(press\s+note|trade\s+notice|instruction|clarification)\b/i,
    /\b(relief|waiver|exemption|concessional\s+rate)\b/i,
  ];

  // First check if it matches any skip pattern — if yes, do a secondary
  // check: if it also matches a professional pattern, let it through
  // (e.g. "Extension of due date for filing ITR" is a real circular)
  const matchesSkip = SKIP_PATTERNS.some((p) => p.test(title));
  if (!matchesSkip) return true; // passes by default

  const matchesProfessional = PROFESSIONAL_PATTERNS.some((p) => p.test(title));
  return matchesProfessional; // only passes skip if it also has a pro signal
}

/** Normalise a raw RSS <item> into a NewsItem. */
function normaliseItem(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any,
  feed: FeedConfig
): NewsItem | null {
  const title = stripHtml(extractText(raw.title));
  const link = extractText(raw.link) || extractText(raw.guid);
  const description = stripHtml(extractText(raw.description)).slice(0, 280);
  const pubDateRaw = extractText(raw.pubDate) || extractText(raw.published) || "";
  const pubDate = pubDateRaw ? new Date(pubDateRaw) : new Date(0);

  // Skip items with no title or link — they are useless as cards
  if (!title || !link) return null;
  // Skip items where the date is invalid
  if (isNaN(pubDate.getTime())) return null;
  // Skip items older than 30 days to keep the feed fresh
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  if (pubDate < thirtyDaysAgo) return null;

  // Skip generic how-to guides / explainers — keep only professional CA content
  if (!isProfessionalContent(title)) return null;

  // Extract image URL from feed if present — try media:content, media:thumbnail, enclosure
  const mediaContent = raw["media:content"];
  const mediaThumbnail = raw["media:thumbnail"];
  const enclosure = raw.enclosure;

  let feedImageUrl: string | undefined;

  if (mediaContent) {
    // Can be array or single object; pick first with a URL
    const mc = Array.isArray(mediaContent) ? mediaContent[0] : mediaContent;
    feedImageUrl = mc?.["@_url"] || mc?.url || undefined;
  } else if (mediaThumbnail) {
    const mt = Array.isArray(mediaThumbnail) ? mediaThumbnail[0] : mediaThumbnail;
    feedImageUrl = mt?.["@_url"] || mt?.url || undefined;
  } else if (enclosure) {
    const enc = Array.isArray(enclosure) ? enclosure[0] : enclosure;
    const mime: string = enc?.["@_type"] || enc?.type || "";
    if (mime.startsWith("image/")) {
      feedImageUrl = enc?.["@_url"] || enc?.url || undefined;
    }
  }

  // Validate the image URL
  if (feedImageUrl && (!feedImageUrl.startsWith("http") || feedImageUrl.length > 2048)) {
    feedImageUrl = undefined;
  }

  return {
    id: simpleHash(title + link),
    title,
    link,
    description,
    pubDate,
    pubDateRaw,
    source: feed.label,
    tag: feed.tag,
    feedKey: feed.key,
    imageUrl: feedImageUrl,
  };
}

// ── Core fetch ────────────────────────────────────────────────────────────────

/**
 * Fetches and parses a single RSS feed.
 * Returns an empty array on any error — a dead feed never breaks the page.
 */
async function fetchOneFeed(feed: FeedConfig): Promise<NewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: {
        // Some feeds (including Google News) require a browser-like UA
        "User-Agent":
          "Mozilla/5.0 (compatible; CAMaheshJoshiBot/1.0; +https://camaheshjoshi.com)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 3600, tags: ["ca-news"] },
    });

    if (!res.ok) {
      console.warn(`[rss] ${feed.label}: HTTP ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const parsed = parser.parse(xml);

    // Handle both standard RSS 2.0 and Atom-like structures
    const channel = parsed?.rss?.channel ?? parsed?.feed ?? {};
    let items = channel.item ?? channel.entry ?? [];

    // Some feeds return a single object instead of an array when there's 1 item
    if (!Array.isArray(items)) items = [items];

    const cap = feed.maxItems ?? 20;
    return items
      .map((raw: unknown) => normaliseItem(raw, feed))
      .filter((item: NewsItem | null): item is NewsItem => item !== null)
      .slice(0, cap);
  } catch (err) {
    console.warn(`[rss] ${feed.label}: failed to fetch/parse`, err);
    return [];
  }
}

// ── Public cached API ─────────────────────────────────────────────────────────

/**
 * Fetches multiple RSS feeds in parallel, deduplicates by title similarity,
 * and returns a single sorted array (newest first).
 *
 * Wrapped in unstable_cache so results are shared across all concurrent
 * requests — the feeds are only fetched once per revalidation window.
 */
async function _fetchAllNews(feeds: FeedConfig[]): Promise<NewsItem[]> {
  const results = await Promise.all(feeds.map(fetchOneFeed));
  const all = results.flat();

  // Deduplicate: two items with identical normalised titles are the same story
  const seen = new Set<string>();
  const unique = all.filter((item) => {
    // Normalise: lowercase, strip punctuation, collapse whitespace
    const key = item.title.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort newest first
  return unique.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export const fetchAllNews = unstable_cache(
  _fetchAllNews,
  ["ca-news-all"],
  { revalidate: 3600, tags: ["ca-news"] }
);

/**
 * Convenience — fetch only official (PIB) feeds.
 */
export const fetchOfficialNews = unstable_cache(
  (feeds: FeedConfig[]) => _fetchAllNews(feeds.filter((f) => f.tag === "official")),
  ["ca-news-official"],
  { revalidate: 3600, tags: ["ca-news"] }
);

/**
 * Convenience — fetch only industry feeds.
 */
export const fetchIndustryNews = unstable_cache(
  (feeds: FeedConfig[]) => _fetchAllNews(feeds.filter((f) => f.tag === "industry")),
  ["ca-news-industry"],
  { revalidate: 3600, tags: ["ca-news"] }
);

// ── Date formatting helper (used in components) ───────────────────────────────

/**
 * Returns a human-friendly relative time string.
 * Falls back to a formatted date for items older than 2 days.
 */
export function relativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
