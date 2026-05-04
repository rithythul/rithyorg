import Link from "next/link";
import { getCryptoPosts, getCryptoCategories } from "../lib/crypto";
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

export default async function CryptoPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: activeCategory } = await searchParams;
  const posts = await getCryptoPosts();
  const categories = await getCryptoCategories();

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="space-y-16 pb-20">
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
            key={cat.name}
            href={"/crypto?category=" + encodeURIComponent(cat.name)}
            className={"font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors " + (activeCategory === cat.name ? "border-amber-600 bg-amber-600 text-white" : "border-foreground/10 text-muted hover:border-amber-600 hover:text-amber-600")}
          >
            {cat.name}
            <span className="ml-1.5 opacity-50">{cat.count}</span>
          </Link>
        ))}
      </div>

      {/* Featured */}
      {featured && (
        <article className="group relative flex flex-col justify-between p-8 md:p-10 border border-foreground/10 bg-white/50 hover:border-amber-600/50 hover:bg-amber-50/30 transition-all duration-300 md:col-span-4">
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
            <div className="flex flex-wrap gap-3 pt-2">
              {featured.sources.map((s) => (
                <span
                  key={s.name}
                  className="font-mono text-xs text-muted hover:text-amber-600"
                >
                  [{s.name}]({s.url})
                </span>
              ))}
            </div>
          </div>
          <div className="pt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-muted">
            <span className="font-mono text-xs">Read →</span>
          </div>
        </article>
      )}

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {rest.map((post) => (
          <article
            key={post.slug}
            className="group relative flex flex-col justify-between p-6 border border-foreground/10 bg-white/50 hover:border-amber-600/50 hover:bg-amber-50/30 transition-all duration-300"
          >
            <Link href={`/crypto/${post.slug}`} className="absolute inset-0 z-10" />
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600">
                  {post.category}
                </span>
                <span className="font-mono text-xs text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:underline decoration-1 underline-offset-4">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-2">
              {post.sources.map((s) => (
                <span
                  key={s.name}
                  className="font-mono text-xs text-muted"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

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
