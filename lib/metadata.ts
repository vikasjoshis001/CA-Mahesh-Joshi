import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// Base URL - Update this with your actual domain when deployed
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://camaheshjoshi.com";

// Default Open Graph image - You can replace this with an actual image later
const ogImage = `${baseUrl}/og-image.jpg`;

// Common keywords for all pages
const commonKeywords = [
  "CA Wakad",
  "Chartered Accountant Wakad",
  "CA Pune",
  "Mahesh Joshi CA",
  "Tax Consultant Wakad",
  "GST Services Wakad",
  "Audit Services Pune",
  "Pimpri Chinchwad CA"
];

// Generate metadata for each page
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = ogImage,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = path === "" ? title : `${title} | ${siteConfig.name}`;
  const allKeywords = [...commonKeywords, ...keywords].join(", ");

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: "Mahesh M. Joshi (ACA)" }],
    creator: siteConfig.name,
    publisher: siteConfig.name,

    // Open Graph
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@camaheshjoshi", // Update with actual Twitter handle if available
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verification (add these when you set up Google Search Console)
    verification: {
      google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
  };
}

// Home page metadata
export const homeMetadata = generatePageMetadata({
  title: "Mahesh M. Joshi (ACA) - Chartered Accountant in Wakad | Tax, GST, Audit Services",
  description: "Expert CA services in Wakad, Pune. Specializing in Income Tax filing, GST returns, Statutory Audit, Business setup and Compliance. Call +91 9130601393 for consultation.",
  keywords: [
    "Income Tax Filing",
    "GST Returns",
    "Company Registration",
    "Business Setup Wakad",
    "Accounting Services",
    "Tax Planning",
    "Financial Consulting"
  ],
  path: "",
});

// About page metadata
export const aboutMetadata = generatePageMetadata({
  title: "About Mahesh M. Joshi (ACA) - Qualified Chartered Accountant",
  description: "CA qualified Chartered Accountant with expertise in taxation, audit, and business advisory. Expert in Income Tax, GST, and corporate compliance. Trusted by clients across various industries.",
  keywords: [
    "ACA Qualified",
    "ICAI Registered",
    "Professional Accountant",
    "Tax Expert",
    "Business Advisor"
  ],
  path: "/about",
});

// Services page metadata
export const servicesMetadata = generatePageMetadata({
  title: "CA Services - Income Tax, GST, Audit, Business Setup",
  description: "Comprehensive CA services: Income Tax filing & planning, GST registration & returns, Statutory audit, Company registration, Accounting services, and Compliance management. Professional and timely service guaranteed.",
  keywords: [
    "CA Services",
    "Professional Services",
    "Tax Services",
    "Audit Services",
    "Business Registration",
    "Compliance Services",
    "ROC Filing"
  ],
  path: "/services",
});

// Contact page metadata
export const contactMetadata = generatePageMetadata({
  title: "Contact CA Mahesh Joshi | Office in Wakad, Pimpri Chinchwad",
  description: "Get in touch with CA Mahesh Joshi for professional CA services. Office: ANP Landmark, Bhumkar Chowk, Wakad. Phone: +91 9130601393, Email: camaheshjoshi25@gmail.com. Available Mon-Sat.",
  keywords: [
    "Contact CA",
    "CA Office Wakad",
    "Wakad Office",
    "ANP Landmark",
    "Bhumkar Chowk",
    "CA Consultation"
  ],
  path: "/contact",
});
