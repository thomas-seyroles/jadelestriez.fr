import { motion } from "motion/react";
import texture_2 from "../../../assets/images/texture_2.jpg";

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
    <div className="textures">
      <motion.img
        id="texture1"
        src={texture_2}
        alt=""
        className="texture-image"
        variants={textureVariants}
      />
      <motion.img
        id="texture2"
        src={texture_2}
        alt=""
        className="texture-image"
        variants={textureVariants}
      />
    </div>
  );
}
