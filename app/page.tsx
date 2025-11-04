import Link from "next/link";
import { getBlogPosts } from "./lib/writing";

export default async function Home() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 9); // Show up to 9 posts

  return (
    <div>
      <section className="mb-8 sm:mb-12">
        <h1 className="text-4xl font-bold mb-4">Rithy Thul</h1>
        <p className="text-xl leading-relaxed">
          I'm{" "}
          <Link
            href="https://x.com/rithythul"
            className="underline"
          >
            rithythul
          </Link>
          . I like running, cycling, football, adventure, time in nature,
          vipassana, computer, and programming.
        </p>
        <p className="text-xl leading-relaxed">
          Currently building tech ventures at smallworld. I am also into web3
          and blockchain.{" "}
          <Link
            href="/about"
            className="underline"
          >
            {" "}
            Read more...
          </Link>
        </p>
      </section>

      {recentPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <article key={post.slug} className="pb-2 border-b">
                <Link
                  href={`/writing/${post.slug}`}
                  className="text-2xl font-medium block"
                >
                  {post.title}
                </Link>
                <div className="text-lg">
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
            <div className="mt-6">
              <Link
                href="/writing"
                className="text-xl underline"
              >
                More →
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
