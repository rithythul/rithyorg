import { formatDate, formatDay, groupByYear, type Post } from "@/lib/content";

function Rows({ posts, short }: { posts: Post[]; short?: boolean }) {
  return (
    <ul className="writing-list">
      {posts.map((post) => (
        <li key={post.url}>
          <a href={post.url} lang={post.lang}>
            <span className="writing-title">{post.title}</span>
            <span className="writing-meta">
              {post.date && <time dateTime={post.date}>{short ? formatDay(post.date) : formatDate(post.date)}</time>}
              <span aria-hidden="true">→</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function WritingList({ posts, byYear }: { posts: Post[]; byYear?: boolean }) {
  if (!posts.length) {
    return (
      <p className="empty-state">
        No published writing in this selection yet. <a href="/writing">Browse all writing</a>.
      </p>
    );
  }
  if (!byYear) return <Rows posts={posts} />;
  return (
    <div className="year-groups">
      {groupByYear(posts).map(({ year, posts }) => (
        <section key={year} className="year-group" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`}>{year}</h2>
          <Rows posts={posts} short />
        </section>
      ))}
    </div>
  );
}
