import { motion } from "motion/react";
import type { Project } from "../../../../types";

interface TextContentProps {
  project: Project;
}

export default function TextContent({ project }: TextContentProps) {
  return (
    <motion.div 
      className="project-layout2-text-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {project.subtitle && (
        <h2 className="project-subtitle">{project.subtitle}</h2>
      )}
      
      {project.long_description && (
        <div className="project-description-text">
          {project.long_description}
        </div>
      )}
    </motion.div>
  );
}
