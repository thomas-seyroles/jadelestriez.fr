import MainImage from "./MainImage";
import TextContent from "./TextContent";
import Gallery from "./Gallery";
import type { ProjectLayout2 } from "../../../../types";
import styles from "../../../../styles/project/ProjectLayout2.module.css";

interface ProjectLayout2Props {
  project: ProjectLayout2;
}

export default function ProjectLayout2({ project }: ProjectLayout2Props) {
  return (
    <div className={`${styles['project-detail']} ${styles['project-layout-2']}`}>
      <div className={styles['layout2-container']}>
        <div className={styles['layout2-outer']}>
          <div className={styles['layout2-inner']}>
            <header className={styles['layout2-header']}>
              <h1 className={styles['project-title']}>{project.titre}</h1>
            </header>

            <div className={styles['layout2-content']}>
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
