// src/app/page.tsx
import Link from 'next/link'
import { getBlogPosts } from './lib/writing'

export default async function Home() {
  const posts = await getBlogPosts()
  const recentPosts = posts.slice(0, 9)  // Show up to 9 posts

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-2">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">welcome</h1>
        <p className="text-lg mb-4">
          i'm <Link href="https://x.com/rithythul" className="text-[var(--foreground)] hover:underline">rithythul</Link> on X (Twitter). i'm a community and venture builder base in Phnom Penh. I like, running, cycling, football, adventure, time in nature, vipassana, computer and programming.  
        </p>
        <p className="text-lg">
          currently building tech ventures at smallworld with my favorite human alive. I am also into web3 and blockchain. <Link href="/about" className="text-[var(--foreground)] hover:underline"> read more...</Link>
        </p>
      </section>

      {recentPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">to my wall</h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <article key={post.slug} className="mb-4 pb-2 border-b border-[var(--foreground)]">
                {/* Title */}
                <Link 
                  href={`/writing/${post.slug}`}
                  className="text-[var(--foreground)] hover:underline text-xl"
                >
                  {post.title}
                </Link>
                
                {/* Date */}
                <div className="text-sm text-[var(--foreground)]">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </time>
                </div>
              </article>
            ))}
          </div>
          
          {posts.length > 9 && (
            <div className="mt-6">
              <Link 
                href="/writing" 
                className="text-[var(--foreground)] hover:underline"
              >
                more →
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
