// app/projects/page.tsx
import Link from "next/link";

interface SubProject {
  title: string;
  description: string;
  link?: string;
  year: string;
  status: "Active" | "Building" | "Acquired" | "Idea" | "Experimenting";
}

interface Project {
  title: string;
  description: string;
  industry: string[];
  link?: string;
  year: string;
  status: "Active" | "Building" | "Acquired" | "Idea" | "Experimenting";
  subProjects?: SubProject[];
}

const projects: Project[] = [
  {
    title: "SmallWorld",
    description: "A venture builder ecosystem based in Phnom Penh. We provide the space, capital, and mentorship for Cambodia's next generation of startups.",
    industry: ["Venture Building", "Community"],
    link: "https://smallworldventure.com",
    year: "2011",
    status: "Active",
  },
  {
    title: "KOOMPI",
    description: "Compute for Cambodia. Building affordable, Linux-based hardware and software tools for students and engineers.",
    industry: ["Hardware", "EdTech", "OS"],
    link: "https://koompi.com",
    year: "2017",
    status: "Active",
    subProjects: [
      {
        title: "KOOMPI OS",
        description: "Linux-based operating system for education and productivity.",
        link: "https://koompi.org",
        year: "2018",
        status: "Active",
      },
      {
        title: "Weteka",
        description: "A digital school platform designed for 21st-century education.",
        link: "https://weteka.org",
        year: "2020",
        status: "Building",
      },
    ],
  },
  {
    title: "Selendra",
    description: "An EVM-compatible blockchain network bridging Cambodia to the global Web3 ecosystem.",
    industry: ["Blockchain", "Layer 1"],
    link: "https://selendra.org",
    year: "2019",
    status: "Active",
  },
  {
    title: "VitaminAir",
    description: "A reforestation and sustainable living community pilot, exploring regenerative land practices.",
    industry: ["Sustainability", "Community"],
    link: "https://vitaminair.org",
    year: "2017",
    status: "Experimenting",
  },
  {
    title: "Baray",
    description: "A seamless payment gateway for startups and SMEs to accept payments easily.",
    industry: ["FinTech", "Payments"],
    year: "2022",
    status: "Building",
  },
  {
    title: "StadiumX",
    description: "Sport management platform for merchandise, ticketing, and fan engagement.",
    industry: ["Sports", "Ticketing"],
    link: "https://stadiumx.asia",
    year: "2023",
    status: "Building",
  },
  {
    title: "Riverbase",
    description: "Headless e-commerce solution empowering small businesses to sell online.",
    industry: ["E-commerce", "SaaS"],
    link: "https://riverbase.app",
    year: "2023",
    status: "Building",
  },
  {
    title: "Virtual Office",
    description: "Professional virtual space for remote teams and startups to collaborate.",
    industry: ["Remote Work", "SaaS"],
    link: "https://smallworldventure.com",
    year: "2020",
    status: "Active",
  },
  {
    title: "Grood",
    description: "Electric bikes for Cambodia, making urban commuting greener and more accessible.",
    industry: ["Hardware", "Mobility"],
    link: "https://getgrood.com",
    year: "2019",
    status: "Experimenting",
  },
];

export default function Projects() {
  const featured = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <div className="space-y-20 pt-20 pb-20">
      <header className="border-b border-foreground/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[0.9]">
            Ventures
          </h1>
          <p className="font-mono text-muted max-w-xl text-sm md:text-base">
            A timeline of systems, tools, and ecosystems.
          </p>
        </div>
        <div className="font-mono text-xs text-muted uppercase tracking-wider">
          {projects.length} Projects / {projects[0].year} — Present
        </div>
      </header>

      {/* Featured Card - SmallWorld */}
      <article className="group relative p-8 md:p-10 bg-foreground text-background rounded-sm">
        {featured.link && (
          <Link
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
          />
        )}
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-mono text-sm text-white/60 uppercase tracking-wider">
            {featured.industry.join(" / ")}
          </h3>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/60">{featured.year}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/20 text-white/80">
              {featured.status}
            </span>
          </div>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:underline decoration-1 underline-offset-4">
          {featured.title}
        </h2>
        <div className="h-px bg-white/20 my-6" />
        <p className="font-sans text-lg text-white/80 leading-relaxed max-w-2xl">
          {featured.description}
        </p>
        <div className="mt-8 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono text-xs text-white/60 group-hover:text-white transition-colors">
            {featured.link?.replace("https://", "")}
          </span>
          <span className="text-lg">↗</span>
        </div>
      </article>

      {/* Project List */}
      <div className="space-y-1">
        {otherProjects.map((project, index) => (
          <div key={index}>
            <div className="group flex items-center justify-between py-4 border-b border-foreground/10 hover:bg-amber-50/30 transition-colors px-2 -mx-2">
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <span className="font-mono text-xs text-muted w-12 shrink-0">{project.year}</span>
                {project.link ? (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl md:text-2xl font-bold tracking-tight hover:underline decoration-1 underline-offset-4 truncate"
                  >
                    {project.title}
                  </Link>
                ) : (
                  <span className="font-serif text-xl md:text-2xl font-bold tracking-tight truncate">
                    {project.title}
                  </span>
                )}
                <span className="hidden md:block font-sans text-muted-foreground text-sm truncate flex-1">
                  {project.description}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    project.status === "Active"
                      ? "border-green-500/30 text-green-700 bg-green-50"
                      : project.status === "Building"
                      ? "border-blue-500/30 text-blue-700 bg-blue-50"
                      : project.status === "Experimenting"
                      ? "border-amber-500/30 text-amber-700 bg-amber-50"
                      : "border-foreground/10 text-muted"
                  }`}
                >
                  {project.status}
                </span>
                {project.link && <span className="text-muted group-hover:text-foreground transition-colors">↗</span>}
              </div>
            </div>
            {/* Sub-projects */}
            {project.subProjects && (
              <div className="ml-12 border-l border-foreground/10">
                {project.subProjects.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    className="group flex items-center justify-between py-3 pl-6 border-b border-foreground/5 hover:bg-amber-50/20 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className="font-mono text-xs text-muted w-10 shrink-0">{sub.year}</span>
                      {sub.link ? (
                        <Link
                          href={sub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-serif text-lg font-medium tracking-tight hover:underline decoration-1 underline-offset-4"
                        >
                          {sub.title}
                        </Link>
                      ) : (
                        <span className="font-serif text-lg font-medium tracking-tight">
                          {sub.title}
                        </span>
                      )}
                      <span className="hidden md:block font-sans text-muted-foreground text-sm truncate flex-1">
                        {sub.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          sub.status === "Active"
                            ? "border-green-500/30 text-green-700 bg-green-50"
                            : sub.status === "Building"
                            ? "border-blue-500/30 text-blue-700 bg-blue-50"
                            : sub.status === "Experimenting"
                            ? "border-amber-500/30 text-amber-700 bg-amber-50"
                            : "border-foreground/10 text-muted"
                        }`}
                      >
                        {sub.status}
                      </span>
                      {sub.link && <span className="text-muted group-hover:text-foreground transition-colors">↗</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
