import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCryptoDigests, getCryptoDigest, getRelatedDigests, formatDate } from "@/lib/content";

export function generateStaticParams() {
  const posts = getAllCryptoDigests();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function DigestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getCryptoDigest(slug);

  if (!post) notFound();

  const related = getRelatedDigests(slug, post.tags, 3);
  const displayTag = post.tags.find((t) =>
    ["BITCOIN", "ETHEREUM", "DEFI", "SECURITY", "REGULATION", "INSTITUTIONAL", "GEOPOLITICS"].includes(t.toUpperCase())
  ) || "DIGEST";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/crypto"
        className="inline-flex items-center gap-1 text-sm mb-8 hover:underline"
        style={{ color: "var(--color-accent)" }}
      >
        ← Back to Digest
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-xs uppercase tracking-wider px-2 py-1"
          style={{
            backgroundColor: "var(--color-border)",
            color: "var(--color-accent)",
          }}
        >
          {displayTag}
        </span>
        <span className="text-sm" style={{ color: "var(--color-muted)" }}>
          {formatDate(post.date)}
        </span>
      </div>

      <h1
        className="text-3xl sm:text-4xl font-bold leading-tight mb-8"
        style={{ color: "var(--color-fg)" }}
      >
        {post.title}
      </h1>

      {post.excerpt && (
        <p
          className="text-lg leading-relaxed mb-8 pb-8"
          style={{ color: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}
        >
          {post.excerpt}
        </p>
      )}

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* CTA */}
      <div
        className="mt-12 p-8 text-center"
        style={{ backgroundColor: "var(--color-card)", borderRadius: "0px" }}
      >
        <p className="text-lg font-semibold mb-2" style={{ color: "var(--color-card-text)" }}>
          Stay ahead of the market
        </p>
        <p className="text-sm mb-4" style={{ color: "#a8a29e" }}>
          Get daily crypto digests delivered straight to your inbox.
        </p>
        <a
          href="https://t.me/bitcoinprahok"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 text-sm font-medium no-underline"
          style={{
            backgroundColor: "#fafaf9",
            color: "var(--color-card)",
          }}
        >
          JOIN BITCOINPRAHOK ON TELEGRAM
        </a>
      </div>

      {/* Related Reads */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2
            className="text-sm font-medium uppercase tracking-wide mb-6"
            style={{ color: "var(--color-muted)", fontSize: "14px", letterSpacing: "0.05em" }}
          >
            Related Reads
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/crypto/${r.slug}`}
                className="block p-6 no-underline transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-card)",
                  color: "var(--color-card-text)",
                  borderRadius: "0px",
                }}
              >
                <span className="text-xs" style={{ color: "#78716c" }}>
                  {formatDate(r.date)}
                </span>
                <h3 className="text-sm font-semibold leading-snug mt-1" style={{ color: "var(--color-card-text)" }}>
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
