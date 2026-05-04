import Link from "next/link";
import { getCryptoPosts } from "../lib/crypto";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Crypto Digest — rithy.org",
  description:
    "Curated high-stakes crypto news — regulation, geopolitics, Bitcoin, DeFi. Updated daily.",
  openGraph: {
    title: "Crypto Digest — rithy.org",
    description:
      "Curated high-stakes crypto news — regulation, geopolitics, Bitcoin, DeFi. Updated daily.",
    type: "website",
  },
};

const POSTS_PER_PAGE = 50;

export default async function CryptoPage({ searchParams }: { searchParams: Promise<{ page?: string; category?: string }> }) {
  const { page: pageParam, category: activeCategory } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));
  const posts = await getCryptoPosts();

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  const featured = currentPage === 1 ? filtered[0] : null;
  const listStart = currentPage === 1 ? 1 : (currentPage - 1) * POSTS_PER_PAGE;
  const listEnd = currentPage === 1 ? POSTS_PER_PAGE : currentPage * POSTS_PER_PAGE;
  const list = (currentPage === 1 ? filtered.slice(1) : filtered).slice(
    currentPage === 1 ? 0 : (currentPage - 1) * POSTS_PER_PAGE,
    currentPage === 1 ? POSTS_PER_PAGE - 1 : currentPage * POSTS_PER_PAGE
  );

  const totalPosts = filtered.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Collect unique categories from all posts for filter
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="pt-20 pb-12 border-b border-foreground/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-amber-600">
            Updated Daily
          </span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-foreground leading-[0.85]">
          Crypto
          <br />
          <span className="italic text-muted-foreground">Digest</span>
        </h1>
        <div className="mt-8 flex justify-between items-end max-w-xl">
          <p className="font-mono text-sm text-muted max-w-[280px]">
            High-stakes crypto news that matters. Regulation, geopolitics, Bitcoin, DeFi — filtered for signal.
          </p>
          <div className="h-px bg-foreground/20 flex-grow ml-8" />
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/crypto"
          className={"font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors " + (!activeCategory ? "border-foreground/20 bg-foreground text-white" : "border-foreground/10 text-muted hover:border-amber-600 hover:text-amber-600")}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={"/crypto?category=" + encodeURIComponent(cat)}
            className={"font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors " + (activeCategory === cat ? "border-amber-600 bg-amber-600 text-white" : "border-foreground/10 text-muted hover:border-amber-600 hover:text-amber-600")}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Featured — only on page 1 */}
      {featured && (
        <article className="group relative flex flex-col justify-between p-8 md:p-10 border border-foreground/10 bg-white/50 hover:border-amber-600/50 hover:bg-amber-50/30 transition-all duration-300">
          <Link href={`/crypto/${featured.slug}`} className="absolute inset-0 z-10" />
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-600">
                {featured.category}
              </span>
              <span className="font-mono text-xs text-muted">
                {new Date(featured.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight group-hover:underline decoration-1 underline-offset-4">
              {featured.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              {featured.summary}
            </p>
          </div>
          <div className="pt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-muted">
            <span className="font-mono text-xs">Read →</span>
          </div>
        </article>
      )}

      {/* Post List — compact table of contents style */}
      {list.length > 0 && (
        <div className="border-t border-foreground/10">
          {list.map((post, i) => (
            <Link
              key={post.slug}
              href={`/crypto/${post.slug}`}
              className="group flex items-center gap-4 py-3 px-2 border-b border-foreground/5 hover:bg-amber-50/30 transition-colors"
            >
              <span className="font-mono text-xs text-muted w-16 shrink-0 text-right">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-600/70 w-24 shrink-0">
                {post.category}
              </span>
              <h3 className="font-serif text-base md:text-lg font-medium text-foreground group-hover:text-amber-600 transition-colors truncate">
                {post.title}
              </h3>
              <span className="ml-auto font-mono text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                →
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={activeCategory
                ? `/crypto?category=${encodeURIComponent(activeCategory)}&page=${currentPage - 1}`
                : `/crypto?page=${currentPage - 1}`}
              className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-foreground/10 text-muted hover:border-amber-600 hover:text-amber-600 transition-colors"
            >
              ← Prev
            </Link>
          )}
          <span className="font-mono text-xs text-muted">
            {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={activeCategory
                ? `/crypto?category=${encodeURIComponent(activeCategory)}&page=${currentPage + 1}`
                : `/crypto?page=${currentPage + 1}`}
              className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-foreground/10 text-muted hover:border-amber-600 hover:text-amber-600 transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}

      {/* CTA */}
      <section className="p-8 md:p-12 bg-foreground text-white text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
          Stay ahead of the market
        </h2>
        <p className="font-mono text-sm text-white/60 mb-6 max-w-md mx-auto">
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

      <div className="text-center">
        <Link href="/crypto/privacy" className="font-mono text-xs text-muted hover:text-amber-600">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
