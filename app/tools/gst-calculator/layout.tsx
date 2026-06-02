import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GST Calculator Online - Calculate GST, CGST, SGST, IGST | CA Mahesh Joshi",
  description: "Free online GST calculator for India. Calculate GST amount, CGST, SGST, and IGST instantly. Add or remove GST from your invoice amount. Easy GST calculation tool for businesses and individuals.",
  keywords: [
    "GST calculator",
    "GST calculator India",
    "calculate GST online",
    "CGST SGST calculator",
    "IGST calculator",
    "GST calculation tool",
    "add GST calculator",
    "remove GST calculator",
    "GST amount calculator",
    "GST percentage calculator",
    "18% GST calculator",
    "GST calculator with reverse calculation",
    "CA Mahesh Joshi",
    "Wakad Pune"
  ],
  openGraph: {
    title: "GST Calculator - Calculate GST, CGST, SGST, IGST Online",
    description: "Calculate GST amount instantly. Free online calculator for GST calculation with CGST, SGST, and IGST breakdown.",
    type: "website",
    url: "https://camaheshjoshi.com/tools/gst-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "GST Calculator - Calculate GST Online",
    description: "Calculate GST, CGST, SGST, and IGST instantly. Free online GST calculator for India.",
  },
  alternates: {
    canonical: "https://camaheshjoshi.com/tools/gst-calculator",
  },
};

export default function GSTCalculatorLayout({
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
            "name": "GST Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Free online GST calculator for India. Calculate GST amount, CGST, SGST, and IGST with instant results. Support for both inclusive and exclusive GST calculation.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "320"
            },
            "featureList": [
              "Calculate CGST and SGST",
              "Calculate IGST",
              "Add GST to amount",
              "Remove GST from amount",
              "Support all GST rates"
            ],
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
