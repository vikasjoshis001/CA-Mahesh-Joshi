// Server Component — pure layout, no client state needed
import type { ReactElement } from "react";
import type { NewsItem } from "@/lib/rss";
import { NewsCard } from "./NewsCard";

/**
 * Magazine-style grid layout for up to 8 articles:
 *
 *   [ HERO  (left 60%) ]  [ Stack 1 (right) ]
 *   [  big card        ]  [ Stack 2 (right) ]
 *   [                  ]  [ Stack 3 (right) ]
 *   [                  ]  [ Stack 4 (right) ]
 *   ──────────────────────────────────────────
 *   [ Small ]  [ Small ]  [ Small ]   ← bottom row of 3
 */

interface NewsGridProps {
  items: NewsItem[];
}

export function NewsGrid({ items }: NewsGridProps): ReactElement {
  const hero   = items[0];
  const stack  = items.slice(1, 5);   // up to 4 items for the right column
  const bottom = items.slice(5, 8);   // up to 3 items for the bottom row

  return (
    <div className="flex flex-col gap-6">

      {/* ── Top row: hero + stack ────────────────────────── */}
      {hero && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* Hero — spans 3/5 columns on large screens */}
          <div className="lg:col-span-3">
            <NewsCard item={hero} variant="hero" />
          </div>

          {/* Stack — spans 2/5 columns; up to 4 cards stacked vertically */}
          {stack.length > 0 && (
            <div className="lg:col-span-2 flex flex-col gap-3">
              {stack.map((item) => (
                <NewsCard key={item.id} item={item} variant="stack" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Bottom row: up to 3 small cards ─────────────── */}
      {bottom.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bottom.map((item) => (
            <NewsCard key={item.id} item={item} variant="small" />
          ))}
        </div>
      )}
    </div>
  );
}
