// src/app/page.tsx
import Link from 'next/link'
import { getBlogPosts } from './lib/writing'

export default async function Home() {
  const posts = await getBlogPosts()
  const recentPosts = posts.slice(0, 9)  // Show up to 9 posts

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">welcome</h1>
        <p className="text-lg mb-4">
          hello, i'm rithy. i'm a startup community and venture builder base in Phnom Penh. I like technology, cycling, adventure, time in nature, vipassana.  
        </p>
        <p className="text-lg">
          currently building tech ventures at smallworld with my favorite human being. I am also into web3 and blockchain. <Link href="/about" className="text-blue-600 hover:underline">about me</Link>.
        </p>
      </section>

      {recentPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">writing</h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
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
                <div className="flex-grow border-b border-dotted border-foreground/30 absolute w-full top-1/2"></div>
                
                {/* Date */}
                <time className="text-foreground/70 text-sm whitespace-nowrap pl-2 z-10 bg-background">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </time>
              </article>
            ))}
          </div>
          
          {posts.length > 9 && (
            <div className="mt-6">
              <Link 
                href="/writing" 
                className="text-blue-600 hover:underline"
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