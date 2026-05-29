import Link from "next/link";
import { getAllCryptoDigests, formatDate } from "@/lib/content";

export default function CryptoPage() {
  const posts = getAllCryptoDigests();

  const filterTags = ["ALL", "BITCOIN", "DIGEST", "DEFI", "SECURITY", "REGULATION", "ETHEREUM", "INSTITUTIONAL", "GEOPOLITICS"];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--color-fg)" }}>
        Crypto Digest
      </h1>
      <p className="mb-8" style={{ color: "var(--color-muted)" }}>
        Daily market updates and analysis from the crypto space.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {filterTags.map((tag) => (
          <button
            key={tag}
            className="px-3 py-1 text-xs uppercase tracking-wider transition-colors border"
            style={{
              borderColor: "var(--color-border)",
              color: tag === "ALL" ? "var(--color-bg)" : "var(--color-muted)",
              backgroundColor: tag === "ALL" ? "var(--color-accent)" : "transparent",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {posts.map((post) => {
          const displayTag = post.tags.find((t) =>
            ["BITCOIN", "ETHEREUM", "DEFI", "SECURITY", "REGULATION", "INSTITUTIONAL", "GEOPOLITICS"].includes(t.toUpperCase())
          ) || "DIGEST";

          return (
            <Link
              key={post.slug}
              href={`/crypto/${post.slug}`}
              className="block no-underline transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--color-card)",
                color: "var(--color-card-text)",
                padding: "32px",
                borderRadius: "0px",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs uppercase tracking-wider px-2 py-0.5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#a8a29e",
                  }}
                >
                  {displayTag}
                </span>
              </div>
              <h2 className="text-base font-semibold leading-snug mb-2" style={{ color: "var(--color-card-text)" }}>
                {post.title}
              </h2>
              <span className="text-xs" style={{ color: "#78716c" }}>
                {formatDate(post.date)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
