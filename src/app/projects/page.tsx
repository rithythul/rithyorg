import Link from 'next/link'

interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: "smallworld",
    description: "a venture builders based in Phnom Penh",
    technologies: ["blockchain", "saas", "ticketing", "ecommerce"],
    link: "https://smallworldventure.com"
  },
  {
    title: "koompi",
    description: "computer for cambodia",
    technologies: ["laptop", "mini pc", "elearning", "computer lab"],
    link: "https://koompi.com"
  },
  {
    title: "weteka",
    description: "digital school platform for 21st century education",
    technologies: ["digital school", "premium course content platform", "learn to earn", "school management"],
    link: "https://weteka.org"
  },
  {
    title: "selendra",
    description: "evm compatible blockchain L2 ethereum scaling solution to bridge cambodia internet users to blockchain space",
    technologies: ["L2", "gas sponsorship", "dapp"],
    link: "https://selendra.org"
  },
  {
    title: "baray",
    description: "payment page for ecommerce",
    technologies: ["fintech", "service"],
    link: "https://baray.io"
  },
  {
    title: "stadiumx",
    description: "stadium and sport managememt for merchandise and matches tickets",
    technologies: ["tickets", "stadium", "merchandize", "cashback"],
    link: "https://stadiumx.asia"
  },
  {
    title: "riverbase",
    description: "headless ecommerce for small businesses in Cambodia",
    technologies: ["website", "telegram app", "shop"],
    link: "https://riverbase.org"
  },
  {
    title: "virtual office",
    description: "professional office for small businesses and startup, virtual space",
    technologies: ["virtual", "startup", "office"],
    link: "https://smallworldventure.com"
  }
]

export default function Projects() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">projects</h1>
      <div className="space-y-12">
        {projects.map((project, index) => (
          <div key={index} className="border-t border-foreground/20 pt-8">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-foreground/70 mb-4">{project.description}</p>
            <div className="mb-4">
              <strong className="text-foreground/90">features:</strong>
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
                link
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}