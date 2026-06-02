import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Tax Calculator - Calculate Take Home Salary After Income Tax | In Hand Salary Calculator",
  description: "Free salary tax calculator to calculate your take home salary after income tax deductions. Calculate in-hand salary from CTC with HRA, PF, professional tax, and Section 80C deductions. Get monthly and annual salary breakdown.",
  keywords: [
    "salary tax calculator",
    "take home salary calculator",
    "in hand salary calculator",
    "salary calculator India",
    "CTC to in hand calculator",
    "net salary calculator",
    "salary after tax calculator",
    "monthly salary calculator",
    "income tax on salary",
    "salary deduction calculator",
    "HRA calculator",
    "80C deduction calculator",
    "professional tax calculator",
    "gross salary to net salary",
    "calculate take home pay",
    "CA Mahesh Joshi",
    "Wakad Pune"
  ],
  openGraph: {
    title: "Salary Tax Calculator - Calculate Your Take Home Salary",
    description: "Calculate your take home salary after all tax deductions. Free online salary calculator with detailed breakdown.",
    type: "website",
    url: "https://camaheshjoshi.com/tools/salary-tax-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Tax Calculator - Take Home Salary Calculator",
    description: "Calculate your net take home salary after income tax and other deductions. Free online calculator.",
  },
  alternates: {
    canonical: "https://camaheshjoshi.com/tools/salary-tax-calculator",
  },
};

export default function SalaryTaxCalculatorLayout({
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
            "name": "Salary Tax Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Free online salary tax calculator to calculate take home salary after income tax deductions. Calculate in-hand salary with complete breakdown of all components including HRA, professional tax, and Section 80C deductions.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "380"
            },
            "featureList": [
              "Calculate take home salary",
              "Monthly and annual breakdown",
              "Include HRA deductions",
              "Section 80C tax savings",
              "Professional tax calculation",
              "Standard deduction",
              "Detailed salary components"
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
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How to calculate take home salary from CTC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Take home salary = Gross Salary - Income Tax - Professional Tax - Other Deductions. First, calculate gross salary (Basic + HRA + Allowances). Then subtract standard deduction, Section 80C deductions to get taxable income. Calculate income tax on this amount, then subtract tax and professional tax from gross salary to get take home pay."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between gross salary and net salary?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gross salary is the total salary before any deductions (Basic + HRA + Allowances). Net salary (or take home salary) is what you receive in hand after all deductions like income tax, professional tax, PF, etc. Net Salary = Gross Salary - All Deductions."
                }
              },
              {
                "@type": "Question",
                "name": "What is standard deduction on salary?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Standard deduction is a flat deduction of ₹50,000 per year available to all salaried employees. It is deducted from gross salary to arrive at taxable income, reducing your tax liability by approximately ₹5,000-15,000 per year depending on your tax bracket."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
