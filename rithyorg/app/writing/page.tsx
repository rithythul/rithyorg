import type { Metadata } from "next";
import Link from "next/link";
import WritingList, { hasMixedTopics } from "../components/writing-list";
import { getWritingIndex, type Post } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Everything rithythul has published on rithy.org, newest first.",
  alternates: { canonical: "/writing" },
};

function groupByYear(posts: Post[]): [string, Post[]][] {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const year = post.date ? post.date.slice(0, 4) : "Undated";
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()];
}

export default function WritingPage() {
  const posts = getWritingIndex();
  const showTopic = hasMixedTopics(posts);

  return (
    <div className="shell">
      <header className="page-head">
        <h1 className="page-title">Writing</h1>
        <p className="page-lede">
          Everything published here, newest first. The{" "}
          <Link href="/crypto">crypto digest</Link> series is also listed on
          its own page.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="empty-note">Nothing published yet.</p>
      ) : (
        groupByYear(posts).map(([year, items]) => (
          <section key={year} aria-labelledby={`year-${year}`}>
            <h2 id={`year-${year}`} className="year-heading">
              {year}
            </h2>
            <WritingList posts={items} showTopic={showTopic} />
          </section>
        ))
      )}
    </div>
  );
}
