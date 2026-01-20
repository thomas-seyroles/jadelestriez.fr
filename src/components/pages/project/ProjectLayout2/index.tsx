import Navigation from "../Navigation";
import MainImage from "./MainImage";
import TextContent from "./TextContent";
import Gallery from "./Gallery";
import type { Project } from "../../../../types";
import "../../../../styles/project/ProjectLayout2.css";

interface ProjectLayout2Props {
  project: Project;
}

export default function ProjectLayout2({ project }: ProjectLayout2Props) {
  return (
    <div className="project-detail project-layout-2">
      <Navigation project={project} />

      <div className="layout2-container">
        <div className="layout2-outer">
          <div className="layout2-inner">
            <header className="layout2-header">
              <h1 className="project-title">{project.titre}</h1>
            </header>

            <div className="layout2-content">
              <MainImage project={project} />
              <TextContent project={project} />
              <Gallery project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
