import type { ProjectLayout3 } from "../../../../types";
import LabeledGallery from "./LabeledGallery";
import styles from "../../../../styles/project/ProjectLayout3.module.css";

interface ProjectLayout3Props {
  project: ProjectLayout3;
}

export default function ProjectLayout3({ project }: ProjectLayout3Props) {
  return (
    <div className={`${styles['project-detail']} ${styles['project-layout-3']}`}>
      <div className={styles['layout3-outer']}>
        <div className={styles['layout3-inner']}>
          <div className={styles['layout3-container']}>
            <div className={styles['layout3-header']}>
              <h1 className={styles['project-title']}>{project.titre}</h1>
              <h2 className={styles['project-subtitle']}>{project.subtitle}</h2>
            </div>
            <div className={styles['project-description-text']}>
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
