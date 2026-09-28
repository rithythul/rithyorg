import { formatDate, type Post } from "@/lib/content";

export default function WritingList({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <p className="empty-state">
        No published writing in this selection yet. <a href="/writing">Browse all writing</a>.
      </p>
    );
  }
  return (
    <ul className="writing-list">
      {posts.map((post) => (
        <li key={post.url}>
          <a href={post.url} lang={post.lang}>
            <span className="writing-title">{post.title}</span>
            <span className="writing-meta">
              {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
              <span aria-hidden="true">→</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
