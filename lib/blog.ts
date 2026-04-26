import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;           // ISO date string "YYYY-MM-DD"
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  readTime: string;
  content: string;        // Raw MDX content (without frontmatter)
}

export type BlogPostMeta = Omit<BlogPost, "content">;

// ── Path helpers ──────────────────────────────────────────────────────────────

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getFilePaths(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => path.join(BLOG_DIR, f));
}

// ── Parsers ───────────────────────────────────────────────────────────────────

function parseFile(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const slug: string =
      data.slug || path.basename(filePath, path.extname(filePath));

    return {
      slug,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      date: data.date ? String(data.date).slice(0, 10) : "",
      author: data.author ?? "CA Mahesh M. Joshi (ACA)",
      category: data.category ?? "General",
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image ?? "",
      imageAlt: data.imageAlt ?? data.title ?? "",
      readTime: data.readTime ?? "",
      content,
    };
  } catch {
    return null;
  }
}

// ── Public API ─────────────────────────────────────────────────────────────────

/** Returns all blog posts sorted newest first, with content included. */
export function getAllPosts(): BlogPost[] {
  return getFilePaths()
    .map(parseFile)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns post metadata only (no content) — used for listing pages. */
export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

/** Returns a single post by slug, or null if not found. */
export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

/** Returns all slugs — used to generate static params. */
export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Returns posts in a given category (case-insensitive). */
export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPostsMeta().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

/** Returns the unique list of all categories across all posts. */
export function getAllCategories(): string[] {
  const cats = getAllPostsMeta().map((p) => p.category);
  return [...new Set(cats)];
}

// ── Date formatter ────────────────────────────────────────────────────────────

/** Formats "YYYY-MM-DD" to "15 Aug 2024" style for display. */
export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return iso;
  }
}
