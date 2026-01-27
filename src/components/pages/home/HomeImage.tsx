import photo from "../../../assets/images/photo_accueil.jpg";
import styles from "../../../styles/pages/Home.module.css";
import { motion } from "motion/react";
import Lightbox from "../../ui/Lightbox";
import { useState } from "react";

export default function HomeImage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles["home-image"]}>
        <motion.img
          src={photo}
          alt="Photo design de Jade Lestriez"
          initial={{ opacity: 0, rotateZ: -2 }}
          animate={{ opacity: 1, rotateZ: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.02, rotateZ: 1 }}
          exit={{ opacity: 0, rotateZ: -2 }}
          onClick={() => setIsOpen(true)}
        />
      </div>
      <Lightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        imageUrl={photo}
      />
    </>
  );
}
