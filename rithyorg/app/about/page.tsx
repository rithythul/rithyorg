import book from "@/content/pages/book.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "rithythul builds startups in Cambodia and started smallworld and KOOMPI.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="reading page">
      <h1>About</h1>
      <div className="prose">
        <p className="lead">I build startups in Cambodia. I started smallworld and KOOMPI.</p>

        <h2>Building</h2>
        <p>
          I also work on Selendra, StadiumX, and VitaminAir. I want to build profitable businesses.{" "}
          <a href="https://smallworld.xyz/">smallworld</a> has current information on each company.
        </p>

        <h2>Learning</h2>
        <p>
          I learn by experimenting, by running companies, and from people I count as mentors, whether they know
          it or not.
        </p>

        <h2>Writing</h2>
        <p>
          I write down what the work teaches me. My first book, <a href="/book">{book.title}</a>, follows my
          journey of learning while building. It is in progress.
        </p>

        <h2>Outside work</h2>
        <p>
          Cycling, camping, running, time in nature, and long conversations. I want a free life, close to
          nature.
        </p>

        <h2>Work with me</h2>
        <p>
          To build with smallworld, partner, fund, or invest, start at{" "}
          <a href="https://smallworld.xyz/">smallworld</a> or <a href="/social">write to me</a>.
        </p>
      </div>
      <a className="text-link" href="/writing">
        Read my writing <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
