import projects from "@/content/pages/projects.json";
import PageHeader from "@/components/page-header";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Projects", "Companies and projects rithythul started or works on in Cambodia.", "/projects");

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export default function ProjectsPage() {
  return (
    <div className="shell page">
      <PageHeader eyebrow={`${projects.length} companies and projects`} title="Projects">
        <p>
          Companies and projects I started or work on. For their current status, see{" "}
          <a href="https://smallworld.xyz/">
            smallworld <span aria-hidden="true">↗</span>
          </a>
          .
        </p>
      </PageHeader>
      <ul className="link-list">
        {projects.map((project) => (
          <li key={project.title}>
            <a href={project.url}>
              <span className="link-list-name">{project.title}</span>
              <span className="link-list-detail">{project.description}</span>
              <span className="link-list-meta">
                {host(project.url)} <span aria-hidden="true">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
