import { motion } from "motion/react";
import texture_2 from "../../../assets/images/texture_2.jpg";

export default function HomeTextures() {
  return (
    <div className="textures">
      <motion.img
        id="texture1"
        src={texture_2}
        alt=""
        className="texture-image"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          x: [0, 8, -5, 0],
          y: [0, -6, 4, 0],
          filter: ["blur(2px)", "blur(3.5px)", "blur(2.5px)", "blur(2px)"],
        }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        transition={{
          opacity: { duration: 1 },
          default: {
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />
      <motion.img
        id="texture2"
        src={texture_2}
        alt=""
        className="texture-image"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          x: [0, -7, 6, 0],
          y: [0, 5, -4, 0],
          filter: ["blur(2px)", "blur(3px)", "blur(2.8px)", "blur(2px)"],
        }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        transition={{
          opacity: { duration: 1, delay: 0.2 },
          default: {
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          },
        }}
      />
    </div>
  );
}
