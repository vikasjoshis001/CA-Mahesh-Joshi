import { HeroSection, ServicesOverview, WhyChooseUs, Testimonials, HomeFAQ, CTASection } from "@/components/home";
import { fetchGoogleReviews } from "@/lib/google-places";

// Revalidate the homepage every 24 hours (ISR).
// This controls how often the Google reviews are refreshed.
// Force-refresh anytime via: revalidateTag('google-reviews')
export const revalidate = 86400;

export default async function Home() {
  const googleData = await fetchGoogleReviews();

  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <Testimonials
        googleReviews={googleData?.reviews}
        overallRating={googleData?.overallRating}
        totalRatings={googleData?.totalRatings}
        placeId={googleData?.placeId ?? process.env.GOOGLE_PLACE_ID}
      />
      <HomeFAQ />
      <CTASection />
    </div>
  );
}
