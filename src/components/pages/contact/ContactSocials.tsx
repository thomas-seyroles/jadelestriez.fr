import { motion } from "motion/react";
import SocialIcon from "../../ui/SocialIcon";

export default function ContactSocials() {
  return (
    <motion.div 
      className="socials"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <SocialIcon
        network="instagram"
        href="https://www.instagram.com"
        size={48}
      />
      <SocialIcon
        network="linkedin"
        href="https://www.linkedin.com"
        size={48}
      />
    </motion.div>
  );
}
