import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import {
  getAllSlugs,
  getPostBySlug,
  getAllPostsMeta,
  formatDate,
} from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const revalidate = 86400;

// ── Static params ──────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ── Metadata ───────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Mahesh Joshi & Associates`,
    description: post.excerpt,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : [],
    },
  };
}

// ── Category colours (same map as listing page) ────────────────────────────────
const CATEGORY_COLOURS: Record<string, string> = {
  "Income Tax":        "bg-blue-600 text-white",
  "GST":               "bg-orange-500 text-white",
  "Tax Planning":      "bg-emerald-600 text-white",
  "Audit":             "bg-purple-600 text-white",
  "Business Advisory": "bg-rose-600 text-white",
  "General":           "bg-gray-600 text-white",
};
function categoryColour(cat: string) {
  return CATEGORY_COLOURS[cat] ?? CATEGORY_COLOURS["General"];
}

// ── JSON-LD ────────────────────────────────────────────────────────────────────
function ArticleSchema({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    image: post.image || undefined,
    keywords: post.tags.join(", "),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Related posts: same category, excluding current
  const related = getAllPostsMeta()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <ArticleSchema post={post} />

      {/* ── Hero banner ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background border-b border-border">
        {post.image && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
        )}
        <Container className="relative py-12 md:py-16">
          <FadeIn>
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            {/* Category + tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColour(post.category)}`}>
                {post.category}
              </span>
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-4xl mb-5">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mb-7 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ── Cover image ──────────────────────────────────────────────── */}
      {post.image && (
        <div className="w-full">
          <Container className="py-0 px-0 md:px-6 lg:px-8">
            <div className="relative h-64 md:h-96 w-full overflow-hidden md:rounded-xl shadow-lg">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </Container>
        </div>
      )}

      {/* ── Article body ─────────────────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <article className="prose prose-lg prose-slate max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:my-1
                prose-table:text-sm prose-th:bg-muted prose-th:text-foreground
                prose-td:text-muted-foreground
                prose-blockquote:border-primary prose-blockquote:bg-primary/5
                prose-blockquote:rounded-r-lg prose-blockquote:py-1
                prose-code:text-primary prose-code:bg-muted prose-code:px-1.5
                prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-hr:border-border">
                <MDXRemote source={post.content} />
              </article>
            </FadeIn>

            {/* ── CTA after article ───────────────────────────────────── */}
            <FadeIn>
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Need personalised advice?
                </h3>
                <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                  Every business and tax situation is unique. CA Mahesh M. Joshi offers
                  one-on-one consultations for individuals and businesses in Pune & Maharashtra.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  Book a Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── Related posts ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-10 md:py-14 border-t border-border bg-muted/30">
          <Container>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              More in {post.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden">
                    {rel.image ? (
                      <Image
                        src={rel.image}
                        alt={rel.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/60 to-secondary/40" />
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-auto flex items-center gap-3">
                      <span>{formatDate(rel.date)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {rel.readTime}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
