import book from "@/content/pages/book.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "rithythul started smallworld in 2011 and builds startups in Cambodia with the team at smallworld.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="reading page">
      <h1>About</h1>
      <div className="prose">
        <p>
          Started smallworld in 2011, and now builds <a href="https://koompi.com">KOOMPI</a>,{" "}
          <a href="https://selendra.org">Selendra</a>, <a href="https://stadiumx.asia">StadiumX</a>,{" "}
          <a href="https://riverbase.app">Riverbase</a>, <a href="https://baray.io">Baray</a>, and{" "}
          <a href="https://vitaminair.org">VitaminAir</a> with the team at{" "}
          <a href="https://smallworld.xyz/">smallworld</a>.
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
