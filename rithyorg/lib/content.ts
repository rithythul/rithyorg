import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  canonicalUrl: string;
  content: string;
}

const CRYPTO_DIR = path.join(process.cwd(), "content/crypto");
const POSTS_DIR = path.join(process.cwd(), "content/posts");

function readMarkdownFile(filePath: string): Post | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const slug = path.basename(filePath, ".md");
    const htmlContent = marked.parse(content) as string;

    return {
      slug,
      title: (data.title as string) || slug,
      date: data.date ? String(data.date) : "",
      excerpt: (data.excerpt as string) || "",
      tags: (data.tags as string[]) || [],
      canonicalUrl: (data.canonicalUrl as string) || "",
      content: htmlContent,
    };
  } catch {
    return null;
  }
}

export function getAllCryptoDigests(): Post[] {
  if (!fs.existsSync(CRYPTO_DIR)) return [];
  const files = fs.readdirSync(CRYPTO_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((f) => readMarkdownFile(path.join(CRYPTO_DIR, f)))
    .filter((p): p is Post => p !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getCryptoDigest(slug: string): Post | null {
  return readMarkdownFile(path.join(CRYPTO_DIR, `${slug}.md`));
}

export function getRelatedDigests(
  currentSlug: string,
  tags: string[],
  count: number = 3
): Post[] {
  const all = getAllCryptoDigests().filter((p) => p.slug !== currentSlug);

  const scored = all.map((post) => {
    const overlap = post.tags.filter((t) => tags.includes(t)).length;
    return { post, overlap };
  });

  scored.sort((a, b) => b.overlap - a.overlap);
  return scored.slice(0, count).map((s) => s.post);
}

export function getAllWritingPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((f) => readMarkdownFile(path.join(POSTS_DIR, f)))
    .filter((p): p is Post => p !== null);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
