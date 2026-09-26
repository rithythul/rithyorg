import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

export default function Article({
  post,
  back,
  children,
}: {
  post: Post;
  back: { href: string; label: string };
  /** Optional end-of-article content, shown after the text */
  children?: React.ReactNode;
}) {
  return (
    <article className="shell" lang={post.lang}>
      <div className="reading">
        <header className="article-head">
          <p className="back">
            <Link href={back.href} className="text-link">
              ← {back.label}
            </Link>
          </p>
          <p className="eyebrow">{post.topic}</p>
          <h1>{post.title}</h1>
          <p className="article-meta">
            {post.author && <span>by {post.author}</span>}
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
          </p>
          {post.excerpt && <p className="article-lede">{post.excerpt}</p>}
        </header>

        {/* Repository-authored Markdown, rendered at build time. */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="article-end">
          {children}
          <p>
            <Link href={back.href} className="text-link">
              ← {back.label}
            </Link>
          </p>
        </footer>
      </div>
    </article>
  );
}
