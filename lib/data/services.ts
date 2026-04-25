import { Service } from "@/types";

/**
 * Services data
 * Icons from lucide-react will be used
 */
export const services: Service[] = [
  {
    id: "income-tax",
    title: "Income Tax Services",
    description: "Comprehensive income tax filing, planning, and advisory services for individuals and businesses.",
    icon: "FileText",
    features: [
      "ITR Filing (All Categories)",
      "Tax Planning & Optimization",
      "Tax Notice Handling",
      "Refund Processing",
    ],
  },
  {
    id: "gst-services",
    title: "GST Services",
    description: "Complete GST registration, filing, and compliance management services.",
    icon: "Receipt",
    features: [
      "GST Registration",
      "GST Return Filing",
      "GST Advisory",
      "Input Tax Credit Management",
    ],
  },
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    description: "Professional audit services ensuring compliance and financial accuracy.",
    icon: "Shield",
    features: [
      "Statutory Audit",
      "Tax Audit",
      "Internal Audit",
      "Stock Audit",
    ],
  },
  {
    id: "business-setup",
    title: "Business Setup",
    description: "End-to-end business registration and setup services.",
    icon: "Building",
    features: [
      "Company Registration",
      "Partnership Firm Registration",
      "LLP Registration",
      "Startup Consulting",
    ],
  },
  {
    id: "accounting",
    title: "Accounting Services",
    description: "Professional bookkeeping and accounting services for businesses.",
    icon: "Calculator",
    features: [
      "Bookkeeping",
      "Financial Statements",
      "MIS Reports",
      "Payroll Management",
    ],
  },
  {
    id: "compliance",
    title: "Compliance Management",
    description: "Complete compliance and regulatory filing services.",
    icon: "ClipboardCheck",
    features: [
      "ROC Filings",
      "Annual Compliance",
      "TDS Return Filing",
      "License Renewals",
    ],
  },
];
