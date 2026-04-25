/**
 * Application constants
 */

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  required: "This field is required",
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  minLength: (length: number) => `Minimum ${length} characters required`,
  maxLength: (length: number) => `Maximum ${length} characters allowed`,
};

// Contact form subject options
export const SERVICE_OPTIONS = [
  "Income Tax Filing",
  "GST Registration & Filing",
  "Audit Services",
  "Business Registration",
  "Tax Planning",
  "Accounting Services",
  "Other",
];

// Office hours
export const OFFICE_HOURS = {
  weekdays: "Monday - Friday: 10:00 AM - 6:00 PM",
  saturday: "Saturday: 10:00 AM - 2:00 PM",
  sunday: "Sunday: Closed",
};
