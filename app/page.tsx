// src/app/page.tsx
import Link from "next/link";
import { getBlogPosts } from "./lib/writing";

export default async function Home() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 9); // Show up to 9 posts

  return (
    <div>
      {/* Terminal prompt simulation */}
      <div className="text-solarized-yellow text-sm mb-4 opacity-70">
        <span>rithy@localhost:~$ cat welcome.txt</span>
      </div>

      <section className="mb-8 sm:mb-12">
        <p className="text-sm mb-4 font-light leading-relaxed">
          i'm{" "}
          <Link
            href="https://x.com/rithythul"
            className="text-solarized-blue hover:text-solarized-cyan hover:underline"
          >
            rithythul
          </Link>
          . i'm a community and venture builder base in Phnom Penh. I like,
          running, cycling, football, adventure, time in nature, vipassana,
          computer and programming.
        </p>
        <p className="text-sm font-light leading-relaxed">
          currently building tech ventures at smallworld with my favorite human
          alive. I am also into web3 and blockchain.{" "}
          <Link
            href="/about"
            className="text-solarized-blue hover:text-solarized-cyan hover:underline"
          >
            {" "}
            read more...
          </Link>
        </p>
      </section>

      {recentPosts.length > 0 && (
        <>
          {/* Terminal prompt for blog section */}
          <div className="text-solarized-yellow text-sm mb-4 opacity-70">
            <span>rithy@localhost:~$ ls -la blog/recent/</span>
          </div>

          <section className="mb-8 sm:mb-12">
            <div className="space-y-3 sm:space-y-4">
              {recentPosts.map((post) => (
                <article
                  key={post.slug}
                  className="mb-3 sm:mb-4 pb-2 border-b border-solarized-base2"
                >
                  {/* Title */}
                  <Link
                    href={`/writing/${post.slug}`}
                    className="text-solarized-cyan hover:text-solarized-blue hover:underline text-sm font-medium block py-1 -mx-1 px-1"
                  >
                    {post.title}
                  </Link>

                  {/* Date */}
                  <div className="text-xs sm:text-sm text-solarized-base1">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </time>
                  </div>
                </article>
              ))}
            </div>

            {posts.length > 9 && (
              <div className="mt-4 sm:mt-6">
                <Link
                  href="/writing"
                  className="text-solarized-blue hover:text-solarized-cyan hover:underline"
                >
                  more →
                </Link>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
