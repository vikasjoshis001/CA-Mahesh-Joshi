import { siteConfig } from "@/config/site";

// Local Business Schema for Google Rich Snippets
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://camaheshjoshi.com",
    "name": siteConfig.name,
    "alternateName": "CA Mahesh Joshi",
    "description": siteConfig.description,
    "url": "https://camaheshjoshi.com",
    "telephone": siteConfig.links.phone[0],
    "email": siteConfig.links.email,
    "priceRange": "$$",
    "image": "https://camaheshjoshi.com/logo.png",

    "address": {
      "@type": "PostalAddress",
      "streetAddress": "607, 6th Floor, ANP Landmark, Near Bhumkar Chowk, Bhumkar Nagar, Wakad",
      "addressLocality": "Pimpri Chinchwad",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },

    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.6049",
      "longitude": "73.7674"
    },

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],

    "sameAs": [
      // Add social media links here when available
      // "https://www.facebook.com/camaheshjoshi",
      // "https://www.linkedin.com/in/camaheshjoshi",
    ],

    "areaServed": {
      "@type": "City",
      "name": "Pune"
    },

    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "CA Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Income Tax Filing & Planning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "GST Registration & Returns"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Statutory Audit"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Registration & Setup"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Accounting & Bookkeeping"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Compliance Management"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Person Schema for Mahesh Joshi
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mahesh M. Joshi",
    "givenName": "Mahesh",
    "familyName": "Joshi",
    "honorificSuffix": "ACA",
    "jobTitle": "Chartered Accountant",
    "worksFor": {
      "@type": "Organization",
      "name": siteConfig.name
    },
    "telephone": siteConfig.links.phone[0],
    "email": siteConfig.links.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Wakad",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
