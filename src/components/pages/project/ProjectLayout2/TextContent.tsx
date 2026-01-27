import { motion } from "motion/react";
import type { Project } from "../../../../types";
import styles from "../../../../styles/project/ProjectLayout2.module.css";

interface TextContentProps {
  project: Project;
}

export default function TextContent({ project }: TextContentProps) {
  return (
    <motion.div 
      className={styles['project-layout2-text-content']}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h2 className={styles['project-subtitle']}>{project.subtitle}</h2>
      
      <div className={styles['project-description-text']}>
        {project.long_description}
      </div>
    </motion.div>
  );
}
