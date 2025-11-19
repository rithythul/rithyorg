import Link from "next/link";
import { getBlogPosts } from "./lib/writing";

export default async function Home() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 13); // Fetch enough for the grid

  return (
    <div className="space-y-20 pb-20">
      {/* Kinetic Hero Section */}
      <section className="pt-20 pb-12 border-b border-foreground/10">
        <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-foreground leading-[0.85]">
          The <br />
          <span className="italic text-muted-foreground hover:text-foreground transition-colors duration-500 cursor-default">
            Living
          </span>{" "}
          <br />
          Archive
        </h1>
        <div className="mt-8 flex justify-between items-end max-w-xl">
          <p className="font-mono text-sm text-muted max-w-[200px]">
            A digital broadsheet for ideas, systems, and ventures.
          </p>
          <div className="h-px bg-foreground/20 flex-grow ml-8" />
        </div>
      </section>

      {/* Bento / Masonry Grid Feed */}
      <main className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 auto-rows-auto md:auto-rows-[260px]">
        {recentPosts.map((post, index) => {
          // Grid Logic:
          // Index 0: Featured (Full width or large block) -> col-span-6 md:col-span-4 md:row-span-2
          // Index 1: Secondary (Tall) -> col-span-6 md:col-span-2 md:row-span-2
          // Index 2, 3, 4: Standard -> col-span-6 md:col-span-2
          // Index 5: Wide -> col-span-6 md:col-span-3
          // Index 6: Wide -> col-span-6 md:col-span-3

          let gridClass = "col-span-1 md:col-span-2"; // Default
          if (index === 0) gridClass = "col-span-1 md:col-span-4 md:row-span-2";
          if (index === 1) gridClass = "col-span-1 md:col-span-2 md:row-span-2";
          if (index === 5 || index === 6) gridClass = "col-span-1 md:col-span-3";

          return (
            <article
              key={post.slug}
              className={`group relative flex flex-col justify-between p-6 md:p-8 border border-foreground/10 hover:border-foreground/30 bg-white/50 hover:bg-white transition-all duration-300 ${gridClass}`}
            >
              <Link href={`/writing/${post.slug}`} className="absolute inset-0 z-10" />

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-muted uppercase tracking-wider">
                    {post.slug.split('-')[0] || 'Note'} {/* Fallback category/tag simulation */}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h2 className={`font-serif font-bold leading-tight group-hover:underline decoration-1 underline-offset-4 ${index === 0 ? "text-4xl md:text-6xl" :
                  index === 1 ? "text-3xl md:text-4xl" :
                    "text-2xl md:text-3xl"
                  }`}>
                  {post.title}
                </h2>


              </div>

              <div className="pt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-xs">Read Article</span>
                <span className="text-xs">→</span>
              </div>
            </article>
          );
        })}
      </main>

      <div className="flex justify-center pt-12 border-t border-foreground/10">
        <Link
          href="/writing"
          className="font-mono text-sm text-muted hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
        >
          View Full Archive
        </Link>
      </div>
    </div>
  );
}
