import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { urlFor } from "../../../sanityClient";
import type { Project } from "../../../types";

interface HomeLatestProjectsProps {
  latestProject: Project | null;
}

export default function HomeLatestProjects({ latestProject }: HomeLatestProjectsProps) {
  if (!latestProject) return null;

  const hasGallery = latestProject.galerie && latestProject.galerie.length >= 2;
  const paddingStyle = hasGallery
    ? { padding: "8rem 6rem 0 4rem" }
    : { padding: 0 };

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
        {latestProject.miniature && (
          <Link to={`/projets/${latestProject.slug}`}>
            <motion.img
              src={urlFor(latestProject.miniature)
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
      {hasGallery &&
        latestProject.galerie!.slice(0, 2).map((item, index) => (
          <motion.div 
            key={item._key || index} 
            className="latest-project-card"
            variants={itemVariants}
          >
            <Link to={`/projets/${latestProject.slug}`}>
              <motion.img
                src={urlFor(item.image).width(400).url()}
                alt=""
                className="latest-project-image"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        ))}
    </motion.div>
  );
}
