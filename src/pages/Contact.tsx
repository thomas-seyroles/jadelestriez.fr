import { motion } from "motion/react";
import SEO from "../components/SEO";
import ContactHeader from "../components/pages/contact/ContactHeader";
import ContactForm from "../components/pages/contact/ContactForm";
import ContactSocials from "../components/pages/contact/ContactSocials";
import { usePageExitAnimation } from "../hooks/usePageExitAnimation";
import "../styles/pages/Contact.css";

export default function Contact() {
  const { isExiting, handleExitComplete } = usePageExitAnimation();

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn" as const,
        when: "beforeChildren" as const,
      },
    },
  };

  return (
    <motion.section
      className="contact"
      initial="hidden"
      animate={isExiting ? "exit" : "visible"}
      variants={pageVariants}
      onAnimationComplete={handleExitComplete}
    >
      <SEO
        title="Contact"
        description="Contactez Jade pour toute collaboration ou information. Envoyez un message ou retrouvez-moi sur les réseaux sociaux."
      />
      <div className="outer-container">
        <div className="inner-container">
          <ContactHeader />
          <ContactForm />
          <ContactSocials />
        </div>
      </div>
    </motion.section>
  );
}
