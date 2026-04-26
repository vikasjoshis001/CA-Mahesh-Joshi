import { unstable_cache } from "next/cache";
import type { GooglePlacesResult, Testimonial } from "@/types";

const PLACES_API_BASE = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "reviews,rating,userRatingCount,displayName";
const REVALIDATE_SECONDS = 86400; // 24 hours

/**
 * Maps a Google Places review to the internal Testimonial shape.
 * Uses the reviewer's display name, review text, star rating, and
 * relative publish time (e.g. "2 months ago") as the role/subtitle.
 */
function mapGoogleReviewToTestimonial(
  review: GooglePlacesResult["reviews"][number],
  index: number
): Testimonial {
  const text =
    review.text?.text ||
    review.originalText?.text ||
    "";

  return {
    id: `google-${index}`,
    name: review.authorAttribution.displayName,
    // Show relative time as the subtitle so visitors know reviews are recent
    role: review.relativePublishTimeDescription,
    message: text,
    rating: review.rating,
    source: "google",
    publishedAt: review.publishTime,
  };
}

/**
 * Fetches reviews and overall rating from the Google Places API (New).
 *
 * Returns null when:
 *  - GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID env vars are missing
 *  - The API call fails for any reason
 *
 * This keeps the site fully functional without API credentials — the
 * Testimonials component falls back to static reviews silently.
 */
async function _fetchGoogleReviews(): Promise<{
  reviews: Testimonial[];
  overallRating: number;
  totalRatings: number;
  placeId: string;
} | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Env vars not configured yet — graceful fallback, no error
    return null;
  }

  try {
    const url = `${PLACES_API_BASE}/${placeId}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["google-reviews"],
      },
    });

    if (!res.ok) {
      console.error(
        `[google-places] Places API responded with ${res.status}: ${await res.text()}`
      );
      return null;
    }

    const data: GooglePlacesResult = await res.json();

    if (!data.reviews || data.reviews.length === 0) {
      return null;
    }

    // Filter out reviews with no text — they add no value on the website
    const reviewsWithText = data.reviews.filter(
      (r) => (r.text?.text || r.originalText?.text || "").trim().length > 0
    );

    return {
      reviews: reviewsWithText.map(mapGoogleReviewToTestimonial),
      overallRating: data.rating ?? 0,
      totalRatings: data.userRatingCount ?? 0,
      placeId,
    };
  } catch (err) {
    console.error("[google-places] Failed to fetch reviews:", err);
    return null;
  }
}

/**
 * Cached version of the Google Places fetch.
 * Revalidates every 24 hours via ISR.
 * Call `revalidateTag('google-reviews')` to force-refresh on demand.
 */
export const fetchGoogleReviews = unstable_cache(
  _fetchGoogleReviews,
  ["google-reviews"],
  { revalidate: REVALIDATE_SECONDS, tags: ["google-reviews"] }
);
