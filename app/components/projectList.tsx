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
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <article
            key={index}
            className="group relative flex flex-col space-y-3 pb-8 border-b border-border last:border-0"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-medium tracking-tight">
                {project.link ? (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cream-accent transition-colors"
                  >
                    {project.title}
                    <span className="ml-1 text-muted text-sm font-normal">↗</span>
                  </Link>
                ) : (
                  <span>{project.title}</span>
                )}
              </h3>
            </div>

            <p className="text-muted leading-relaxed max-w-2xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {project.industry.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="text-xs font-mono text-muted/80 bg-cream-muted/10 px-2 py-1 rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
