import { motion } from "motion/react";
import styles from "../styles/pages/Home.module.css";
import SEO from "../components/SEO";
import { usePageExitAnimation } from "../hooks/usePageExitAnimation";
import HomeHero from "../components/pages/home/HomeHero";
import HomeImage from "../components/pages/home/HomeImage";
import Footer from "../components/Footer";

export default function Home() {
  const { isExiting, handleExitComplete } = usePageExitAnimation();

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  return (
    <>
      <motion.div
        className={styles["home-container"]}
        initial="hidden"
        animate={isExiting ? "exit" : "visible"}
        variants={pageVariants}
        onAnimationComplete={handleExitComplete}
      >
        <SEO
          title="Jade Lestriez"
          description="Portfolio de Jade, étudiante en communication spécialisée dans le design et la création digitale. Découvrez mes projets et mon univers."
        />

        <HomeHero />
        <HomeImage />
      </motion.div>
      <Footer />
    </>
  );
}
