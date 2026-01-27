import { motion, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import type { Project } from "../../../../types";
import styles from "../../../../styles/project/ProjectHeader.module.css";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <>
      <motion.div variants={itemVariants}>
        <Link to={`/projets`} className={styles['project-back-link']}>
          <FaChevronLeft />
        </Link>
      </motion.div>

      {project.categorie && (
        <motion.div className={styles['project-category']} variants={itemVariants}>
          <Link to={`/projets?categorie=${project.categorie.slug}`}>
            {project.categorie.nom.toUpperCase()}
          </Link>
        </motion.div>
      )}
    </>
  );
}
