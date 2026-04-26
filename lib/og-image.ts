/**
 * Utilities for extracting Open Graph images from article URLs.
 *
 * At ISR build time we fetch each article's HTML <head> and pull out the
 * og:image meta tag.  Any failure (timeout, 403, missing tag) returns null —
 * the card falls back to its gradient thumbnail tile silently.
 *
 * All fetches run in parallel so total added latency ≈ slowest single request,
 * not the sum of all requests.
 */

import type { NewsItem } from "@/lib/rss";

// ── Constants ─────────────────────────────────────────────────────────────────

const FETCH_TIMEOUT_MS = 4000;

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// Matches both attribute orderings:
//   <meta property="og:image" content="https://..." />
//   <meta content="https://..." property="og:image" />
const OG_IMAGE_RE =
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i;
const OG_IMAGE_RE_ALT =
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i;

// Twitter card fallback (twitter:image)
const TWITTER_IMAGE_RE =
  /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i;
const TWITTER_IMAGE_RE_ALT =
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i;

// ── Core helper ───────────────────────────────────────────────────────────────

/**
 * Fetches the HTML of an article URL and extracts the og:image (or
 * twitter:image) meta tag value.
 *
 * Returns null on any error — never throws.
 */
export async function fetchOgImage(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": BROWSER_UA,
        Accept: "text/html,application/xhtml+xml,*/*",
        "Accept-Language": "en-IN,en;q=0.9",
      },
    });

    if (!res.ok) return null;

    // We only need the <head> — read first 20 KB to avoid downloading the
    // full page body for every article.
    const reader = res.body?.getReader();
    if (!reader) return null;

    let html = "";
    const decoder = new TextDecoder();
    const MAX_BYTES = 48 * 1024; // 48 KB — enough for TaxGuru & most publishers
    let bytesRead = 0;
    let headClosed = false;

    while (!headClosed) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      html += decoder.decode(value, { stream: true });
      // Stop once we've seen </head> or read enough bytes
      if (html.includes("</head>") || bytesRead >= MAX_BYTES) {
        headClosed = true;
      }
    }

    // Cancel the stream — we don't need the rest of the body
    reader.cancel().catch(() => {});

    // Try og:image first, then twitter:image as fallback
    for (const re of [OG_IMAGE_RE, OG_IMAGE_RE_ALT, TWITTER_IMAGE_RE, TWITTER_IMAGE_RE_ALT]) {
      const match = re.exec(html);
      if (match?.[1]) {
        const imgUrl = match[1].trim();
        // Skip data URIs and obviously invalid values
        if (imgUrl.startsWith("http") && imgUrl.length < 2048) {
          return imgUrl;
        }
      }
    }

    return null;
  } catch {
    // AbortError (timeout), network error, etc.
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ── Batch enrichment ──────────────────────────────────────────────────────────

/**
 * Enriches an array of NewsItems with their article og:image URLs.
 * Only fetches for items that didn't already receive an image from the
 * RSS feed (media:content / enclosure).  All fetches run in parallel.
 * Items where no image is found keep `imageUrl: undefined` and display
 * the gradient thumbnail fallback.
 */
export async function enrichWithImages(items: NewsItem[]): Promise<NewsItem[]> {
  const results = await Promise.all(
    items.map(async (item) => {
      // Already has an image from the RSS feed — skip the extra HTTP request
      if (item.imageUrl) return item;
      const url = await fetchOgImage(item.link);
      return url ? { ...item, imageUrl: url } : item;
    })
  );
  return results;
}
