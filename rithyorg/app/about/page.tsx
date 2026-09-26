import type { Metadata } from "next";
import Link from "next/link";
import { getBook } from "@/lib/book";

export const metadata: Metadata = {
  title: "About",
  description:
    "rithythul co-founded SmallWorld in Phnom Penh in 2011, then KOOMPI, VitaminAir, and Selendra with the team.",
  alternates: { canonical: "/about" },
};

// Facts come from the biography on the previous rithy.org.
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
            I live in Cambodia. In 2011 I co-founded SmallWorld, a venture
            builder and startup space in Phnom Penh. We start companies and
            learn by running them. Young people learn beside the team, take
            responsibility, and eventually lead companies of their own.
          </p>
          <p>
            In 2017 we started KOOMPI, an open-source computer company, and
            VitaminAir, a pilot natural-living community and reforestation
            project. In 2019 our team built Selendra, a layer 1 blockchain for
            real-world asset tokenization and loyalty programs.
          </p>
          <p>
            Since 2020 we have grown a team of developers who make web3 and
            enterprise software with local and global companies. We have helped
            around 50 startups and installed computer labs in 63 schools across
            Cambodia. We also develop and maintain sports ticketing (StadiumX),
            a reverse-marketplace e-commerce service, and payments for SMEs.
          </p>
          <p>
            I want profitable businesses and a free life close to nature. Away
            from work I cycle, camp, run, practise vipassana, spend time
            outdoors, and enjoy long conversations.
          </p>
          <p>
            I am writing my first book,{" "}
            <Link href="/book">{book.title}</Link>.
          </p>
          <p>
            More: <Link href="/projects">projects</Link>,{" "}
            <Link href="/social">where to find me</Link>, and{" "}
            <a href="https://smallworld.xyz/">smallworld.xyz</a> for current
            company information.
          </p>
        </div>
      </div>
    </div>
  );
}
