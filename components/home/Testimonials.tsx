// Server Component — no "use client" directive
// Receives Google review data as props from app/page.tsx (fetched server-side).
// Merges live Google reviews with static fallback reviews so the section
// always shows a minimum of 4 cards even before the API key is configured.

import { Container, SectionHeading } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { testimonials as staticTestimonials } from "@/lib/data/testimonials";
import type { Testimonial } from "@/types";

const MIN_REVIEWS = 4;

interface TestimonialsProps {
  /** Live Google reviews returned by fetchGoogleReviews(), or undefined */
  googleReviews?: Testimonial[];
  /** Overall star rating from Google (e.g. 4.8) */
  overallRating?: number;
  /** Total number of Google ratings */
  totalRatings?: number;
  /** Google Place ID — needed to build the "Leave a Review" URL */
  placeId?: string;
}

/**
 * Merges Google reviews with static fallback reviews.
 * Google reviews always come first; static reviews fill remaining slots
 * up to MIN_REVIEWS so the carousel never looks sparse.
 */
function buildReviewList(googleReviews?: Testimonial[]): Testimonial[] {
  const google = googleReviews ?? [];
  const remaining = Math.max(0, MIN_REVIEWS - google.length);
  const fallback = staticTestimonials.slice(0, remaining);
  return [...google, ...fallback];
}

export function Testimonials({
  googleReviews,
  overallRating,
  totalRatings,
  placeId,
}: TestimonialsProps) {
  const reviews = buildReviewList(googleReviews);
  const hasRealReviews = (googleReviews?.length ?? 0) > 0;

  return (
    <section className="py-20 bg-background">
      <Container>
        <FadeIn>
          <SectionHeading
            title="Client Testimonials"
            subtitle={
              hasRealReviews
                ? "Real reviews from our clients on Google"
                : "What our clients say about our services"
            }
            accent
          />
        </FadeIn>

        <TestimonialsCarousel
          reviews={reviews}
          overallRating={overallRating}
          totalRatings={totalRatings}
          placeId={placeId}
        />
      </Container>
    </section>
  );
}
