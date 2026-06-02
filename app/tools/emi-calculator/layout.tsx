import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Calculator Online - Calculate Home Loan, Car Loan, Personal Loan EMI | CA Mahesh Joshi",
  description: "Free online EMI calculator to calculate Equated Monthly Installment for home loans, car loans, personal loans. Get instant EMI calculation with detailed breakdown of principal and interest. Calculate your loan EMI in seconds.",
  keywords: [
    "EMI calculator",
    "loan EMI calculator",
    "home loan EMI calculator",
    "car loan calculator",
    "personal loan EMI",
    "EMI calculation online",
    "loan calculator India",
    "calculate EMI",
    "monthly EMI calculator",
    "loan EMI calculator with interest",
    "CA Mahesh Joshi",
    "Wakad Pune"
  ],
  openGraph: {
    title: "EMI Calculator - Calculate Loan EMI Online",
    description: "Calculate your loan EMI instantly with our free online calculator. Get detailed breakdown of principal and interest payments.",
    type: "website",
    url: "https://camaheshjoshi.com/tools/emi-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMI Calculator - Calculate Loan EMI Online",
    description: "Calculate your loan EMI instantly. Free online calculator for home loans, car loans, and personal loans.",
  },
  alternates: {
    canonical: "https://camaheshjoshi.com/tools/emi-calculator",
  },
};

export default function EMICalculatorLayout({
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
            "name": "EMI Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Free online EMI calculator to calculate Equated Monthly Installment for home loans, car loans, and personal loans with detailed breakdown.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "250"
            },
            "provider": {
              "@type": "ProfessionalService",
              "name": "Mahesh Joshi & Associates",
              "url": "https://camaheshjoshi.com",
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
    </>
  );
}
