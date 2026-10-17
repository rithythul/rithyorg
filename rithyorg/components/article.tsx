import { type Post, formatDate, getNeighbors, readingMinutes } from "@/lib/content";

export default function Article({ post }: { post: Post }) {
  const crypto = post.section === "crypto";
  const archive = crypto ? { href: "/crypto", label: "Crypto archive" } : { href: "/writing", label: "Writing" };
  const minutes = readingMinutes(post);
  const { newer, older } = getNeighbors(post);

  return (
    <article className="reading article" lang={post.lang}>
      <a className="back-link" href={archive.href}>
        <span aria-hidden="true">←</span> {archive.label}
      </a>
      <header className="article-header">
        <p className="label">
          {crypto ? "Crypto archive" : "Essay"}
          {post.date && (
            <>
              {" · "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </>
          )}
          {minutes && ` · ${minutes} min read`}
        </p>
        <h1>{post.title}</h1>
        {post.author && <p className="meta">{post.author}</p>}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

      <footer className="article-end">
        {(newer || older) && (
          <nav className="article-pager" aria-label={crypto ? "More crypto articles" : "More essays"}>
            {newer && (
              <a href={newer.url} rel="prev" lang={newer.lang}>
                <span className="label">
                  <span aria-hidden="true">←</span> Newer
                </span>
                <span className="article-pager-title">{newer.title}</span>
              </a>
            )}
            {older && (
              <a href={older.url} rel="next" lang={older.lang} className="older">
                <span className="label">
                  Older <span aria-hidden="true">→</span>
                </span>
                <span className="article-pager-title">{older.title}</span>
              </a>
            )}
          </nav>
        )}
        <div className="article-links">
          <a href={archive.href}>
            All {crypto ? "crypto articles" : "writing"} <span aria-hidden="true">→</span>
          </a>
          {crypto && (
            <a href="https://t.me/bitcoinprahok">
              BitcoinPrahok on Telegram <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </footer>
    </article>
  );
}
