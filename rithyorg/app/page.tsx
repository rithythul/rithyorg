import type { Metadata } from "next";
import Link from "next/link";
import BookFeature from "./components/book-feature";
import WritingList from "./components/writing-list";
import { getBook } from "@/lib/book";
import { getCurated } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "rithythul · Writing, building, Cambodia" },
  description:
    "I started SmallWorld. I write about the things we build, the people I learn from, and life along the way. My first book, The Things We Chose to Build, is being written.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const book = getBook();
  const curated = getCurated(4);

  return (
    <div className="shell">
      <section className="hero" aria-labelledby="home-title">
        <h1 id="home-title">
          {/* Non-breaking spaces keep each separator with its word. */}
          Writing&nbsp;· Building&nbsp;· Cambodia
        </h1>
        <div className="hero-intro">
          <p>
            I started SmallWorld. I write about the things we build, the
            people I learn from, and life along the way.
          </p>
          <Link href="/about" className="text-link">
            A little about me
          </Link>
        </div>
      </section>

      <BookFeature book={book} />

      <section className="section" aria-labelledby="notes-title">
        <div className="section-head">
          <h2 id="notes-title" className="section-title">
            Notes &amp; writing
          </h2>
          <Link href="/writing" className="text-link">
            All writing
          </Link>
        </div>
        {curated.length > 0 ? (
          <WritingList posts={curated} />
        ) : (
          <p className="empty-note">Nothing published yet.</p>
        )}
      </section>

      <section className="company-section" aria-labelledby="company-title">
        <div>
          <p className="eyebrow">SmallWorld</p>
          <h2 id="company-title">
            We start companies. We learn by running them.
          </h2>
        </div>
        <div>
          <p>
            At SmallWorld, young people learn beside the team, take
            responsibility, and eventually lead companies of their own.
          </p>
          <a href="https://smallworld.xyz/" className="text-link">
            Visit smallworld
          </a>
        </div>
      </section>
    </div>
  );
}
