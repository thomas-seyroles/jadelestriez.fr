import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { urlFor } from "../../../sanityClient";
import type { Project } from "../../../types";
import "../../../styles/features/ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (!project.thumbnail) return null;

  return (
    <motion.div
      className="project-card"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Link to={`/projets/${project.slug}`}>
        <motion.img
          src={urlFor(project.thumbnail)
            .width(600)
            .height(400)
            .format("webp")
            .quality(60)
            .url()}
          alt={project.titre || "Projet sans titre"}
          className="project-image"
          loading="lazy"
          variants={{
            rest: { opacity: 1, scale: 1 },
            hover: { opacity: 0.25, scale: 1.05 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        <motion.div
          className="project-card-overlay"
          variants={{
            rest: { opacity: 0, y: 10 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3 className="project-card-title">{project.titre}</h3>
        </motion.div>
      </Link>
    </motion.div>
  );
}
