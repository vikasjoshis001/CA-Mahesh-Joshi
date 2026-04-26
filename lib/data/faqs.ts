export interface FAQ {
  question: string;
  answer: string;
  category: "Income Tax" | "GST" | "Audit" | "Business" | "CA Services";
}

export const faqs: FAQ[] = [
  // ── Income Tax ────────────────────────────────────────────────────────────
  {
    category: "Income Tax",
    question: "What is the last date to file an income tax return (ITR)?",
    answer:
      "For individuals and HUFs not requiring a tax audit, the due date is 31 July of the assessment year (e.g., 31 July 2025 for FY 2024-25). For taxpayers whose accounts require a tax audit under Section 44AB, the due date is 31 October. CBDT sometimes extends these deadlines — always check the latest notifications on incometax.gov.in.",
  },
  {
    category: "Income Tax",
    question: "Which ITR form should I file?",
    answer:
      "ITR-1 (Sahaj): Salaried individuals with income up to ₹50 lakh, one house property, and no capital gains. ITR-2: Individuals/HUFs with capital gains, multiple house properties, or foreign income/assets, but no business income. ITR-3: Individuals/HUFs with income from business or profession. ITR-4 (Sugam): Individuals/HUFs/firms opting for presumptive taxation under Sections 44AD, 44ADA, or 44AE. Filing the wrong form makes your return defective — the department issues a notice under Section 139(9).",
  },
  {
    category: "Income Tax",
    question: "What happens if I miss the ITR filing deadline?",
    answer:
      "You can still file a belated return under Section 139(4) up to 31 December of the assessment year. A late filing fee applies — ₹1,000 if total income is up to ₹5 lakh, and ₹5,000 if income exceeds ₹5 lakh. Additionally, you lose the ability to carry forward business losses and capital losses. If your income is below the basic exemption limit, there is no late filing fee.",
  },
  {
    category: "Income Tax",
    question: "Is it mandatory to file ITR if my income is below the taxable limit?",
    answer:
      "Technically, you are not required to file if income is below ₹2.5 lakh (old regime) or ₹4 lakh (new regime). However, filing is mandatory if you have foreign assets or foreign income, if TDS has been deducted and you want a refund, or if you have made high-value transactions that appear in AIS (like large cash deposits or property purchases). Filing also creates an official income record useful for loans and visa applications.",
  },
  {
    category: "Income Tax",
    question: "What is Form 26AS and why should I check it before filing ITR?",
    answer:
      "Form 26AS is a consolidated tax credit statement maintained by the Income Tax Department. It shows TDS deducted by employers and other deductors on your behalf, advance tax and self-assessment tax payments you have made, and high-value transactions reported by banks and registrars. If there is a mismatch between your ITR and Form 26AS or AIS (Annual Information Statement), the system auto-generates a demand notice under Section 143(1). Always download Form 26AS and AIS from the income tax portal before filing.",
  },
  {
    category: "Income Tax",
    question: "What is the difference between the new tax regime and the old tax regime?",
    answer:
      "The new tax regime (default since FY 2023-24) offers lower slab rates — nil tax up to ₹4 lakh, 5% from ₹4–8 lakh, 10% from ₹8–12 lakh, and so on — with a Section 87A rebate that makes income up to ₹12 lakh effectively tax-free (₹12.75 lakh for salaried with ₹75,000 standard deduction). However, it does not allow deductions like 80C, 80D, HRA, or home loan interest. The old regime has higher slab rates but allows all deductions. The old regime is beneficial only if your combined deductions exceed ₹5–6 lakh.",
  },

  // ── GST ───────────────────────────────────────────────────────────────────
  {
    category: "GST",
    question: "When is GST registration mandatory?",
    answer:
      "GST registration is mandatory when your annual aggregate turnover exceeds ₹40 lakh (for goods suppliers) or ₹20 lakh (for service providers) in Maharashtra. It is also immediately mandatory — regardless of turnover — if you make inter-state supplies, sell through e-commerce platforms like Amazon or Flipkart, or are liable to pay GST under the reverse charge mechanism. Voluntary registration is advisable for B2B businesses even below the threshold, so your clients can claim Input Tax Credit.",
  },
  {
    category: "GST",
    question: "What are the GST return filing due dates?",
    answer:
      "For monthly filers: GSTR-1 (outward supplies) by the 11th, and GSTR-3B (summary return with tax payment) by the 20th of the following month. For QRMP taxpayers (turnover up to ₹5 crore who have opted in): GSTR-1 quarterly by the 13th, and GSTR-3B by the 22nd of the month following the quarter (Maharashtra is a Category I state). The Annual Return GSTR-9 is due by 31 December. Late filing attracts ₹50/day penalty plus 18% per annum interest on unpaid tax.",
  },
  {
    category: "GST",
    question: "What is Input Tax Credit (ITC) and can every business claim it?",
    answer:
      "Input Tax Credit allows you to deduct the GST paid on business purchases from the GST collected on your sales — so you pay tax only on the value you add. To claim ITC, the supplier must have filed their GSTR-1 (their invoice must appear in your GSTR-2B), you must have received the goods or services, and you must have paid the supplier within 180 days. ITC cannot be claimed on certain blocked items under Section 17(5) — including motor vehicles (in most cases), food and beverages, club memberships, and construction of immovable property.",
  },
  {
    category: "GST",
    question: "What is e-invoicing and does it apply to my business?",
    answer:
      "E-invoicing requires businesses to register each B2B and B2G invoice with the government's Invoice Registration Portal (IRP) before sharing it with the buyer. The IRP validates the invoice and returns an IRN (Invoice Reference Number) and QR code that must appear on the invoice. E-invoicing is currently mandatory for all taxpayers whose aggregate turnover exceeded ₹5 crore in any previous financial year. Benefits include auto-population of GSTR-1 and e-way bill, reducing duplicate data entry.",
  },
  {
    category: "GST",
    question: "What is the Composition Scheme under GST?",
    answer:
      "The Composition Scheme is a simplified GST option for small businesses with annual turnover up to ₹1.5 crore (₹75 lakh for most special category states; ₹50 lakh for service providers under Section 10(5)). Composition dealers pay a flat tax rate (1% for traders/manufacturers, 6% for restaurants, 6% for service providers) on turnover, file a simple quarterly return (CMP-08) and annual return (GSTR-4), and cannot charge GST on invoices to customers. The trade-off: they cannot claim ITC on purchases, and their buyers cannot claim ITC on purchases from them — making it unsuitable for B2B businesses.",
  },

  // ── Audit ─────────────────────────────────────────────────────────────────
  {
    category: "Audit",
    question: "Who is required to get a tax audit done?",
    answer:
      "A tax audit under Section 44AB is mandatory for: (1) Businesses with total sales/turnover above ₹1 crore (or ₹10 crore if at least 95% of transactions are digital). (2) Professionals (doctors, lawyers, CAs, engineers, etc.) with gross receipts above ₹50 lakh. (3) Businesses or professionals who opt out of presumptive taxation under Sections 44AD or 44ADA by declaring income below the prescribed percentage — regardless of turnover amount. The audit report (Form 3CB + 3CD) must be filed by 30 September of the assessment year.",
  },
  {
    category: "Audit",
    question: "What is the difference between a statutory audit and a tax audit?",
    answer:
      "A statutory audit under the Companies Act is mandatory for all registered companies, conducted by a Chartered Accountant appointed by shareholders, and covers the true and fair view of financial statements. A tax audit under Section 44AB of the Income Tax Act is a separate requirement for businesses/professionals above prescribed turnover thresholds, conducted by a CA, and focuses on whether income has been correctly computed as per the Income Tax Act. A company may require both audits — the statutory audit for Companies Act compliance and the tax audit for Income Tax Act compliance.",
  },
  {
    category: "Audit",
    question: "What is Section 43B(h) and how does it affect my business?",
    answer:
      "Section 43B(h), introduced by the Finance Act 2023, disallows the deduction of expenses payable to MSME-registered suppliers if not paid within 15 days (where there is no written agreement) or 45 days (where there is a written agreement under the MSMED Act) of receiving the goods or services. The expense is allowed as a deduction only in the year of actual payment, not accrual. Auditors now verify and report MSME payment compliance in Clause 44 of Form 3CD. Businesses should maintain records of their vendors' MSME (Udyam) registration status.",
  },

  // ── Business ──────────────────────────────────────────────────────────────
  {
    category: "Business",
    question: "What is the difference between a Private Limited Company and an LLP?",
    answer:
      "A Private Limited Company has shareholders and directors, can issue equity shares, is preferred by investors and VCs, and has higher compliance requirements (board meetings, annual filings, ROC requirements). An LLP (Limited Liability Partnership) has partners, cannot issue equity shares to investors, has simpler compliance (two annual filings — Form 11 and Form 8), and is well-suited for professional services firms or small businesses where external equity funding is not needed. Both provide limited liability protection to their members.",
  },
  {
    category: "Business",
    question: "What registrations does a new business in Pune need?",
    answer:
      "The core registrations depend on your structure, but most Pune businesses need: (1) Company/LLP incorporation on MCA21 (for entities other than sole proprietors). (2) PAN and TAN — issued automatically during company incorporation via SPICe+. (3) GST registration if turnover exceeds the threshold or you are in B2B supply. (4) Udyam (MSME) registration if you fall within micro/small/medium limits — free and beneficial. (5) Professional Tax registration under the Maharashtra Shops and Establishments Act. (6) Shop and Establishment registration with PMC or PCMC. (7) IEC if you plan to export services or goods.",
  },
  {
    category: "Business",
    question: "Is it mandatory to maintain books of accounts?",
    answer:
      "Under Section 44AA, books of accounts are mandatory for: (1) Specified professionals (doctors, lawyers, CAs, engineers, etc.) if gross receipts exceed ₹1.5 lakh in any of the 3 preceding years. (2) Business entities if turnover exceeds ₹25 lakh or income exceeds ₹2.5 lakh in any of the 3 preceding years. Businesses and professionals opting for presumptive taxation under Sections 44AD or 44ADA are exempt from maintaining detailed books, provided they declare income at or above the prescribed percentage. All companies and LLPs must maintain proper books of accounts regardless of turnover.",
  },

  // ── CA Services ───────────────────────────────────────────────────────────
  {
    category: "CA Services",
    question: "What services does a Chartered Accountant provide?",
    answer:
      "A practising CA provides: income tax return filing and tax planning; GST registration, monthly return filing, and reconciliation; tax audit under Section 44AB; statutory audit for companies; company and LLP incorporation; business advisory and financial projections; TDS compliance and return filing; representation before the Income Tax department and ITAT for notices and appeals; MCA annual compliance for companies; and FEMA/RBI compliance for businesses with foreign transactions.",
  },
  {
    category: "CA Services",
    question: "When should I consult a CA instead of filing taxes myself?",
    answer:
      "You should consult a CA if: you have income from multiple sources (salary + freelance + capital gains + rent); you received an income tax notice; you have sold property, shares, or mutual funds during the year; you own or are a director of a company; your business turnover is approaching the tax audit threshold; you are starting a new business and need to decide on structure and registrations; you have foreign income, foreign assets, or made foreign remittances; or you want to legally minimise your tax liability through proper planning.",
  },
  {
    category: "CA Services",
    question: "How do I respond to an income tax notice?",
    answer:
      "First, verify the notice is genuine by checking the DIN (Document Identification Number) on the income tax portal under 'Verify Notice/Order'. Identify the section under which it is issued — each notice type has a different response procedure and deadline. For a simple 143(1) demand, you can pay or file a rectification online. For a scrutiny notice under 143(2) or a reassessment notice under 148, engage a CA immediately — these require detailed written responses through the e-Proceedings portal and poorly drafted responses can lead to large tax additions.",
  },
  {
    category: "CA Services",
    question: "What documents should I keep ready for ITR filing?",
    answer:
      "Keep ready: Form 16 (from employer) and Form 16A (TDS certificates from banks, clients); Form 26AS and AIS downloaded from the income tax portal; bank statements for all accounts for the full year; interest certificates from banks for FD interest; capital gain statements from your broker or mutual fund (Consolidated Account Statement from CAMS/KFintech); home loan interest certificate from your lender; investment proofs for 80C (LIC premium receipts, PPF passbook, ELSS statements); and rent receipts or rent agreement for HRA claims.",
  },
];

export const faqCategories = [
  "All",
  "Income Tax",
  "GST",
  "Audit",
  "Business",
  "CA Services",
] as const;

export type FAQCategory = (typeof faqCategories)[number];
