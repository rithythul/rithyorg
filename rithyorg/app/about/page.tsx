import type { Metadata } from "next";
import Link from "next/link";
import { getBook } from "@/lib/book";

export const metadata: Metadata = {
  title: "About",
  description:
    "rithythul lives in Cambodia and started SmallWorld and KOOMPI.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const book = getBook();

  return (
    <div className="shell">
      <div className="reading">
        <header className="page-head">
          <h1 className="page-title">About</h1>
        </header>

        <div className="prose">
          <p>
            I live in Cambodia. I started SmallWorld, where we start companies
            and learn by running them. Young people learn beside the team,
            take responsibility, and eventually lead companies of their own.
          </p>
          <p>
            I also started KOOMPI. My work includes Selendra, StadiumX, and
            VitaminAir. For current information about the companies, see{" "}
            <a href="https://smallworld.xyz/">smallworld.xyz</a>.
          </p>
          <p>
            I want profitable businesses and a free life close to nature.
            Away from work I cycle, camp, run, spend time outdoors, and enjoy
            long conversations.
          </p>
          <p>
            I am writing my first book,{" "}
            <Link href="/book">{book.title}</Link>. This site holds my writing
            and a short series of crypto news digests.
          </p>
        </div>
      </div>
    </div>
  );
}
