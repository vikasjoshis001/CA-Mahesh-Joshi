import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ArrowRight, Phone } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { FAQTabs } from "@/components/faq";
import { faqs } from "@/lib/data/faqs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | CA Mahesh Joshi — Income Tax, GST & Audit",
  description:
    "Answers to the most common questions about income tax filing, GST registration, tax audits, and CA services in Pune — from a practising Chartered Accountant.",
  alternates: { canonical: `${siteConfig.url}/faq` },
  openGraph: {
    title: "FAQs — Mahesh Joshi & Associates | CA in Pune",
    description:
      "Clear answers to your income tax, GST, audit, and business compliance questions from CA Mahesh M. Joshi, Wakad, Pune.",
    url: `${siteConfig.url}/faq`,
  },
};

// ── FAQPage JSON-LD — triggers rich snippet accordion in Google Search ─────────
function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FAQPage() {
  return (
    <>
      <FAQSchema />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <HelpCircle className="h-3.5 w-3.5" />
                {faqs.length} Questions Answered
              </div>
              <SectionHeading
                title="Frequently Asked Questions"
                subtitle="Clear, CA-authored answers to the most common questions on income tax, GST, audits, and business compliance in India."
                align="left"
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── FAQ Accordion ─────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Left: accordion */}
            <div className="lg:col-span-2">
              <FadeIn>
                <FAQTabs />
              </FadeIn>
            </div>

            {/* Right: sticky sidebar */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <FadeIn>
                {/* Still have questions CTA */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    Didn&apos;t find your answer?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    Every tax situation is unique. Speak directly with CA Mahesh
                    M. Joshi for a personalised answer — no generic advice.
                  </p>
                  <div className="space-y-3">
                    <a href={`tel:${siteConfig.links.phone[0]}`}>
                      <button className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                        <Phone className="h-4 w-4" />
                        Call Now
                      </button>
                    </a>
                    <Link href="/contact">
                      <button className="w-full flex items-center justify-center gap-2 border border-border text-foreground font-medium px-4 py-2.5 mt-2 rounded-lg hover:bg-muted transition-colors text-sm">
                        Send a Message
                        <ArrowRight className="h-4 w-4"/>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Quick links */}
                <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-bold text-foreground text-base mb-4">
                    Explore More
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    {[
                      { label: "Our Services", href: "/services" },
                      { label: "Blog — Tax Guides", href: "/blog" },
                      { label: "News & Updates", href: "/news" },
                      { label: "About CA Mahesh Joshi", href: "/about" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category count */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-bold text-foreground text-base mb-4">
                    Topics Covered
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {(
                      [
                        ["Income Tax", "bg-blue-600"],
                        ["GST", "bg-orange-500"],
                        ["Audit", "bg-purple-600"],
                        ["Business", "bg-rose-600"],
                        ["CA Services", "bg-emerald-600"],
                      ] as [string, string][]
                    ).map(([cat, colour]) => (
                      <li key={cat} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <span className={`inline-block w-2 h-2 rounded-full ${colour}`} />
                          {cat}
                        </span>
                        <span className="font-medium text-foreground tabular-nums">
                          {faqs.filter((f) => f.category === cat).length} Q&amp;A
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="py-12 border-t border-border bg-muted/30">
        <Container>
          <FadeIn>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to Get Your Taxes Right?
              </h2>
              <p className="text-white/80 mb-7 max-w-xl mx-auto text-base">
                CA Mahesh M. Joshi offers one-on-one consultations for individuals
                and businesses in Pune &amp; Maharashtra.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href={`tel:${siteConfig.links.phone[0]}`}>
                  <button className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm">
                    <Phone className="h-4 w-4" />
                    {siteConfig.links.phone[0]}
                  </button>
                </a>
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm">
                    Book a Free Consultation
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
