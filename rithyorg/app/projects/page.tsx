import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Companies and projects rithythul has worked on in Cambodia.",
  alternates: { canonical: "/projects" },
};

// Carried over from the previous rithy.org projects page.
const PROJECTS = [
  {
    name: "SmallWorld",
    description: "A venture builder based in Phnom Penh.",
    href: "https://smallworld.xyz/",
  },
  {
    name: "KOOMPI",
    description: "Computers for Cambodia.",
    href: "https://koompi.com",
  },
  {
    name: "Weteka",
    description: "A digital school for 21st-century education.",
    href: "https://weteka.org",
  },
  {
    name: "Selendra",
    description:
      "An EVM-compatible blockchain to bring Cambodia into the blockchain space.",
    href: "https://selendra.org",
  },
  {
    name: "Baray",
    description: "Payment pages for startups and SMEs.",
    href: "https://baray.io",
  },
  {
    name: "StadiumX",
    description: "Stadium and sports management for merchandise and match tickets.",
    href: "https://stadiumx.asia",
  },
  {
    name: "Riverbase",
    description: "Headless e-commerce for small businesses in Cambodia.",
    href: "https://riverbase.org",
  },
  {
    name: "Virtual Office",
    description: "A virtual space and professional office for SMEs and startups.",
    href: "https://smallworld.xyz/",
  },
];

export default function ProjectsPage() {
  return (
    <div className="shell">
      <header className="page-head">
        <h1 className="page-title">Projects</h1>
        <p className="page-lede">
          Work I have been part of. For current company information, see{" "}
          <a href="https://smallworld.xyz/">smallworld.xyz</a>.
        </p>
      </header>

      <ul className="writing-list pairs">
        {PROJECTS.map((project) => (
          <li key={project.name}>
            <a href={project.href} className="writing-row">
              <span className="title">{project.name}</span>
              <span className="row-note">{project.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
