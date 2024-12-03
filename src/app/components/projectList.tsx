// src/app/projects/components/projectList.tsx
'use client'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
}

function AbstractBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="50%" cy="50%" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
      <path d="M 0 15 Q 15 0, 30 15 T 60 15" stroke="currentColor" fill="none" strokeWidth="0.5"/>
    </svg>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="relative min-w-[300px] max-w-[350px] border border-foreground/20 rounded-lg p-6 hover:border-foreground/40 transition-all overflow-hidden">
      <AbstractBackground />
      <div className="relative z-10">
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