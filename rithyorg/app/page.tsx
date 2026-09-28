import BookFeature from "@/components/book-feature";
import WritingList from "@/components/writing-list";
import { getCuratedPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const intro =
  "I build startups in Cambodia with smallworld. I write about the companies we start, the people I learn from, and the life around the work.";

export const metadata = {
  ...pageMetadata("Building, Learning, Writing", intro, "/"),
  title: { absolute: "rithythul · Building, Learning, Writing" },
};

export default function Home() {
  return (
    <div className="shell">
      <section className="hero">
        <h1>
          <span>Building</span> <span>Learning</span> <span>Writing</span>
        </h1>
        <div className="hero-copy">
          <p>{intro}</p>
          <a className="text-link" href="/about">
            A little about me <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <BookFeature />

      <section className="home-writing" aria-labelledby="writing-title">
        <div className="section-heading">
          <h2 id="writing-title">Notes &amp; writing</h2>
          <a href="/writing">
            All writing <span aria-hidden="true">→</span>
          </a>
        </div>
        <WritingList posts={getCuratedPosts()} />
      </section>

      <section className="smallworld-section" aria-labelledby="smallworld-title">
        <h2 id="smallworld-title">smallworld</h2>
        <div>
          <p className="lead">We start companies. We learn by running them.</p>
          <p>
            At smallworld, young people learn beside the team, take responsibility, and eventually lead
            companies of their own.
          </p>
          <a className="text-link" href="https://smallworld.xyz/">
            Visit smallworld <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
