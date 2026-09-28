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
          I also work on Selendra, StadiumX, and VitaminAir. The aim is profitable businesses, run by the people
          who build them. <a href="https://smallworld.xyz/">smallworld</a> has the current news on each company.
        </p>

        <h2>Learning</h2>
        <p>
          I learn by running companies, and away from them: cycling, camping, running, time in nature, and long
          conversations. I want a free life, close to nature.
        </p>

        <h2>Writing</h2>
        <p>
          I write down what the work teaches me. My first book, <a href="/book">{book.title}</a>, is in progress.
        </p>

        <h2>Work with me</h2>
        <p>
          Young Cambodians who want to build, partners, funders, and investors: start at{" "}
          <a href="https://smallworld.xyz/">smallworld</a>, or <a href="/social">reach me directly</a>.
        </p>
      </div>
      <a className="text-link" href="/writing">
        Read my writing <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
