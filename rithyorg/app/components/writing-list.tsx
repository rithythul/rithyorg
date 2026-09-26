import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

/**
 * Full-width rows: title first, topic and date quiet. The topic column
 * only appears when the list mixes topics; a repeated label is noise.
 */
export default function WritingList({ posts }: { posts: Post[] }) {
  const showTopic = new Set(posts.map((p) => p.topic)).size > 1;

  return (
    <ul className={showTopic ? "writing-list" : "writing-list no-topic"}>
      {posts.map((post) => (
        <li key={post.href}>
          <Link href={post.href} className="writing-row">
            {showTopic && <span className="topic">{post.topic}</span>}
            <span className="title" lang={post.lang}>
              {post.title}
            </span>
            {post.date ? (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            ) : (
              <span />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
