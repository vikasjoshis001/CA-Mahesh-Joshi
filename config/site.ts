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
  ogImage: "/og-image.jpg",
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
  // TODO: Uncomment when Blog is ready
  // { name: "Blog", href: "/blog" },
  // TODO: Uncomment when News is ready
  // { name: "News", href: "/news" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
  {
    name: "Tools",
    href: "#",
    children: [
      { name: "EMI Calculator", href: "/tools/emi-calculator" },
      { name: "GST Calculator", href: "/tools/gst-calculator" },
      { name: "Income Tax Calculator", href: "/tools/income-tax-calculator" },
      { name: "Salary Tax Calculator", href: "/tools/salary-tax-calculator" },
    ]
  },
];

export const calculatorTools = [
  { name: "EMI Calculator", href: "/tools/emi-calculator", description: "Calculate loan EMI" },
  { name: "GST Calculator", href: "/tools/gst-calculator", description: "Calculate GST amount" },
  { name: "Income Tax Calculator", href: "/tools/income-tax-calculator", description: "Compare old vs new tax regime" },
  { name: "Salary Tax Calculator", href: "/tools/salary-tax-calculator", description: "Calculate salary tax" },
];

export const socialLinks = {
  youtube: "https://www.youtube.com/@CAMaheshJoshi",
  instagram: "https://www.instagram.com/ca_maheshjoshi",
  twitter: "https://x.com/ca_maheshjoshi",
  linkedin: "",
  facebook: "",
};
