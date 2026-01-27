import { motion } from "motion/react";
import contact from "../../../assets/images/CONTACT.svg";

export default function ContactHeader() {
  return (
    <div className="contact-header">
      <motion.img
        src={contact}
        alt="Contact"
        className="contact-image"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
