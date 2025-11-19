// app/writing/[slug]/page.tsx
import { getBlogPost, getBlogPosts, getAdjacentPosts } from "../../lib/writing";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    const { slug } = await params;

    const post = await getBlogPost(slug);
    if (!post) {
      notFound();
    }

    const { previous, next } = await getAdjacentPosts(slug);

    return (
      <div className="py-16 sm:py-20">
        <article className="space-y-12 max-w-[36rem]">
          <header className="space-y-4">
            <div className="flex gap-3 text-sm text-muted">
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-lg prose-stone max-w-[36rem]
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4
            prose-h2:text-2xl prose-h3:text-xl
            prose-p:font-sans prose-p:text-lg prose-p:leading-relaxed prose-p:text-[#292524] prose-p:mb-6
            prose-a:text-foreground prose-a:decoration-muted/50 prose-a:underline-offset-4 hover:prose-a:decoration-amber-600 hover:prose-a:text-amber-600
            prose-blockquote:border-l-2 prose-blockquote:border-muted prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:text-muted
            prose-code:text-foreground prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
            prose-li:text-lg prose-li:text-[#292524] prose-li:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
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

        <nav className="mt-20 pt-12 border-t border-foreground/10">
          <div className="text-sm text-muted mb-6 text-center">Continue Reading</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[36rem]">
            {previous ? (
              <Link
                href={`/writing/${previous.slug}`}
                className="group flex flex-col gap-2 p-4 border border-foreground/10 rounded-lg hover:border-amber-600/50 hover:bg-amber-50/30 transition-all"
              >
                <span className="text-xs text-muted group-hover:text-amber-600 transition-colors">← Previous</span>
                <span className="text-sm font-semibold text-foreground group-hover:text-amber-600 transition-colors leading-tight">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/writing/${next.slug}`}
                className="group flex flex-col gap-2 p-4 border border-foreground/10 rounded-lg hover:border-amber-600/50 hover:bg-amber-50/30 transition-all sm:text-right"
              >
                <span className="text-xs text-muted group-hover:text-amber-600 transition-colors">Next →</span>
                <span className="text-sm font-semibold text-foreground group-hover:text-amber-600 transition-colors leading-tight">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
