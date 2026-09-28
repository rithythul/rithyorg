import projects from "@/content/pages/projects.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Projects", "Companies and projects rithythul started or works on in Cambodia.", "/projects");

export default function ProjectsPage() {
  return (
    <div className="reading page">
      <h1>Projects</h1>
      <p className="page-intro">
        Companies and projects I started or work on. For their current status, see{" "}
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
