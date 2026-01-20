import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { urlFor } from "../../../sanityClient";
import type { Project } from "../../../types";

interface HomeLatestProjectsProps {
  latestProject: Project | null;
}

export default function HomeLatestProjects({ latestProject }: HomeLatestProjectsProps) {
  if (!latestProject) return null;

  // Gallery logic removed as it's not in the schema anymore
  const paddingStyle = { padding: 0 };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5, // Delay until after textures/hero start appearing
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  };

  return (
    <motion.div 
      className="latest-projects" 
      style={paddingStyle}
      variants={containerVariants}
    >
      <motion.div className="latest-project-card" variants={itemVariants}>
        {latestProject.mainImage && (
          <Link to={`/projets/${latestProject.slug}`}>
            <motion.img
              src={urlFor(latestProject.mainImage)
                .width(850)
                .height(1000)
                .format("webp")
                .quality(80)
                .url()}
              alt={latestProject.titre || ""}
              className="latest-project-image"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            <h2>{latestProject.titre}</h2>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}
