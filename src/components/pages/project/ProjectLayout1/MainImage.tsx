import { motion, type Variants } from "motion/react";
import { useState } from "react";
import { urlFor } from "../../../../sanityClient";
import type { Project } from "../../../../types";
import Lightbox from "../../../ui/Lightbox";

interface MainImageProps {
  project: Project;
}

export default function MainImage({ project }: MainImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const imageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const imageUrl = project.mainImage
    ? urlFor(project.mainImage)
        .width(1920)
        .quality(100) // High quality for lightbox
        .format("webp")
        .url()
    : "";

  return (
    <>
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
            onClick={() => setIsLightboxOpen(true)}
            style={{ cursor: "zoom-in" }}
          />
        )}
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={imageUrl}
        altText={project.titre}
      />
    </>
  );
}
