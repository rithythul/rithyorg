import Link from 'next/link'

interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: "personal portfolio website",
    description: "a minimalist portfolio website built with next.js and tailwind css. features a clean design with a writing section and project showcase.",
    technologies: ["next.js", "react", "tailwind css"],
    link: "https://github.com/yourusername/portfolio"
  },
  {
    title: "task management app",
    description: "a full-stack task management application with user authentication, real-time updates, and a responsive design.",
    technologies: ["react", "node.js", "express", "mongodb", "socket.io"],
    link: "https://github.com/yourusername/task-manager"
  },
  {
    title: "weather forecast app",
    description: "a weather forecast application that provides real-time weather data and 5-day forecasts for any location.",
    technologies: ["react", "openweathermap api", "chart.js"],
    link: "https://github.com/yourusername/weather-app"
  }
]

export default function Projects() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">projects</h1>
      <div className="space-y-12">
        {projects.map((project, index) => (
          <div key={index} className="border-t border-foreground/20 pt-8">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-foreground/70 mb-4">{project.description}</p>
            <div className="mb-4">
              <strong className="text-foreground/90">technologies used:</strong>
              <ul className="list-disc list-inside ml-4">
                {project.technologies.map((tech, techIndex) => (
                  <li key={techIndex} className="text-foreground/70">{tech}</li>
                ))}
              </ul>
            </div>
            {project.link && (
              <Link
                href={project.link}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                view project
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}