import book from "@/content/pages/book.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "I started smallworld and KOOMPI. I live in Cambodia and write about building startups and the life around the work.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="reading page">
      <h1>About</h1>
      <div className="prose">
        <p className="lead">I started smallworld and KOOMPI. I live in Cambodia.</p>

        <h2>The work</h2>
        <p>
          My work includes Selendra, StadiumX, and VitaminAir. I want to build profitable businesses and have
          a free life close to nature.
        </p>
        <p>
          <a href="https://smallworld.xyz/">smallworld</a> is where to find current information about the
          companies and the people building them.
        </p>

        <h2>Life along the way</h2>
        <p>I enjoy cycling, camping, running, nature, and long conversations.</p>

        <h2>Writing</h2>
        <p>
          I write about the companies we start, the people I learn from, and the life around the work. I’m also
          writing my first book, <a href="/book">{book.title}</a>.
        </p>
      </div>
      <a className="text-link" href="/writing">
        Read my writing <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
