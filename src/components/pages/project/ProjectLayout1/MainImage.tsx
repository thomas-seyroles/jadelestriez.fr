import { motion, type Variants } from "motion/react";
import { urlFor } from "../../../../sanityClient";
import type { Project } from "../../../../types";

interface MainImageProps {
  project: Project;
}

export default function MainImage({ project }: MainImageProps) {
  const imageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <div className="project-main-image-section">
      {project.mainImage && (
        <motion.img
          src={urlFor(project.mainImage)
            .width(1920)
            .height(800)
            .quality(90)
            .format("webp")
            .fit("max")
            .url()}
          alt={project.titre || ""}
          className="project-main-image"
          variants={imageVariants}
        />
      )}
    </div>
  );
}
