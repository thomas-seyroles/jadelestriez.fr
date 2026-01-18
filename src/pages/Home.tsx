import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { client } from "../sanityClient";
import type { Project } from "../types";
import "../styles/Home.css";
import SEO from "../components/SEO";
import { usePageExitAnimation } from "../hooks/usePageExitAnimation";
import HomeLatestProjects from "../components/pages/home/HomeLatestProjects";
import HomeTextures from "../components/pages/home/HomeTextures";
import HomeHero from "../components/pages/home/HomeHero";

export default function Home() {
  const [latestProject, setLatestProject] = useState<Project | null>(null);
  const { isExiting, handleExitComplete } = usePageExitAnimation();

  useEffect(() => {
    const query = `*[_type == "projet"] | order(_createdAt desc)[0] {
      _id,
      miniature,
      titre,
      "slug": slug.current,
      galerie
    }`;

    client
      .fetch(query)
      .then((data) => setLatestProject(data))
      .catch(console.error);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const }
    }
  };

  return (
    <motion.div 
      className="home-container"
      initial="hidden"
      animate={isExiting ? "exit" : "visible"}
      variants={pageVariants}
      onAnimationComplete={handleExitComplete}
    >
      <SEO
        title="Accueil"
        description="Portfolio de Jade, étudiante en communication spécialisée dans le design et la création digitale. Découvrez mes projets et mon univers."
      />
      
      <HomeLatestProjects latestProject={latestProject} />
      <HomeTextures />
      <HomeHero />
    </motion.div>
  );
}
