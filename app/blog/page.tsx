import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, Tag, ArrowRight, PenLine } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { getAllPostsMeta, getAllCategories, formatDate } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const revalidate = 86400; // revalidate daily

export const metadata: Metadata = {
  title: "Blog | Tax & Finance Insights for Businesses in Pune",
  description:
    "Practical articles on income tax, GST, audits, and business setup — written by CA Mahesh M. Joshi for individuals and businesses in Pune, Maharashtra.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog — Mahesh Joshi & Associates",
    description:
      "CA-authored articles on tax planning, GST compliance, audits, and business registration in Pune.",
    url: `${siteConfig.url}/blog`,
  },
};

// ── Category badge colours ─────────────────────────────────────────────────────
const CATEGORY_COLOURS: Record<string, string> = {
  "Income Tax":        "bg-blue-600 text-white",
  "GST":               "bg-orange-500 text-white",
  "Tax Planning":      "bg-emerald-600 text-white",
  "Audit":             "bg-purple-600 text-white",
  "Business Advisory": "bg-rose-600 text-white",
  "General":           "bg-gray-600 text-white",
};

function categoryColour(cat: string): string {
  return CATEGORY_COLOURS[cat] ?? CATEGORY_COLOURS["General"];
}

// ── JSON-LD ────────────────────────────────────────────────────────────────────
function BlogListingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Mahesh Joshi & Associates — Blog",
    description:
      "CA-authored articles on income tax, GST, audits, and business advisory for Pune and Maharashtra.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();
  const [featured, ...rest] = posts;

  return (
    <>
      <BlogListingSchema />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <PenLine className="h-3.5 w-3.5" />
                Written by a practising CA
              </div>
              <SectionHeading
                title="Blog"
                subtitle="Practical insights on income tax, GST compliance, audits, and business setup — written for individuals and businesses in Pune & Maharashtra."
                align="left"
              />
              {/* Category pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className={`text-xs font-medium px-3 py-1 rounded-full ${categoryColour(cat)}`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No articles yet — check back soon.</p>
            </div>
          ) : (
            <div className="space-y-14">

              {/* ── Featured post ─────────────────────────────────────── */}
              {featured && (
                <FadeIn>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto min-h-[280px] overflow-hidden">
                      {featured.image ? (
                        <Image
                          src={featured.image}
                          alt={featured.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-white/40" />
                        </div>
                      )}
                      {/* Featured badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-md tracking-wide uppercase">
                          ★ Featured
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColour(featured.category)}`}>
                        {featured.category}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatDate(featured.date)}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {featured.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                          Read article <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              )}

              {/* ── Rest of posts grid ────────────────────────────────── */}
              {rest.length > 0 && (
                <FadeIn>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {rest.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow duration-300"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-48 overflow-hidden">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.imageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/80 to-secondary/60 flex items-center justify-center">
                              <BookOpen className="h-10 w-10 text-white/40" />
                            </div>
                          )}
                        </div>
                        {/* Body */}
                        <div className="flex flex-col flex-1 p-6">
                          <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${categoryColour(post.category)}`}>
                            {post.category}
                          </span>
                          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                            {post.excerpt}
                          </p>
                          {/* Meta footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{formatDate(post.date)}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </FadeIn>
              )}

              {/* ── CTA banner ────────────────────────────────────────── */}
              <FadeIn>
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
                  <Tag className="h-8 w-8 mx-auto mb-4 opacity-80" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Have a Tax or Compliance Question?
                  </h2>
                  <p className="text-white/80 mb-6 max-w-xl mx-auto">
                    Our articles cover the fundamentals — but every business is different. Get
                    personalised advice from a practising CA.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
                  >
                    Book a Free Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>

            </div>
          )}
        </Container>
      </section>
    </>
  );
}
