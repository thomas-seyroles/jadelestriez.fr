import { motion } from "motion/react";
import texture_2 from "../../../assets/images/texture_2.jpg";
import styles from "../../../styles/pages/Home.module.css";

export default function HomeTextures() {
  const textureVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 1.2, ease: "easeOut" as any } 
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className={styles['textures']}>
      <motion.img
        id={styles['texture1']}
        src={texture_2}
        alt=""
        className={styles['texture-image']}
        variants={textureVariants}
      />
      <motion.img
        id={styles['texture2']}
        src={texture_2}
        alt=""
        className={styles['texture-image']}
        variants={textureVariants}
      />
    </div>
  );
}
