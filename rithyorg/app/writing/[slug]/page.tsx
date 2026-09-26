import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Article from "../../components/article";
import { getBook } from "@/lib/book";
import { getAllWritingPosts, getPublishedPost } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

// Only published posts get pages; drafts and unknown slugs return 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWritingPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost("posts", slug);
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
      authors: post.author ? [post.author] : undefined,
    },
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPost("posts", slug);
  if (!post) notFound();
  const book = getBook();

  return (
    <Article post={post} back={{ href: "/writing", label: "All writing" }}>
      <p className="muted">
        I am writing a book about what we built at SmallWorld:{" "}
        <Link href="/book">{book.title}</Link>.
      </p>
    </Article>
  );
}
