import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import book from "../content/pages/book.json";

export type Section = "writing" | "crypto";

export interface Post {
  slug: string;
  section: Section;
  url: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  lang: string;
  author?: string;
  content: string;
}

// relative to app dir: run from rithyorg/
const contentRoot = path.join(process.cwd(), "content");
const directories = { writing: "posts", crypto: "crypto" } as const;
const slugPattern = /^[a-z0-9][a-z0-9-]*$/;

export function renderContent(markdown: string): string {
  const html = marked.parse(markdown, { async: false });
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "figure", "figcaption", "time"],
    allowedAttributes: {
      "*": ["lang", "dir", "id"],
      a: ["href", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
      ol: ["start"],
      time: ["datetime"],
      code: ["class"],
    },
    allowedSchemes: ["https", "http", "mailto"],
    transformTags: {
      h1: "h2",
      img: (_tag, attribs) => ({ tagName: "img", attribs: { ...attribs, loading: "lazy" } }),
    },
  });
}

export function isPublished(data: Record<string, unknown>): boolean {
  if (data.draft === true) return false;
  if (data.status && data.status !== "published") return false;
  if (!data.date) return true;
  const date = new Date(String(data.date));
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid publication date: ${data.date}`);
  return date.getTime() <= Date.now();
}

export function getPost(section: Section, slug: string): Post | null {
  if (!slugPattern.test(slug)) return null;
  const file = path.join(contentRoot, directories[section], `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (!isPublished(data)) return null;
  if (typeof data.title !== "string" || !data.title.trim()) throw new Error(`Missing title: ${file}`);
  const title = data.title.trim();

  // drop only a duplicate leading title
  const body = content.replace(/^\s*# (.+)\r?\n/, (match, heading: string) =>
    heading.trim() === title ? "" : match,
  );

  return {
    slug,
    section,
    url: `/${section}/${slug}`,
    title,
    date: data.date ? new Date(String(data.date)).toISOString().slice(0, 10) : "",
    excerpt: String(data.excerpt || data.description || ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    lang: typeof data.lang === "string" ? data.lang : /[ក-៿]/.test(content) ? "km" : "en",
    author: typeof data.author === "string" ? data.author : undefined,
    content: renderContent(body),
  };
}

export function getPosts(section: Section): Post[] {
  const directory = path.join(contentRoot, directories[section]);
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getPost(section, file.slice(0, -3)))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export const getAllWritingPosts = () => getPosts("writing");
export const getAllCryptoDigests = () => getPosts("crypto");

export function getCuratedPosts(): Post[] {
  return book.relatedSlugs
    .map((slug) => getPost("writing", slug))
    .filter((post): post is Post => post !== null);
}

export const cryptoTopics = [
  "bitcoin",
  "defi",
  "digest",
  "ethereum",
  "geopolitics",
  "institutional",
  "regulation",
  "security",
];

export function hasTag(post: Post, tag: string): boolean {
  return post.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
}

// repeated query keys arrive as arrays
export function singleParam(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function paginate<T>(items: T[], requestedPage: string | undefined, pageSize = 15) {
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const requested = Number.parseInt(requestedPage || "1", 10) || 1;
  const page = Math.min(pages, Math.max(1, requested));
  return { items: items.slice((page - 1) * pageSize, page * pageSize), page, pages };
}
