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
        <p>
          Started smallworld and <a href="https://koompi.com">KOOMPI</a>. Works on <a href="https://selendra.org">Selendra</a>,{" "}
          <a href="https://stadiumx.asia">StadiumX</a>, <a href="https://riverbase.app">Riverbase</a>,{" "}
          <a href="https://baray.io">Baray</a>, and <a href="https://vitaminair.org">VitaminAir</a>, with profitable
          businesses as the goal.{" "}
          <a href="https://smallworld.xyz/">smallworld</a> has current information on each company.
        </p>

        <p>
          Learns by experimenting, by running companies, and from people counted as mentors, whether they know it
          or not.
        </p>

        <p>
          Writes down what the work teaches. The first book, <a href="/book">{book.title}</a>, follows the
          journey of learning while building, and is in progress.
        </p>

        <p>
          Cycling, camping, running, time in nature, and long conversations. The aim is a free life, close to
          nature.
        </p>

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
