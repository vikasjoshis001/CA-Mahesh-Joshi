import { SiteConfig } from "@/types";

/**
 * Site configuration
 * Updated with client details from visiting card
 */
export const siteConfig: SiteConfig = {
  name: "Mahesh Joshi & Associates",
  title: "Mahesh M. Joshi (ACA) - Chartered Accountant | Mahesh Joshi & Associates",
  description: "Professional Chartered Accountant services in Wakad, Pimpri Chinchwad. Expert in Income Tax, GST, Audit, Business Setup, and Compliance Management.",
  url: "https://www.camaheshjoshi.com",
  ogImage: "/images/og-image.jpg",
  links: {
    phone: ["+91 9130601393"],
    email: "camaheshjoshi25@gmail.com",
    whatsapp: "919130601393", // Format: country code + number (no spaces or +)
    address: "607, 6th Floor, ANP Landmark, Near Bhumkar Chowk, Bhumkar Nagar, Wakad, Pimpri Chinchwad, Maharashtra - 411 057",
  },
};

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const socialLinks = {
  // Optional: Add social media links if available
  linkedin: "",
  facebook: "",
  twitter: "",
  instagram: "",
};
