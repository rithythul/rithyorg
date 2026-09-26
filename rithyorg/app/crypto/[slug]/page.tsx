import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Article from "../../components/article";
import WritingList from "../../components/writing-list";
import {
  getAllCryptoDigests,
  getPublishedPost,
  getRelatedDigests,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCryptoDigests().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost("crypto", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: post.canonicalUrl },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || undefined,
      publishedTime: post.date || undefined,
    },
  };
}

export default async function DigestPage({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPost("crypto", slug);
  if (!post) notFound();

  const related = getRelatedDigests(slug, post.tags, 3);

  return (
    <Article post={post} back={{ href: "/crypto", label: "Crypto digest" }}>
      <p className="muted">
        More crypto discussion in the{" "}
        <a href="https://t.me/bitcoinprahok">BitcoinPrahok Telegram channel</a>
        .
      </p>
      {related.length > 0 && (
        <section aria-labelledby="related">
          <h2 id="related" className="year-heading">
            Other digests
          </h2>
          <WritingList posts={related} />
        </section>
      )}
    </Article>
  );
}
