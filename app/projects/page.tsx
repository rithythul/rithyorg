// app/projects/page.tsx
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  industry: string[];
  link?: string;
  year: string;
  status: "Active" | "Building" | "Acquired" | "Idea";
}

const projects: Project[] = [
  {
    title: "SmallWorld",
    description: "A venture builder ecosystem based in Phnom Penh. We provide the space, capital, and mentorship for Cambodia's next generation of startups.",
    industry: ["Venture Building", "Community"],
    link: "https://smallworld.xyz",
    year: "2011",
    status: "Active",
  },
  {
    title: "KOOMPI",
    description: "Compute for Cambodia. Building affordable, Linux-based hardware and software tools for students and engineers.",
    industry: ["Hardware", "EdTech", "OS"],
    link: "https://koompi.com",
    year: "2018",
    status: "Active",
  },
  {
    title: "Weteka",
    description: "A digital school platform designed for 21st-century education, focusing on STEAM and vocational skills.",
    industry: ["EdTech", "LMS"],
    link: "https://weteka.org",
    year: "2020",
    status: "Building",
  },
  {
    title: "Selendra",
    description: "An EVM-compatible blockchain network bridging Cambodia to the global Web3 ecosystem.",
    industry: ["Blockchain", "Layer 1"],
    link: "https://selendra.org",
    year: "2021",
    status: "Active",
  },
  {
    title: "Baray",
    description: "A seamless payment gateway for startups and SMEs to accept payments easily.",
    industry: ["FinTech", "Payments"],
    link: "https://baray.io",
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
    link: "https://smallworld.xyz",
    year: "2024",
    status: "Idea",
  },
];

export default function Projects() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, index) => {
          const isFeatured = index === 0;
          return (
            <article
              key={index}
              className={`group relative flex flex-col justify-between p-8 md:p-10 border border-foreground/10 hover:border-amber-600/50 bg-white/50 hover:bg-amber-50/30 transition-all duration-300 ${isFeatured ? "md:col-span-2 bg-foreground/5" : ""
                }`}
            >
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                />
              )}

              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-wrap gap-2">
                    {project.industry.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider border border-foreground/10 px-2 py-1 rounded-sm bg-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted">
                      {project.year}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${project.status === 'Active' ? 'border-green-500/30 text-green-700 bg-green-50' :
                      project.status === 'Building' ? 'border-blue-500/30 text-blue-700 bg-blue-50' :
                        'border-foreground/10 text-muted'
                      }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="relative">

                  <h2 className={`font-serif font-bold tracking-tight group-hover:underline decoration-1 underline-offset-4 ${isFeatured ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"
                    }`}>
                    {project.title}
                  </h2>
                </div>

                <p className={`font-sans text-muted-foreground leading-relaxed ${isFeatured ? "text-xl max-w-2xl" : "text-lg max-w-md"
                  }`}>
                  {project.description}
                </p>
              </div>

              <div className="pt-8 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-xs text-muted group-hover:text-foreground transition-colors">
                  {project.link ? project.link.replace('https://', '') : ''}
                </span>
                <span className="text-lg">↗</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
