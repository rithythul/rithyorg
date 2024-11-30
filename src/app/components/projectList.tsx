// src/app/projects/components/projectList.tsx
'use client'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="min-w-[300px] max-w-[350px] border border-foreground/20 rounded-lg p-6 hover:border-foreground/40 transition-all">
      <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
      <p className="text-foreground/70 mb-4 text-sm">{project.description}</p>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex} 
              className="text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      {project.link && (
        <Link
          href={project.link}
          className="text-blue-600 hover:underline text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          visit →
        </Link>
      )}
    </div>
  )
}

export function ProjectList({ projects }: { projects: Project[] }) {
  // Split projects into rows of 3
  const rows = projects.reduce((acc, _, index) => {
    if (index % 2 === 0) {
      acc.push(projects.slice(index, index + 3));
    }
    return acc;
  }, [] as Project[][]);

  return (
    <div className="space-y-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="relative">
          <div className="overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
            <div className="flex space-x-4">
              {row.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}