import { motion } from "motion/react";
import { useState } from "react";
import { urlFor } from "../../../../sanityClient";
import type { ProjectLayout2 } from "../../../../types";
import Lightbox from "../../../ui/Lightbox";
import styles from "../../../../styles/project/ProjectLayout2.module.css";

interface GalleryProps {
  project: ProjectLayout2;
}

export default function Gallery({ project }: GalleryProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Determine number of columns based on image count
  // 4 images -> 2 cols x 2 rows
  // 5-6 images -> 3 cols x 2 rows
  const gridClass =
    project.gallery.length > 4 ? styles['grid-cols-3'] : styles['grid-cols-2'];

  const handleImageClick = (imageSource: any) => {
    const url = urlFor(imageSource)
      .width(1920)
      .quality(100)
      .format("webp")
      .url();
    setLightboxImage(url);
  };

  return (
    <>
      <motion.div
        className={`${styles['project-layout2-gallery']} ${gridClass}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {project.gallery.map((image, index) => (
          <div key={`gallery-${index}`} className={styles['gallery-item']}>
            <img
              src={urlFor(image).width(400).height(400).fit("crop").url()}
              alt={`Galerie ${index + 1}`}
              loading="lazy"
              onClick={() => handleImageClick(image)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
        ))}
      </motion.div>

      <Lightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage || ""}
        altText="Image galerie"
      />
    </>
  );
}
