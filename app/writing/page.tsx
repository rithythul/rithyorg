// src/app/writing/page.tsx
import { getBlogPosts } from "../lib/writing";
import Link from "next/link";

const POSTS_PER_PAGE = 15;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function WritingPage({ searchParams }: PageProps) {
  // Await the searchParams
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const allPosts = await getBlogPosts();

  // Calculate pagination
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(offset, offset + POSTS_PER_PAGE);

  return (
    <div>
      {/* Terminal prompt simulation */}
      <div className="text-solarized-yellow text-sm mb-4 opacity-60">
        <span>rithy@localhost:~$ ls -la writing/</span>
      </div>
      {/* Introduction */}
      <p className="mb-6 text-solarized-base0 text-sm font-light">
        A writing on ideas, experiences, and reflections on a variety of topics.
        A blend of thoughts, lessons learned, and moments captured through
        words.
      </p>

      <div className="space-y-3 sm:space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post.slug}
              className="mb-3 sm:mb-4 pb-2 border-b border-solarized-base2/50"
            >
              <Link
                href={`/writing/${post.slug}`}
                className="text-solarized-blue hover:text-solarized-cyan hover:underline text-sm font-medium block py-1 -mx-1 px-1"
              >
                {post.title}
              </Link>
              <div className="text-xs sm:text-sm text-solarized-base0 mt-1 font-light">
                {" "}
                {/* Added margin top for date */}
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    // day: 'numeric' // Optionally add day
                  })}
                </time>
              </div>
            </article>
          ))
        ) : (
          <p className="text-solarized-base0">No posts available yet.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-solarized-base2/50 pt-4 gap-3 sm:gap-0">
          {currentPage > 1 ? (
            <Link
              href={`/writing?page=${currentPage - 1}`}
              className="text-solarized-blue hover:text-solarized-cyan hover:underline text-center sm:text-left"
            >
              ← Previous
            </Link>
          ) : (
            <div></div>
          )}

          <div className="text-xs sm:text-sm text-solarized-base0 text-center">
            Page {currentPage} of {totalPages}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={`/writing?page=${currentPage + 1}`}
              className="text-solarized-blue hover:text-solarized-cyan hover:underline text-center sm:text-right"
            >
              Next →
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
