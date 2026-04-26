import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { FAQAccordion } from "@/components/faq";
import { faqs } from "@/lib/data/faqs";

// Show one question from each category — a taster that drives to /faq
const PREVIEW_QUESTIONS = [
  "What is the last date to file an income tax return (ITR)?",
  "When is GST registration mandatory?",
  "Who is required to get a tax audit done?",
  "What registrations does a new business in Pune need?",
  "When should I consult a CA instead of filing taxes myself?",
];

const previewFaqs = PREVIEW_QUESTIONS.map(
  (q) => faqs.find((f) => f.question === q)!
);

export function HomeFAQ() {
  return (
    <section className="py-16 md:py-24 bg-muted/40 border-y border-border">
      <Container>
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <HelpCircle className="h-3.5 w-3.5" />
                Common Questions
              </div>
              <SectionHeading
                title="Frequently Asked Questions"
                subtitle="Quick answers to what clients ask us most often."
                align="left"
                className="mb-0"
              />
            </div>
            <Link
              href="/faq"
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View all {faqs.length} questions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn>
          <FAQAccordion faqs={previewFaqs} compact />
        </FadeIn>

        <FadeIn>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-muted transition-colors text-sm"
            >
              See all frequently asked questions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
