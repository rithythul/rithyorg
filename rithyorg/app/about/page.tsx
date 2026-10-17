import book from "@/content/pages/book.json";
import PageHeader from "@/components/page-header";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "Started smallworld in 2011. Now building startups with the team at smallworld, learning by experimenting, and writing down what the work teaches.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="reading page">
      <PageHeader eyebrow="Phnom Penh, Cambodia" title="About" />
      <div className="about-rows prose">
        <section>
          <h2 className="label">Building</h2>
          <p>
            Started smallworld in 2011. Now building <a href="https://koompi.com">KOOMPI</a>,{" "}
            <a href="https://selendra.org">Selendra</a>, <a href="https://stadiumx.asia">StadiumX</a>,{" "}
            <a href="https://riverbase.app">Riverbase</a>, <a href="https://baray.io">Baray</a>, and{" "}
            <a href="https://vitaminair.org">VitaminAir</a> with the team at{" "}
            <a href="https://smallworld.xyz/">smallworld</a>.
          </p>
        </section>
        <section>
          <h2 className="label">Learning</h2>
          <p>Learning by experimenting, by running companies, and from mentors, whether they know it or not.</p>
        </section>
        <section>
          <h2 className="label">Writing</h2>
          <p>
            Writing down what the work teaches, including a first book,{" "}
            <a href="/book">{`${book.title}: ${book.subtitle}`}</a>, still in progress.
          </p>
        </section>
        <section>
          <h2 className="label">Outside work</h2>
          <p>Cycling, camping, running, and long conversations, close to nature. Working toward a free life there.</p>
        </section>
        <section>
          <h2 className="label">Work together</h2>
          <p>
            To build with smallworld, partner, fund, or invest, start at{" "}
            <a href="https://smallworld.xyz/">smallworld</a> or <a href="/social">get in touch</a>.
          </p>
        </section>
      </div>
      <a className="text-link" href="/writing">
        Read the writing <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
