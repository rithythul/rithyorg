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
      <div className="py-24 sm:py-32">
        <article className="space-y-16">
          <header className="space-y-8 border-b border-foreground/10 pb-12">
            <div className="flex gap-4 text-sm font-mono text-muted">
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>/</span>
              <span>{post.slug.split('-')[0] || 'Essay'}</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-xl prose-stone max-w-[65ch]
            prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:mt-12 prose-headings:mb-6
            prose-p:font-sans prose-p:text-xl prose-p:leading-8 prose-p:text-[#292524] prose-p:mb-8
            prose-a:text-foreground prose-a:decoration-muted/50 prose-a:underline-offset-4 hover:prose-a:decoration-foreground hover:prose-a:text-foreground
            prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:pl-8 prose-blockquote:py-2 prose-blockquote:my-12 prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-3xl prose-blockquote:leading-tight prose-blockquote:text-foreground
            prose-code:text-foreground prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:text-sm
            prose-li:font-sans prose-li:text-xl prose-li:text-[#292524]
            first-letter:float-left first-letter:text-8xl first-letter:font-serif first-letter:font-bold first-letter:mr-4 first-letter:mt-2 first-letter:leading-none">
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

        <nav className="mt-24 pt-12 border-t border-foreground/10 flex justify-between items-center gap-8">
          {previous ? (
            <Link
              href={`/writing/${previous.slug}`}
              className="group flex flex-col gap-2 text-left max-w-[45%]"
            >
              <span className="text-xs text-muted font-mono group-hover:text-foreground transition-colors">← Previous</span>
              <span className="font-serif text-xl font-bold text-foreground group-hover:text-muted transition-colors leading-tight">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/writing/${next.slug}`}
              className="group flex flex-col gap-2 text-right max-w-[45%]"
            >
              <span className="text-xs text-muted font-mono group-hover:text-foreground transition-colors">Next →</span>
              <span className="font-serif text-xl font-bold text-foreground group-hover:text-muted transition-colors leading-tight">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
