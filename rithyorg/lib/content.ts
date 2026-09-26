import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export const SITE_URL = "https://rithy.org";
export const AUTHOR = "rithythul";

export type Collection = "posts" | "crypto";

export interface Post {
  slug: string;
  collection: Collection;
  /** Public URL path, e.g. /writing/my-essay or /crypto/digest-2026-05-30 */
  href: string;
  title: string;
  /** ISO date (YYYY-MM-DD), or "" when unknown */
  date: string;
  excerpt: string;
  tags: string[];
  /** Short label shown beside the title in lists */
  topic: string;
  /** Byline; only set when the source gives one or for new essays */
  author: string;
  lang: string;
  featured: boolean;
  draft: boolean;
  canonicalUrl: string;
  /** Rendered HTML body */
  content: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

const COLLECTIONS: Record<Collection, { dir: string; base: string }> = {
  posts: { dir: path.join(CONTENT_ROOT, "posts"), base: "/writing" },
  crypto: { dir: path.join(CONTENT_ROOT, "crypto"), base: "/crypto" },
};

/** Normalise gray-matter dates (Date objects or strings) to YYYY-MM-DD. */
export function toIsoDate(value: unknown): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

/**
 * Drop a leading Markdown H1 that repeats the title. The page template
 * renders the title as the only H1.
 */
export function stripLeadingTitle(markdown: string, title: string): string {
  const match = markdown.match(/^\s*#\s+(.+?)\s*#*\s*(\r?\n|$)/);
  if (!match) return markdown;
  const norm = (s: string) => s.trim().toLowerCase();
  if (norm(match[1]) !== norm(title)) return markdown;
  return markdown.slice(match[0].length);
}

/**
 * Keep one H1 per page. If a body uses H1 for its own headline, shift every
 * heading down a level so the hierarchy inside the body is preserved.
 */
export function demoteHeadings(html: string): string {
  if (!/<h1[\s>]/.test(html)) return html;
  return html.replace(/<(\/?)h([1-5])(?=[\s>])/g, (_, slash, level) =>
    `<${slash}h${Number(level) + 1}`
  );
}

export function parsePost(
  raw: string,
  slug: string,
  collection: Collection
): Post {
  const { data, content } = matter(raw);
  const title = (data.title as string) || slug;
  const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
  const href = `${COLLECTIONS[collection].base}/${slug}`;
  const body = stripLeadingTitle(content, title);

  return {
    slug,
    collection,
    href,
    title,
    date: toIsoDate(data.date),
    // Older essays use `description` for the summary.
    excerpt: (data.excerpt as string) || (data.description as string) || "",
    tags,
    topic:
      (data.topic as string) ||
      (collection === "crypto" ? "Crypto digest" : "Essay"),
    author:
      (data.author as string) || (collection === "posts" ? AUTHOR : ""),
    lang: (data.lang as string) || "en",
    featured: data.featured === true,
    // Older essays mark drafts with `status: "draft"`.
    draft: data.draft === true || data.status === "draft",
    canonicalUrl: (data.canonicalUrl as string) || `${SITE_URL}${href}`,
    content: demoteHeadings(marked.parse(body, { async: false }) as string),
  };
}

function byDateDesc(a: Post, b: Post): number {
  return b.date.localeCompare(a.date);
}

/** Read every Markdown file in a directory. Drafts are included. */
export function readCollection(collection: Collection, dir?: string): Post[] {
  const root = dir ?? COLLECTIONS[collection].dir;
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter((f) => f.endsWith(".md"))
    .map((f) =>
      parsePost(
        fs.readFileSync(path.join(root, f), "utf-8"),
        path.basename(f, ".md"),
        collection
      )
    )
    .sort(byDateDesc);
}

/** Published items only: drafts never reach routes, lists, or the sitemap. */
export function getPublished(collection: Collection, dir?: string): Post[] {
  return readCollection(collection, dir).filter((p) => !p.draft);
}

export function getPublishedPost(
  collection: Collection,
  slug: string
): Post | null {
  return getPublished(collection).find((p) => p.slug === slug) ?? null;
}

export function getAllCryptoDigests(): Post[] {
  return getPublished("crypto");
}

export function getAllWritingPosts(): Post[] {
  return getPublished("posts");
}

/** Everything published, newest first: essays and crypto digests. */
export function getWritingIndex(): Post[] {
  return [...getAllWritingPosts(), ...getAllCryptoDigests()].sort(byDateDesc);
}

/**
 * Homepage selection: essays marked `featured: true` first, then the newest
 * essays. Falls back to everything published when there are no essays.
 */
export function getCurated(
  count = 4,
  items = getAllWritingPosts().length ? getAllWritingPosts() : getWritingIndex()
): Post[] {
  const featured = items.filter((p) => p.featured);
  const rest = items.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, count);
}

export function getRelatedDigests(
  currentSlug: string,
  tags: string[],
  count: number = 3
): Post[] {
  const all = getAllCryptoDigests().filter((p) => p.slug !== currentSlug);
  const scored = all.map((post) => ({
    post,
    overlap: post.tags.filter((t) => tags.includes(t)).length,
  }));
  scored.sort((a, b) => b.overlap - a.overlap);
  return scored.slice(0, count).map((s) => s.post);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
