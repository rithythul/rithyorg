// src/app/writing/page.tsx
import { getBlogPosts } from '../lib/writing'
import Link from 'next/link'

const POSTS_PER_PAGE = 15

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function WritingPage({
  searchParams,
}: PageProps) {
  // Await the searchParams
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const allPosts = await getBlogPosts()
  
  // Calculate pagination
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const offset = (currentPage - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(offset, offset + POSTS_PER_PAGE)

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-2">
      <h1 className="text-3xl font-bold mb-6">writing</h1>

      {/* Introduction */}
      <p className="mb-6 text-[var(--foreground)]">
        A writing on ideas, experiences, and reflections on a variety of topics. 
        A blend of thoughts, lessons learned, and moments captured through words. 
      </p>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="mb-4 pb-2 border-b border-[var(--foreground)]">
              <Link
                href={`/writing/${post.slug}`}
                className="text-[var(--foreground)] hover:underline text-xl font-semibold" // Made title larger and bolder
              >
                {post.title}
              </Link>
              <div className="text-sm text-[var(--foreground)] mt-1"> {/* Added margin top for date */}
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    // day: 'numeric' // Optionally add day
                  })}
                </time>
              </div>
            </article>
          ))
        ) : (
          <p className="text-[var(--foreground)]">No posts available yet.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-between items-center border-t border-[var(--foreground)] pt-4">
          {currentPage > 1 ? (
            <Link
              href={`/writing?page=${currentPage - 1}`}
              className="text-[var(--foreground)] hover:underline"
            >
              ← Previous
            </Link>
          ) : (
            <div></div>
          )}
          
          <div className="text-sm text-[var(--foreground)]">
            Page {currentPage} of {totalPages}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={`/writing?page=${currentPage + 1}`}
              className="text-[var(--foreground)] hover:underline"
            >
              Next →
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  )
}
