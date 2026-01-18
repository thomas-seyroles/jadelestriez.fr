import { useEffect, useState, useMemo } from "react";
import { client } from "../sanityClient";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import type { Project } from "../types";
import "../styles/Projects.css";
import projets from "../assets/images/PROJETS.svg";
import Footer from "../components/Footer";
import ProjectFilters from "../components/pages/projects/ProjectFilters";
import ProjectCard from "../components/pages/projects/ProjectCard";
import ProjectCardSkeleton from "../components/ui/skeletons/ProjectCardSkeleton";
import { usePageExitAnimation } from "../hooks/usePageExitAnimation";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const { isExiting, handleExitComplete } = usePageExitAnimation();

  // Fetch projects once on mount
  useEffect(() => {
    const query = `*[_type == "projet"] | order(_createdAt desc){
      _id,
      miniature,
      titre,
      "slug": slug.current,
      categorie->{
        nom,
        "slug": slug.current
      }
    }`;

    client
      .fetch(query)
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // Optimize filtering performance using useMemo
  // This prevents re-calculating the list on every render if projects/category hasn't changed
  const filteredProjects = useMemo(() => {
    return selectedCategory === "Tous"
      ? projects
      : projects.filter((p) => p.categorie?.nom === selectedCategory);
  }, [projects, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1, // Reverse stagger order
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  };

  return (
    <>
      <section className="projects-section">
        <SEO
          title="Mes Projets"
          description="Découvrez les projets de Jade, incluant graphisme, communication et design web. Une galerie variée démontrant mes compétences."
        />

        <motion.header
          className="projects-header"
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
          variants={headerVariants}
        >
          <h1 className="projects-title">
            <img src={projets} alt="Projets" />
          </h1>

          <ProjectFilters
            selectedCategory={selectedCategory}
            onFilterChange={setSelectedCategory}
          />
        </motion.header>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
          onAnimationComplete={handleExitComplete}
          // Key change forces re-animation when category changes or data loads
          key={`${selectedCategory}-${projects.length}-${isLoading}`}
        >
          {isLoading
            ? // Show 8 skeletons while loading
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div key={`skeleton-${index}`} variants={itemVariants}>
                  <ProjectCardSkeleton />
                </motion.div>
              ))
            : filteredProjects.map((project) => (
                <motion.div key={project._id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
