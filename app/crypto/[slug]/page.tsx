import { getCryptoPost, getCryptoPosts } from "../../lib/crypto";
import type { CryptoPost } from "../../lib/crypto";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getCryptoPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCryptoPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Crypto Digest — rithy.org`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function CryptoPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = await getCryptoPost(slug);
    if (!post) notFound();

    // Related posts: same category first, then recent, exclude current
    const allPosts = await getCryptoPosts();
    const related: CryptoPost[] = allPosts
      .filter((p) => p.slug !== slug)
      .sort((a, b) => {
        const aScore = a.category === post.category ? 1 : 0;
        const bScore = b.category === post.category ? 1 : 0;
        if (bScore !== aScore) return bScore - aScore;
        return a.date < b.date ? 1 : -1;
      })
      .slice(0, 3);

    return (
      <div className="py-16 sm:py-20">
        <header className="mb-16 pb-12 border-b border-foreground/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-600">
                {post.category}
              </span>
              <div className="h-px bg-foreground/20 flex-grow" />
              <time className="font-mono text-sm text-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              {post.title}
            </h1>
            <p className="font-serif text-xl text-muted-foreground leading-relaxed">
              {post.summary}
            </p>
          </div>
        </header>

        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-xs text-muted uppercase tracking-wider">
                  Crypto Digest
                </span>
                <p className="font-serif text-lg font-medium">
                  {post.category}
                </p>
              </div>
              <div className="h-px bg-foreground/10" />
              {post.sources.length > 0 && (
                <div className="space-y-2">
                  <span className="font-mono text-xs text-muted uppercase tracking-wider">
                    Sources
                  </span>
                  {post.sources.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-mono text-sm text-muted hover:text-amber-600 transition-colors"
                    >
                      {s.name} ↗
                    </a>
                  ))}
                </div>
              )}
              <Link
                href="/crypto"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-amber-600 transition-colors"
              >
                ← Back to Digest
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-9 max-w-[40rem]">
            <div className="prose prose-lg prose-stone max-w-none
              prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:mt-12 prose-headings:mb-6
              prose-h2:text-3xl prose-h3:text-2xl
              prose-p:font-sans prose-p:text-lg prose-p:leading-[1.8] prose-p:text-[#292524] prose-p:mb-6
              prose-a:text-foreground prose-a:decoration-amber-600/50 prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:decoration-amber-600 hover:prose-a:text-amber-600
              prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-serif prose-blockquote:text-foreground prose-blockquote:bg-foreground/5 prose-blockquote:pr-6
              prose-code:text-foreground prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-strong:text-foreground prose-strong:font-semibold
              prose-hr:border-foreground/10 prose-hr:my-12
              first:prose-p:text-xl first:prose-p:leading-[1.7]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>

            {/* Mobile sources + back link */}
            <footer className="mt-12 pt-8 border-t border-foreground/10">
              <div className="flex flex-wrap gap-4 mb-6 lg:hidden">
                {post.sources.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted hover:text-amber-600 transition-colors"
                  >
                    {s.name} ↗
                  </a>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · rithy.org
                </div>
                <Link
                  href="/crypto"
                  className="font-mono text-sm text-muted hover:text-amber-600 transition-colors lg:hidden"
                >
                  ← Back to Digest
                </Link>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted">
                Related Reads
              </h2>
              <div className="h-px bg-foreground/10 flex-grow ml-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/crypto/${r.slug}`}
                  className="group flex flex-col justify-between p-6 border border-foreground/10 hover:border-amber-600/50 hover:bg-amber-50/30 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-amber-600">
                        {r.category}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {new Date(r.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-amber-600 transition-colors">
                      {r.title}
                    </h3>
                    <p className="font-sans text-sm text-muted line-clamp-2">
                      {r.summary}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-xs">Read</span>
                    <span className="text-xs">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-20 p-8 md:p-12 bg-foreground text-white text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">
            Stay ahead of the market
          </h2>
          <p className="font-mono text-sm text-white/60 mb-6">
            Real-time crypto intel. 29 sources, high-stakes filter, every 30 minutes.
          </p>
          <Link
            href="https://t.me/bitcoinprahok"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-sm uppercase tracking-wider px-6 py-3 border border-white/30 hover:bg-amber-600 hover:border-amber-600 transition-all duration-300"
          >
            Join BitcoinPrahok on Telegram
          </Link>
        </section>
      </div>
    );
  } catch {
    notFound();
  }
}
