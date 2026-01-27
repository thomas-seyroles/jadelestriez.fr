import Header from "./Header";
import MainImage from "./MainImage";
import type { ProjectLayout1 } from "../../../../types";
import styles from "../../../../styles/project/ProjectLayout1.module.css";

interface ProjectLayout1Props {
  project: ProjectLayout1;
}

export default function ProjectLayout1({ project }: ProjectLayout1Props) {
  return (
    <div className={styles['project-detail']}>
      <Header project={project} />
      <MainImage project={project} />
    </div>
  );
}
