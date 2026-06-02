import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Calculator 2026-27 - Old vs New Tax Regime Comparison | Which is Better?",
  description: "Free Income Tax Calculator for AY 2026-27. Compare old vs new tax regime and find which saves you more money. Calculate income tax online with deductions under Section 80C, 80D. Get instant tax calculation for salaried employees.",
  keywords: [
    "income tax calculator",
    "income tax calculator 2026-27",
    "tax calculator India",
    "old vs new tax regime",
    "which tax regime is better",
    "should I choose old or new tax regime",
    "new tax regime calculator",
    "old tax regime calculator",
    "income tax comparison calculator",
    "tax saving calculator",
    "section 80C calculator",
    "income tax slab",
    "calculate income tax online",
    "tax calculator with deductions",
    "AY 2026-27 tax calculator",
    "FY 2025-26 tax calculator",
    "CA Mahesh Joshi",
    "Wakad Pune"
  ],
  openGraph: {
    title: "Income Tax Calculator - Compare Old vs New Tax Regime 2026-27",
    description: "Calculate and compare your income tax under old and new tax regime. Find out which regime saves you more money with our free calculator.",
    type: "website",
    url: "https://camaheshjoshi.com/tools/income-tax-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Income Tax Calculator - Old vs New Regime Comparison",
    description: "Compare old vs new tax regime for AY 2026-27. Calculate your income tax and find the best option.",
  },
  alternates: {
    canonical: "https://camaheshjoshi.com/tools/income-tax-calculator",
  },
};

export default function IncomeTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Income Tax Calculator - Old vs New Regime Comparison",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Free Income Tax Calculator for Assessment Year 2026-27. Compare old and new tax regime to find which saves you more money. Calculate income tax with deductions under Section 80C, 80D, and other exemptions.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "450"
            },
            "featureList": [
              "Compare old vs new tax regime",
              "Calculate income tax for AY 2026-27",
              "Include deductions under Section 80C, 80D",
              "Age-based tax calculation",
              "Instant tax comparison",
              "Recommended regime suggestion"
            ],
            "provider": {
              "@type": "ProfessionalService",
              "name": "Mahesh Joshi & Associates",
              "url": "https://camaheshjoshi.com",
              "telephone": "+91-9130601393",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "607, 6th Floor, ANP Landmark, Near Bhumkar Chowk",
                "addressLocality": "Wakad, Pimpri Chinchwad",
                "addressRegion": "Maharashtra",
                "postalCode": "411057",
                "addressCountry": "IN"
              }
            }
          })
        }}
      />
      {/* FAQ Schema for common questions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Should I apply old or new tax regime?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The choice depends on your deductions. If you have significant deductions under Section 80C, 80D, HRA, etc., the old regime may save more. If you have few deductions, the new regime with lower rates is better. Use our calculator to compare both and find which saves you more money."
                }
              },
              {
                "@type": "Question",
                "name": "Which tax regime is better for salaried employees?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For salaried employees with investments in PPF, ELSS, life insurance (80C deductions) and claiming HRA, the old regime often saves more. However, if you have minimal deductions, the new regime with lower rates and higher basic exemption (₹3 lakh) is better."
                }
              },
              {
                "@type": "Question",
                "name": "What is the basic exemption in new tax regime?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The basic exemption in the new tax regime is ₹3,00,000 for all age groups. Income up to ₹3 lakh is tax-free under the new regime."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
