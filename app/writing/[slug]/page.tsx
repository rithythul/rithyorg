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

    // Extract first paragraph as excerpt
    const firstParagraph = post.content.split('\n\n').find(p => p.trim() && !p.startsWith('#'));

    return (
      <div className="py-16 sm:py-20">
        {/* Hero Header */}
        <header className="mb-16 pb-12 border-b border-foreground/10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <time className="font-mono text-sm text-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div className="h-px bg-foreground/20 flex-grow" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
              {post.title}
            </h1>

            {firstParagraph && (
              <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {firstParagraph.slice(0, 200)}{firstParagraph.length > 200 ? '...' : ''}
              </p>
            )}
          </div>
        </header>

        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-xs text-muted uppercase tracking-wider">From the Archive</span>
                <p className="font-serif text-lg font-medium">Thoughts & Systems</p>
              </div>
              <div className="h-px bg-foreground/10" />
              <Link 
                href="/writing" 
                className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-amber-600 transition-colors"
              >
                ← Back to Archive
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 max-w-[40rem]">
            <div className="prose prose-lg prose-stone max-w-none
              prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:mt-12 prose-headings:mb-6
              prose-h2:text-3xl prose-h3:text-2xl
              prose-p:font-sans prose-p:text-lg prose-p:leading-[1.8] prose-p:text-[#292524] prose-p:mb-6
              prose-a:text-foreground prose-a:decoration-amber-600/50 prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:decoration-amber-600 hover:prose-a:text-amber-600
              prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-serif prose-blockquote:text-foreground prose-blockquote:bg-foreground/5 prose-blockquote:pr-6
              prose-code:text-foreground prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-li:text-lg prose-li:text-[#292524] prose-li:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-hr:border-foreground/10 prose-hr:my-12
              first:prose-p:text-xl first:prose-p:leading-[1.7]">
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

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-foreground/10">
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })} · rithy.org
                </div>
                <Link 
                  href="/writing" 
                  className="font-mono text-sm text-muted hover:text-amber-600 transition-colors lg:hidden"
                >
                  ← Back to Archive
                </Link>
              </div>
            </footer>
          </div>
        </article>

        {/* Navigation */}
        <nav className="mt-20 pt-12 border-t border-foreground/10">
          <div className="font-mono text-xs text-muted uppercase tracking-wider mb-8">Continue Reading</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {previous ? (
              <Link
                href={`/writing/${previous.slug}`}
                className="group flex flex-col gap-3 p-6 bg-foreground/5 hover:bg-foreground transition-all duration-300"
              >
                <span className="font-mono text-xs text-muted group-hover:text-white/60 transition-colors">← Previous</span>
                <span className="font-serif text-xl font-bold text-foreground group-hover:text-white transition-colors leading-tight">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/writing/${next.slug}`}
                className="group flex flex-col gap-3 p-6 bg-foreground/5 hover:bg-foreground transition-all duration-300 sm:text-right"
              >
                <span className="font-mono text-xs text-muted group-hover:text-white/60 transition-colors">Next →</span>
                <span className="font-serif text-xl font-bold text-foreground group-hover:text-white transition-colors leading-tight">
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
