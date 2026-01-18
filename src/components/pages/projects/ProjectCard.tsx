import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { urlFor } from "../../../sanityClient";
import type { Project } from "../../../types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (!project.miniature) return null;

  return (
    <motion.div
      className="project-card"
      whileHover={{ opacity: 0.5, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/projets/${project.slug}`}
        style={{ display: "block", height: "100%" }}
      >
        <img
          src={urlFor(project.miniature).width(600).height(400).url()}
          alt={project.titre || "Projet sans titre"}
          className="project-image"
          loading="lazy"
        />
      </Link>
    </motion.div>
  );
}
