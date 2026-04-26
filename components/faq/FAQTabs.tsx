"use client";

import { useState } from "react";
import { FAQAccordion } from "./FAQAccordion";
import { faqs, faqCategories } from "@/lib/data/faqs";
import type { FAQCategory } from "@/lib/data/faqs";
import { cn } from "@/lib/utils";

export function FAQTabs() {
  const [active, setActive] = useState<FAQCategory>("All");

  const filtered =
    active === "All" ? faqs : faqs.filter((f) => f.category === active);

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {faqCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              active === cat
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 opacity-60 text-xs">
                ({faqs.filter((f) => f.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <FAQAccordion faqs={filtered} />
    </div>
  );
}
