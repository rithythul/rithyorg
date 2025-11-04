// app/writing/[slug]/page.tsx
import { getBlogPost, getBlogPosts, getAdjacentPosts } from "../../lib/writing";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // <-- Import here

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  try {
    // Await the params object first
    const { slug } = await params;

    const post = await getBlogPost(slug);
    if (!post) {
      notFound();
    }

    // Get adjacent posts
    const { previous, next } = await getAdjacentPosts(slug);

    return (
      <div>
        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-2">
            {post.title}
          </h1>
          <time className="text-lg block mb-6">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} // <-- Add this prop
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <nav className="mt-8 py-4 border-t flex flex-col sm:flex-row gap-4 sm:gap-0">
          {previous ? (
            <Link
              href={`/writing/${previous.slug}`}
              className="truncate flex-1 text-center sm:text-left"
            >
              ← {previous.title}
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/writing/${next.slug}`}
              className="truncate flex-1 text-center sm:text-right"
            >
              {next.title} →
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
