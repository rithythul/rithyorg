import projects from "@/content/pages/projects.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Projects", "An archive of projects and work connected to rithythul.", "/projects");

export default function ProjectsPage() {
  return (
    <div className="reading page">
      <h1>Projects</h1>
      <p className="page-intro">
        Descriptions from the existing project archive. For current company information, visit{" "}
        <a href="https://smallworld.xyz/">
          smallworld <span aria-hidden="true">↗</span>
        </a>
        .
      </p>
      <div className="prose">
        {projects.map((project) => (
          <section key={project.title}>
            <h2>
              {project.url ? (
                <a href={project.url}>
                  {project.title} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                project.title
              )}
            </h2>
            <p>{project.description}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
