import book from "@/content/pages/book.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "Started smallworld in 2011. Now building startups with the team at smallworld, learning by experimenting, and writing down what the work teaches.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="reading page">
      <h1>About</h1>
      <div className="prose">
        <p>
          Started smallworld in 2011. Now building <a href="https://koompi.com">KOOMPI</a>,{" "}
          <a href="https://selendra.org">Selendra</a>, <a href="https://stadiumx.asia">StadiumX</a>,{" "}
          <a href="https://riverbase.app">Riverbase</a>, <a href="https://baray.io">Baray</a>, and{" "}
          <a href="https://vitaminair.org">VitaminAir</a> with the team at{" "}
          <a href="https://smallworld.xyz/">smallworld</a>.
        </p>
        <p>
          Learning by experimenting, by running companies, and from mentors, whether they know it or not.
        </p>
        <p>
          Writing down what the work teaches, including a first book, <a href="/book">{book.title}</a>, still in
          progress.
        </p>
        <p>
          Cycling, camping, running, and long conversations, close to nature. Working toward a free life there.
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
