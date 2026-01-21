import Navigation from "../Navigation";
import type { ProjectLayout3 } from "../../../../types";
import LabeledGallery from "./LabeledGallery";
import "../../../../styles/project/ProjectLayout3.css";

interface ProjectLayout3Props {
  project: ProjectLayout3;
}

export default function ProjectLayout3({ project }: ProjectLayout3Props) {
  return (
    <div className="project-detail project-layout-3">
      <Navigation project={project} />
      <div className="layout3-outer">
        <div className="layout3-inner">
          <div className="layout3-container">
            <div className="layout3-header">
              <h1 className="project-title">{project.titre}</h1>
              <h2 className="project-subtitle">{project.subtitle}</h2>
            </div>
            <div className="project-description-text">
              {project.long_description}
            </div>

            {project.labeled_gallery && (
              <LabeledGallery items={project.labeled_gallery} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
