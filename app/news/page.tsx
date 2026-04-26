// Server Component — fetches RSS feeds at build time, revalidates every hour (ISR)
import type { Metadata } from "next";
import { RefreshCw, Rss } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { NewsGrid } from "@/components/news/NewsGrid";
import { fetchAllNews } from "@/lib/rss";
import { enrichWithImages } from "@/lib/og-image";
import { ALL_FEEDS } from "@/lib/data/news-feeds";
import { siteConfig } from "@/config/site";

// ── ISR: revalidate every 1 hour ─────────────────────────────────────────────
export const revalidate = 3600;

// ── Page metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "News & Updates | Tax, GST & Finance News India",
  description:
    "Latest income tax, GST, CBDT, and finance news for India. Official government updates from PIB and industry news — updated every hour.",
  alternates: {
    canonical: `${siteConfig.url}/news`,
  },
  openGraph: {
    title: "News & Updates — Mahesh Joshi & Associates",
    description:
      "Stay informed with the latest India tax, GST, and finance news. Updated hourly from official and industry sources.",
    url: `${siteConfig.url}/news`,
  },
};

// ── JSON-LD structured data ───────────────────────────────────────────────────
function NewsPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Updates",
    description:
      "Latest India income tax, GST, CBDT and finance news curated for Chartered Accountants.",
    url: `${siteConfig.url}/news`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function NewsPage() {
  // Fetch all feeds in parallel, deduplicated and sorted newest-first
  // Cap at 6 for the magazine layout
  const allItems = await fetchAllNews(ALL_FEEDS);
  const sliced = allItems.slice(0, 8);
  // Enrich with og:image — all 6 fetches run in parallel, failures are silent
  const items = await enrichWithImages(sliced);

  const generatedAt = new Date().toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  });

  return (
    <>
      <NewsPageSchema />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <Rss className="h-3.5 w-3.5" />
                Live Feed — Updated Every Hour
              </div>

              <SectionHeading
                title="News & Updates"
                subtitle="CA-relevant updates on income tax, GST, ICAI and SEBI — curated for Chartered Accountants in Pune & Maharashtra, with coverage of Bombay HC and ITAT Mumbai/Pune judgments."
                align="left"
              />

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Last refreshed: {generatedAt}
                </span>
                <span>Sources: PIB Finance Ministry · Google News India</span>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Magazine grid ─────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <Container>
          {items.length === 0 ? (
            <FadeIn>
              <div className="text-center py-24 text-muted-foreground">
                <p className="text-5xl mb-6">📡</p>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  News feeds are temporarily unavailable
                </h2>
                <p className="text-sm max-w-md mx-auto">
                  We couldn&apos;t load the latest articles right now. This page
                  auto-refreshes every hour — please check back shortly.
                </p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <NewsGrid items={items} />
            </FadeIn>
          )}
        </Container>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────────── */}
      <section className="py-8 border-t border-border bg-muted/30">
        <Container>
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            News articles are sourced from the Press Information Bureau (Government of India)
            and Google News aggregator. All articles link to their original publishers.
            Mahesh Joshi &amp; Associates does not claim ownership of third-party content.
            For official CBDT / GSTN / MCA notifications, always refer to the source website.
          </p>
        </Container>
      </section>
    </>
  );
}
