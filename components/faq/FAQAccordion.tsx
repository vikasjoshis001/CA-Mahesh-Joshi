"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/lib/data/faqs";

interface Props {
  faqs: FAQ[];
  /** When true, shows only a subset with no category filter — for home page widget */
  compact?: boolean;
}

export function FAQAccordion({ faqs, compact = false }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(compact ? null : 0);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={cn("bg-card transition-colors", isOpen && "bg-primary/[0.03]")}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-semibold text-base leading-snug transition-colors",
                  isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                )}
              >
                {faq.question}
              </span>
              <span className="mt-0.5 shrink-0 text-muted-foreground">
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
