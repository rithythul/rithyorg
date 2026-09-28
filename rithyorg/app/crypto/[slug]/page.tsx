import { notFound } from "next/navigation";
import Article from "@/components/article";
import { getPost, getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts("crypto").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost("crypto", (await params).slug);
  if (!post) notFound();
  return pageMetadata(post.title, post.excerpt || `${post.title}. From the crypto archive on rithy.org.`, post.url);
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost("crypto", (await params).slug);
  if (!post) notFound();
  return <Article post={post} />;
}
