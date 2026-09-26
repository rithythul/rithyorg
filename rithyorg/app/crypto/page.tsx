import type { Metadata } from "next";
import Link from "next/link";
import WritingList from "../components/writing-list";
import { getAllCryptoDigests } from "@/lib/content";

export const metadata: Metadata = {
  title: "Crypto digest",
  description:
    "A short series of crypto news digests: markets, regulation, and security.",
  alternates: { canonical: "/crypto" },
};

export default function CryptoPage() {
  const posts = getAllCryptoDigests();

  return (
    <div className="shell">
      <header className="page-head">
        <p className="back">
          <Link href="/writing" className="text-link">
            ← All writing
          </Link>
        </p>
        <h1 className="page-title">Crypto digest</h1>
        <p className="page-lede">
          News digests on crypto markets, regulation, and security.
        </p>
      </header>

      {posts.length > 0 ? (
        <WritingList posts={posts} showExcerpt />
      ) : (
        <p className="empty-note">No digests published.</p>
      )}
    </div>
  );
}
