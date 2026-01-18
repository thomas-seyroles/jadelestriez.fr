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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

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
      .then((data) => setProjects(data))
      .catch(console.error);
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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
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
          animate="visible"
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
          animate="visible"
          // Key change forces re-animation when category changes or data loads
          key={`${selectedCategory}-${projects.length}`}
        >
          {filteredProjects.map((project) => (
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
