import { SiteConfig } from "@/types";

/**
 * Site configuration
 * This will be updated with actual client details from visiting card
 */
export const siteConfig: SiteConfig = {
  name: "CA Mahesh Joshi",
  title: "CA Mahesh Joshi - Chartered Accountant",
  description: "Professional Chartered Accountant services including Income Tax, GST, Audit, and Business Consulting.",
  url: "https://camaheshjoshi.com", // Update with actual domain
  ogImage: "/images/og-image.jpg",
  links: {
    phone: ["+91-XXXXXXXXXX"], // To be updated from visiting card
    email: "info@camaheshjoshi.com", // To be updated
    whatsapp: "91XXXXXXXXXX", // To be updated (format: country code + number, no + or spaces)
    address: "Your Office Address Here", // To be updated
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
