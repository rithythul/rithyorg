import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Book {
  title: string;
  author: string;
  label: string;
  status: string;
  statusNote: string;
  summary: string[];
  /** Approved /book page copy, rendered HTML */
  description: string;
  /** Approved introduction, rendered HTML; null until one is approved */
  introduction: string | null;
}

const BOOK_DIR = path.join(process.cwd(), "content/book");

export function readBook(dir: string = BOOK_DIR): Book {
  const { data, content } = matter(
    fs.readFileSync(path.join(dir, "index.md"), "utf-8")
  );

  let introduction: string | null = null;
  const introPath = path.join(dir, "introduction.md");
  if (fs.existsSync(introPath)) {
    const intro = matter(fs.readFileSync(introPath, "utf-8"));
    if (intro.data.approved === true) {
      introduction = marked.parse(intro.content, { async: false }) as string;
    }
  }

  return {
    title: String(data.title),
    author: String(data.author),
    label: String(data.label),
    status: String(data.status),
    statusNote: String(data.statusNote ?? ""),
    summary: Array.isArray(data.summary) ? data.summary.map(String) : [],
    description: marked.parse(content, { async: false }) as string,
    introduction,
  };
}

export function getBook(): Book {
  return readBook();
}
