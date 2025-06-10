// app/projects/components/projectList.tsx
"use client";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  industry: string[];
  link?: string;
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* <h1 className="text-2xl font-bold">Projects Line</h1> */}
      <ul className="space-y-3 sm:space-y-4">
        {projects.map((project, index) => (
          <li
            key={index}
            className="space-y-2 border border-solarized-base2 p-3 sm:p-4 flex flex-col items-left text-left terminal-window pt-6 sm:pt-8 relative"
          >
            <Link
              href={project.link || "#"}
              className="text-solarized-blue hover:text-solarized-cyan hover:underline text-sm font-medium py-1 -mx-1 px-1"
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
            >
              {project.title}
            </Link>
            <p className="text-xs text-solarized-base0 font-light leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.industry.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="text-xs px-1.5 sm:px-2 py-1 bg-solarized-base2 text-solarized-base01"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
