"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
  ExternalLink,
} from "lucide-react";
import { FadeIn } from "@/components/animations";
import type { Testimonial } from "@/types";

interface TestimonialsCarouselProps {
  reviews: Testimonial[];
  overallRating?: number;
  totalRatings?: number;
  placeId?: string;
}

/** Renders filled + empty stars for a given rating (1–5). */
function StarRating({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const cls = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${cls} ${
            star <= (rating ?? 5)
              ? "fill-secondary text-secondary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

/** Google-branded "Leave a Review" button. */
function LeaveReviewCTA({ placeId }: { placeId: string }) {
  const reviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
  return (
    <a
      href={reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-200 group"
    >
      {/* Google "G" logo colours via SVG */}
      <svg
        className="h-5 w-5 flex-shrink-0"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      <Star className="h-4 w-4 fill-secondary text-secondary" />
      Leave a Review on Google
      <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

export function TestimonialsCarousel({
  reviews,
  overallRating,
  totalRatings,
  placeId,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrentIndex((p) => (p + 1) % reviews.length),
    [reviews.length]
  );
  const prev = useCallback(
    () => setCurrentIndex((p) => (p - 1 + reviews.length) % reviews.length),
    [reviews.length]
  );

  // Auto-slide every 4 seconds; resets whenever user manually navigates
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(next, 4000);
    return () => clearTimeout(timer);
  }, [paused, next, currentIndex]);

  const current = reviews[currentIndex];
  const hasGoogleData = !!overallRating && overallRating > 0;

  return (
    <div
      className="max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Overall Google Rating Badge ──────────────────────────── */}
      {hasGoogleData && (
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 shadow-sm">
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-bold text-card-foreground text-lg leading-none">
                {overallRating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(overallRating)} size="sm" />
              {totalRatings && totalRatings > 0 && (
                <span className="text-muted-foreground text-sm">
                  · {totalRatings.toLocaleString("en-IN")} reviews
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground italic">
              Rated on Google
            </span>
          </div>
        </FadeIn>
      )}

      <div>
        {/* ── Featured Testimonial Card ─────────────────────────── */}
        <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white">
          {/* Decorative quote */}
          <div className="absolute top-8 right-8 opacity-20">
            <Quote className="h-16 w-16" />
          </div>

          {/* Source badge */}
          {current.source === "google" && (
            <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mb-4 text-xs font-medium">
              <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Verified Google Review
            </div>
          )}

          {/* Star rating */}
          <div className="mb-6">
            <StarRating rating={current.rating ?? 5} />
          </div>

          {/* Review text */}
          <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed relative z-10">
            &ldquo;{current.message}&rdquo;
          </blockquote>

          {/* Author + navigation */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-lg">{current.name}</div>
              {current.role && (
                <div className="text-white/75 text-sm mt-0.5">{current.role}</div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dot Indicators ───────────────────────────────────────── */}
      <FadeIn delay={0.5}>
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-border hover:bg-primary/50"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </FadeIn>

      {/* ── Leave a Review CTA ────────────────────────────────────── */}
      {placeId && (
        <FadeIn delay={0.7}>
          <div className="flex flex-col items-center gap-3 mt-12">
            <p className="text-sm text-muted-foreground">
              Had a good experience? Help others find us.
            </p>
            <LeaveReviewCTA placeId={placeId} />
          </div>
        </FadeIn>
      )}
    </div>
  );
}
