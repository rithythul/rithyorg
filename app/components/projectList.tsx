// app/projects/components/projectList.tsx
'use client'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  industry: string[]
  link?: string
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-6">
      {/* <h1 className="text-2xl font-bold">Projects Line</h1> */}
      <ul className="space-y-4">
        {projects.map((project, index) => (
          <li 
            key={index} 
            className="space-y-2 border border-foreground/20 rounded-md p-4 flex flex-col items-center text-center"
          >
            <Link
              href={project.link || '#'}
              className="text-blue-500 hover:underline text-lg font-semibold"
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
            >
              {project.title}
            </Link>
            <p className="text-sm text-foreground/70">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.industry.map((tech, techIndex) => (
                <span 
                  key={techIndex} 
                  className="text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
