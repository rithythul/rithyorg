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
        {/* Terminal prompt simulation */}
        <div className="text-solarized-yellow text-sm mb-4 opacity-60">
          <span>rithy@localhost:~$ cat "{post.title}"</span>
        </div>

        <article className="mt-4">
          <h1 className="text-base font-medium mb-2 terminal-header text-solarized-yellow">
            {post.title}
          </h1>
          <time className="text-solarized-base0 text-xs font-light block mb-4 sm:mb-6">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div className="prose prose-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} // <-- Add this prop
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-solarized-blue hover:text-solarized-cyan hover:underline"
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

        <nav className="mt-6 sm:mt-8 py-4 border-t border-solarized-base2/50 flex flex-col sm:flex-row gap-4 sm:gap-0">
          {previous ? (
            <Link
              href={`/writing/${previous.slug}`}
              className="text-solarized-blue hover:text-solarized-cyan hover:underline truncate flex-1 text-sm font-light text-center sm:text-left"
            >
              ← {previous.title}
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/writing/${next.slug}`}
              className="text-solarized-blue hover:text-solarized-cyan hover:underline truncate flex-1 text-center sm:text-right text-sm font-light"
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
