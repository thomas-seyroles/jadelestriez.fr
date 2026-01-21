import { motion } from "motion/react";
import { useState } from "react";
import { urlFor } from "../../../../sanityClient";
import type { Project } from "../../../../types";
import Lightbox from "../../../ui/Lightbox";

interface MainImageProps {
  project: Project;
}

export default function MainImage({ project }: MainImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!project.mainImage) return null;

  const lightboxUrl = urlFor(project.mainImage)
    .width(1920)
    .quality(100)
    .format("webp")
    .url();

  return (
    <>
      <motion.div
        className="project-layout2-main-image"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          id="desktop-main-image"
          src={urlFor(project.mainImage)
            .width(600)
            .height(1200)
            .format("webp")
            .quality(90)
            .url()}
          alt={project.titre}
          loading="lazy"
          onClick={() => setIsLightboxOpen(true)}
          style={{ cursor: "zoom-in" }}
        />
        <img
          id="mobile-main-image"
          src={urlFor(project.mainImage)
            .width(800)
            .height(500)
            .format("webp")
            .quality(90)
            .url()}
          alt={project.titre}
          loading="lazy"
          onClick={() => setIsLightboxOpen(true)}
          style={{ cursor: "zoom-in" }}
        />
      </motion.div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={lightboxUrl}
        altText={project.titre}
      />
    </>
  );
}
