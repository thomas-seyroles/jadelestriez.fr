import { motion, type Variants } from "motion/react";
import type { Project } from "../../../../types";

interface HeaderProps {
  project: Project;
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
    <header className="project-editorial-header">
      <div className="project-header-left">
        <motion.h1 className="project-title" variants={itemVariants}>
          {project.titre}
        </motion.h1>
        {project.subtitle && (
          <motion.h2 className="project-subtitle" variants={itemVariants}>
            {project.subtitle}
          </motion.h2>
        )}
      </div>
      <div className="project-header-texts">
        {project.short_description && (
          <motion.div
            className="project-short-description"
            variants={itemVariants}
          >
            {project.short_description}
          </motion.div>
        )}
        {project.long_description && (
          <motion.div
            className="project-description-text"
            variants={itemVariants}
          >
            {project.long_description}
          </motion.div>
        )}
      </div>
    </header>
  );
}
