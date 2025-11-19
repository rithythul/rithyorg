// src/app/writing/page.tsx
import { getBlogPosts } from "../lib/writing";
import Link from "next/link";

const POSTS_PER_PAGE = 15;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function WritingPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const allPosts = await getBlogPosts();

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(offset, offset + POSTS_PER_PAGE);

  return (
    <div className="space-y-16 pt-20 pb-20">
      <header className="border-b border-foreground/10 pb-8">
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-4">
          Archive
        </h1>
        <p className="font-mono text-muted max-w-xl text-sm md:text-base">
          Reflections on technology, philosophy, and building.
        </p>
      </header>

      <div className="flex flex-col">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 py-6 border-b border-foreground/10 hover:bg-amber-50/30 transition-colors"
            >
              <time className="font-mono text-sm text-muted shrink-0 w-32">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight group-hover:underline decoration-1 underline-offset-4">
                  {post.title}
                </h2>
                {/* Optional: Add excerpt here if available in the future */}
              </div>
            </Link>
          ))
        ) : (
          <p className="font-mono text-muted py-12">No posts available yet.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-12">
          {currentPage > 1 ? (
            <Link
              href={`/writing?page=${currentPage - 1}`}
              className="font-mono text-sm text-muted hover:text-amber-600 transition-colors"
            >
              ← Previous
            </Link>
          ) : (
            <div />
          )}

          <span className="font-mono text-xs text-muted">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={`/writing?page=${currentPage + 1}`}
              className="font-mono text-sm text-muted hover:text-amber-600 transition-colors"
            >
              Next →
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
