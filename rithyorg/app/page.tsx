import Link from "next/link";
import { getAllCryptoDigests, formatDate } from "@/lib/content";

export default function Home() {
  const posts = getAllCryptoDigests();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--color-fg)" }}>
        The Living Archive
      </h1>
      <p className="text-lg mb-12" style={{ color: "var(--color-muted)" }}>
        Crypto digests, writings, and projects.
      </p>

      {posts.length > 0 && (
        <>
          <h2 className="text-sm font-medium uppercase tracking-wide mb-6" style={{ color: "var(--color-muted)", fontSize: "14px", letterSpacing: "0.05em" }}>
            Latest Crypto Digests
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {posts.slice(0, 6).map((post) => (
              <Link
                key={post.slug}
                href={`/crypto/${post.slug}`}
                className="block p-8 no-underline transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-card)",
                  color: "var(--color-card-text)",
                  padding: "32px",
                  borderRadius: "0px",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs uppercase tracking-wider" style={{ color: "#a8a29e" }}>
                    Digest
                  </span>
                  <span className="text-xs" style={{ color: "#57534e" }}>·</span>
                  <span className="text-xs" style={{ color: "#a8a29e" }}>
                    {formatDate(post.date)}
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug" style={{ color: "var(--color-card-text)" }}>
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: "#a8a29e" }}>
                    {post.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/crypto"
              className="text-sm hover:underline"
              style={{ color: "var(--color-accent)", fontSize: "14px" }}
            >
              View Full Archive →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
