// app/projects/page.tsx
import { ProjectList } from "../components/projectList";

interface Project {
  title: string;
  description: string;
  industry: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: "smallworld",
    description: "a venture builders based in Phnom Penh",
    industry: ["startup", "community"],
    link: "https://smallworldventure.com",
  },
  {
    title: "koompi",
    description: "compute for cambodia",
    industry: ["laptop", "mini pc", "elearning", "computer lab"],
    link: "https://koompi.com",
  },
  {
    title: "weteka",
    description: "digital school for 21st century education",
    industry: ["digital school", "learn to earn", "school management"],
    link: "https://weteka.org",
  },
  {
    title: "selendra",
    description:
      "evm compatible blockchain to bridge cambodia to blockchain space",
    industry: ["L1", "gas sponsorship", "dapp"],
    link: "https://selendra.org",
  },
  {
    title: "baray",
    description: "payment page for startups and SMEs",
    industry: ["fintech", "service"],
    link: "https://baray.io",
  },
  {
    title: "stadiumx",
    description:
      "stadium and sport managememt for merchandise and matches tickets",
    industry: ["tickets", "stadium", "merchandize", "cashback"],
    link: "https://stadiumx.asia",
  },
  {
    title: "riverbase",
    description: "headless ecommerce for small businesses in Cambodia",
    industry: ["website", "telegram app", "shop"],
    link: "https://riverbase.org",
  },
  {
    title: "virtual office",
    description: "virtual space and professional office for SMEs and startups",
    industry: ["virtual", "startup", "office"],
    link: "https://smallworldventure.com",
  },
];

export default function Projects() {
  return (
    <div>
      {/* Terminal prompt simulation */}
      <div className="text-solarized-yellow text-sm mb-4 opacity-60 text-left">
        <span>rithy@localhost:~$ ps -aux | grep projects</span>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
