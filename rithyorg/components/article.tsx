import { type Post, formatDate } from "@/lib/content";

export default function Article({ post }: { post: Post }) {
  const archive =
    post.section === "crypto"
      ? { href: "/crypto", label: "Crypto archive" }
      : { href: "/writing", label: "Writing" };

  return (
    <article className="reading article" lang={post.lang}>
      <a className="back-link" href={archive.href}>
        <span aria-hidden="true">←</span> Back to {archive.label}
      </a>
      <header className="article-header">
        <p className="meta">
          {post.section === "crypto" ? "Crypto archive" : "Essay"}
          {post.date && (
            <>
              {" · "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </>
          )}
        </p>
        <h1>{post.title}</h1>
        {post.author && <p className="meta">{post.author}</p>}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

      <footer className="article-end">
        <a href={archive.href}>
          <span aria-hidden="true">←</span> All {archive.label === "Writing" ? "writing" : "crypto articles"}
        </a>
        {post.section === "crypto" && (
          <a href="https://t.me/bitcoinprahok">
            BitcoinPrahok on Telegram <span aria-hidden="true">↗</span>
          </a>
        )}
      </footer>
    </article>
  );
}
