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
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        transition={{ duration: 1 }}
      />
      <motion.img
        id="texture2"
        src={texture_2}
        alt=""
        className="texture-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  );
}
