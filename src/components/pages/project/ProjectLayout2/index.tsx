import Navigation from "../Navigation";
import type { Project } from "../../../../types";

interface ProjectLayout2Props {
  project: Project;
}

export default function ProjectLayout2({ project }: ProjectLayout2Props) {
  return (
    <div className="project-detail project-layout-2">
      <Navigation project={project} />
      {/* Placeholder for layout 2 content */}
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <h1>{project.titre}</h1>
        <p>Layout 2 en cours de développement...</p>
      </div>
    </div>
  );
}
