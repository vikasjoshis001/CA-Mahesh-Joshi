// Server Component — no interactivity needed, all data is props
import {
  ExternalLink,
  Clock,
  Landmark,
  BarChart3,
  Calculator,
  Users,
  TrendingUp,
} from "lucide-react";
import type { ReactElement } from "react";
import { relativeTime } from "@/lib/rss";
import type { NewsItem } from "@/lib/rss";
import { FEED_VISUALS } from "@/lib/data/news-feeds";
import type { FeedKey } from "@/lib/data/news-feeds";

// ── Icon map (avoids dynamic import on server) ────────────────────────────────

function FeedIcon({ feedKey, className }: { feedKey: FeedKey; className?: string }): ReactElement {
  const { icon } = FEED_VISUALS[feedKey];
  const props = { className: className ?? "h-8 w-8 text-white/90" };
  switch (icon) {
    case "landmark":     return <Landmark {...props} />;
    case "bar-chart-3":  return <BarChart3 {...props} />;
    case "calculator":   return <Calculator {...props} />;
    case "users":        return <Users {...props} />;
    case "trending-up":  return <TrendingUp {...props} />;
  }
}

// ── Gradient thumbnail tile (fallback) ───────────────────────────────────────

function GradientTile({
  feedKey,
  size = "md",
}: {
  feedKey: FeedKey;
  size?: "lg" | "md" | "sm";
}): ReactElement {
  const { gradient, category } = FEED_VISUALS[feedKey];

  const heights: Record<string, string> = {
    lg: "h-52",
    md: "h-28",
    sm: "h-20",
  };

  return (
    <div
      className={`relative w-full ${heights[size]} rounded-xl bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-2 overflow-hidden flex-shrink-0`}
      aria-hidden="true"
    >
      <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-black/10 blur-xl" />
      <FeedIcon feedKey={feedKey} className={size === "sm" ? "h-6 w-6 text-white/90" : "h-8 w-8 text-white/90"} />
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 px-2 text-center leading-tight">
        {category}
      </span>
    </div>
  );
}

// ── Thumbnail — real image or gradient fallback ───────────────────────────────

function Thumbnail({
  feedKey,
  imageUrl,
  title,
  size = "md",
}: {
  feedKey: FeedKey;
  imageUrl?: string;
  title: string;
  size?: "lg" | "md" | "sm";
}): ReactElement {
  const heights: Record<string, string> = {
    lg: "h-52",
    md: "h-28",
    sm: "h-20",
  };

  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={title}
        className={`w-full ${heights[size]} rounded-xl object-cover flex-shrink-0 bg-muted`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return <GradientTile feedKey={feedKey} size={size} />;
}

// ── Card variants ─────────────────────────────────────────────────────────────

export type NewsCardVariant = "hero" | "stack" | "small";

interface NewsCardProps {
  item: NewsItem;
  variant?: NewsCardVariant;
}

// ── Hero card (big left card) ─────────────────────────────────────────────────

function HeroCard({ item }: { item: NewsItem }): ReactElement {
  const { category } = FEED_VISUALS[item.feedKey];
  // unstable_cache serialises Date → string; rehydrate before use
  const pubDate = new Date(item.pubDate);

  return (
    <article className="group flex flex-col gap-0 rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">
      <Thumbnail feedKey={item.feedKey} imageUrl={item.imageUrl} title={item.title} size="lg" />

      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Category + time */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {category}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <Clock className="h-3 w-3" />
            <time dateTime={pubDate.toISOString()}>{relativeTime(pubDate)}</time>
          </div>
        </div>

        {/* Headline */}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read: ${item.title}`}
          className="block"
        >
          <h2 className="text-xl font-bold leading-snug text-card-foreground group-hover:text-primary transition-colors line-clamp-3">
            {item.title}
          </h2>
        </a>

        {/* Snippet */}
        {item.description.length > 10 && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {item.description}
          </p>
        )}

        {/* CTA */}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Read full article
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

// ── Stack card (right column cards) ──────────────────────────────────────────

function StackCard({ item }: { item: NewsItem }): ReactElement {
  const { category } = FEED_VISUALS[item.feedKey];
  const pubDate = new Date(item.pubDate);

  return (
    <article className="group flex gap-4 rounded-xl overflow-hidden border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-200 p-3">
      <div className="w-24 flex-shrink-0">
        <Thumbnail feedKey={item.feedKey} imageUrl={item.imageUrl} title={item.title} size="sm" />
      </div>

      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          {category}
        </span>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read: ${item.title}`}
          className="block"
        >
          <h3 className="text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary transition-colors line-clamp-3">
            {item.title}
          </h3>
        </a>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto">
          <Clock className="h-3 w-3" />
          <time dateTime={pubDate.toISOString()}>{relativeTime(pubDate)}</time>
        </div>
      </div>
    </article>
  );
}

// ── Small card (bottom row of 3) ──────────────────────────────────────────────

function SmallCard({ item }: { item: NewsItem }): ReactElement {
  const { category } = FEED_VISUALS[item.feedKey];
  const pubDate = new Date(item.pubDate);

  return (
    <article className="group flex flex-col gap-0 rounded-xl overflow-hidden border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-200 h-full">
      <Thumbnail feedKey={item.feedKey} imageUrl={item.imageUrl} title={item.title} size="md" />

      <div className="flex flex-col gap-2 p-4 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {category}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5" />
            <time dateTime={pubDate.toISOString()}>{relativeTime(pubDate)}</time>
          </div>
        </div>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read: ${item.title}`}
          className="block flex-1"
        >
          <h3 className="text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary transition-colors line-clamp-3">
            {item.title}
          </h3>
        </a>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-auto"
        >
          Read more
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────

export function NewsCard({ item, variant = "small" }: NewsCardProps): ReactElement {
  switch (variant) {
    case "hero":  return <HeroCard item={item} />;
    case "stack": return <StackCard item={item} />;
    case "small": return <SmallCard item={item} />;
  }
}
