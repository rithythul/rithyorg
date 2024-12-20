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
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article 
              key={post.slug} 
              className="group relative flex justify-between items-baseline"
            >
              {/* Title */}
              <Link 
                href={`/writing/${post.slug}`}
                className="hover:text-blue-600 transition-colors mr-4 z-10 bg-background pr-2"
              >
                {post.title}
              </Link>
              
              {/* Dotted line */}
              <div className="flex-grow border-b border-dotted border-foreground/10 absolute w-full top-1/2"></div>
              
              {/* Date */}
              <time className="text-foreground/70 text-sm whitespace-nowrap pl-2 z-10 bg-background">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </time>
            </article>
          ))
        ) : (
          <p className="text-foreground/70">No posts available yet.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-between items-center border-t border-foreground/20 pt-4">
          {currentPage > 1 ? (
            <Link
              href={`/writing?page=${currentPage - 1}`}
              className="text-blue-600 hover:underline"
            >
              ← Previous
            </Link>
          ) : (
            <div></div>
          )}
          
          <div className="text-sm text-foreground/70">
            Page {currentPage} of {totalPages}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={`/writing?page=${currentPage + 1}`}
              className="text-blue-600 hover:underline"
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
