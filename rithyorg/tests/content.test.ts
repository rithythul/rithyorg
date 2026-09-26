import { describe, expect, test } from "bun:test";
import path from "path";
import {
  formatDate,
  getCurated,
  getPublished,
  getWritingIndex,
  parsePost,
  readCollection,
  stripLeadingTitle,
} from "../lib/content";
import { readBook } from "../lib/book";

const fixtures = path.join(import.meta.dir, "fixtures");

describe("drafts", () => {
  test("are read but never published", () => {
    const all = readCollection("posts", path.join(fixtures, "posts"));
    const published = getPublished("posts", path.join(fixtures, "posts"));
    expect(all.map((p) => p.slug)).toContain("hidden");
    expect(published.map((p) => p.slug)).not.toContain("hidden");
  });

  test("the real index contains no drafts", () => {
    expect(getWritingIndex().some((p) => p.draft)).toBe(false);
  });
});

describe("existing URLs", () => {
  const digests = [
    "digest-2026-05-17",
    "digest-2026-05-20",
    "digest-2026-05-22",
    "digest-2026-05-25",
    "digest-2026-05-26",
    "digest-2026-05-27",
    "digest-2026-05-28",
    "digest-2026-05-30",
  ];

  test("every crypto digest keeps its /crypto/<slug> URL and canonical", () => {
    const index = getWritingIndex();
    for (const slug of digests) {
      const post = index.find((p) => p.slug === slug);
      expect(post?.href).toBe(`/crypto/${slug}`);
      expect(post?.canonicalUrl).toBe(`https://rithy.org/crypto/${slug}`);
    }
  });

  test("no item appears twice in the index", () => {
    const hrefs = getWritingIndex().map((p) => p.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("rendering", () => {
  test("a leading H1 that repeats the title is removed", () => {
    expect(stripLeadingTitle("# Title\n\nBody", "Title").trim()).toBe("Body");
    expect(stripLeadingTitle("# Other\n\nBody", "Title")).toContain("# Other");
  });

  test("digest bodies do not render a second h1", () => {
    for (const post of getWritingIndex()) {
      expect(post.content).not.toContain("<h1");
    }
  });

  test("dates format the same in every time zone", () => {
    expect(formatDate("2026-05-17")).toBe("May 17, 2026");
    const post = parsePost("---\ndate: 2026-05-17\n---\n", "x", "posts");
    expect(post.date).toBe("2026-05-17");
  });

  test("new essays get the rithythul byline; digests get none", () => {
    expect(parsePost("---\ntitle: A\n---\n", "a", "posts").author).toBe(
      "rithythul"
    );
    expect(parsePost("---\ntitle: A\n---\n", "a", "crypto").author).toBe("");
  });
});

describe("homepage selection", () => {
  test("featured items come first, then the newest", () => {
    const items = getPublished("posts", path.join(fixtures, "posts"));
    expect(getCurated(2, items).map((p) => p.slug)).toEqual([
      "pinned",
      "published",
    ]);
  });
});

describe("book record", () => {
  test("the real record carries the agreed title, author, and status", () => {
    const book = readBook();
    expect(book.title).toBe("The Things We Chose to Build");
    expect(book.author).toBe("rithythul");
    expect(book.status).toBe("Writing in progress");
    expect(book.introduction).toBeNull();
  });

  test("an unapproved introduction is not published", () => {
    const book = readBook(path.join(fixtures, "book"));
    expect(book.introduction).toBeNull();
    expect(book.description).toContain("Page copy.");
  });
});
