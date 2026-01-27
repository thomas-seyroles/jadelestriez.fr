import { motion, type Variants } from "motion/react";
import type { ProjectLayout1 } from "../../../../types";
import styles from "../../../../styles/project/ProjectLayout1.module.css";

interface HeaderProps {
  project: ProjectLayout1;
}

export default function Header({ project }: HeaderProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <header className={styles['project-editorial-header']}>
      <div className={styles['project-header-left']}>
        <motion.h1 className={styles['project-title']} variants={itemVariants}>
          {project.titre}
        </motion.h1>
        <motion.h2 className={styles['project-subtitle']} variants={itemVariants}>
          {project.subtitle}
        </motion.h2>
      </div>
      <div className={styles['project-header-texts']}>
        <motion.div
          className={styles['project-short-description']}
          variants={itemVariants}
        >
          {project.short_description}
        </motion.div>
        <motion.div
          className={styles['project-description-text']}
          variants={itemVariants}
        >
          {project.long_description}
        </motion.div>
      </div>
    </header>
  );
}
