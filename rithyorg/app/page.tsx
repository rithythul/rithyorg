import BookFeature from "@/components/book-feature";
import WritingList from "@/components/writing-list";
import { getAllWritingPosts, pickRandom } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const intro =
  "Building startups with the team at smallworld. Learning to be less wrong, at work and in life. Shaping a culture where everyone learns to become the leader they want to see in others.";

// per request: new random essays each visit
export const dynamic = "force-dynamic";

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
          <h2 id="writing-title">From the writing</h2>
          <a href="/writing">
            All writing <span aria-hidden="true">→</span>
          </a>
        </div>
        <WritingList posts={pickRandom(getAllWritingPosts(), 3)} />
      </section>

      <section className="smallworld-section" aria-labelledby="smallworld-title">
        <h2 id="smallworld-title">smallworld</h2>
        <div>
          <p className="lead">Started in 2011. Now building KOOMPI, Selendra, StadiumX, Riverbase, Baray, and VitaminAir.</p>
          <p>
            Young people join the team, work on real products, and take on more as they learn. Some go on to lead
            a company.
          </p>
          <a className="text-link" href="https://smallworld.xyz/">
            Visit smallworld <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
