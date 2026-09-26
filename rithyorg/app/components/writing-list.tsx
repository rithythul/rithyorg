import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

export default function WritingList({
  posts,
  showExcerpt = false,
}: {
  posts: Post[];
  showExcerpt?: boolean;
}) {
  return (
    <ul className="writing-list">
      {posts.map((post) => (
        <li key={post.href}>
          <Link href={post.href} className="writing-row">
            <span className="topic">{post.topic}</span>
            <span className="title" lang={post.lang}>
              <span className="title-text">{post.title}</span>
              {showExcerpt && post.excerpt && (
                <span className="excerpt">{post.excerpt}</span>
              )}
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
