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
        <h2>Building</h2>
        <p>
          Started smallworld and KOOMPI. Works on Selendra, StadiumX, <a href="https://riverbase.app">Riverbase</a>,{" "}
          <a href="https://baray.io">Baray</a>, and VitaminAir, with profitable businesses as the goal.{" "}
          <a href="https://smallworld.xyz/">smallworld</a> has current information on each company.
        </p>

        <h2>Learning</h2>
        <p>
          Learns by experimenting, by running companies, and from people counted as mentors, whether they know it
          or not.
        </p>

        <h2>Writing</h2>
        <p>
          Writes down what the work teaches. The first book, <a href="/book">{book.title}</a>, follows the
          journey of learning while building, and is in progress.
        </p>

        <h2>Outside work</h2>
        <p>
          Cycling, camping, running, time in nature, and long conversations. The aim is a free life, close to
          nature.
        </p>

        <h2>Work together</h2>
        <p>
          To build with smallworld, partner, fund, or invest, start at{" "}
          <a href="https://smallworld.xyz/">smallworld</a> or <a href="/social">get in touch</a>.
        </p>
      </div>
      <a className="text-link" href="/writing">
        Read the writing <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
