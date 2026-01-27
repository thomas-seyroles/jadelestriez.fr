import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { client } from "../sanityClient";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import type { Project } from "../types";
import styles from "../styles/pages/Projects.module.css";
import projets from "../assets/images/PROJETS.svg";
import Footer from "../components/Footer";
import ProjectFilters from "../components/pages/projects/ProjectFilters";
import ProjectCard from "../components/pages/projects/ProjectCard";
import ProjectCardSkeleton from "../components/ui/skeletons/ProjectCardSkeleton";
import { usePageExitAnimation } from "../hooks/usePageExitAnimation";

export default function Projects() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("categorie");

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const { isExiting, handleExitComplete } = usePageExitAnimation();

  // Set initial category from URL param if available
  useEffect(() => {
    if (initialCategory) {
      const query = `*[_type == "categorie" && slug.current == $slug][0].nom`;
      client.fetch(query, { slug: initialCategory }).then((nom) => {
        if (nom) {
          setSelectedCategory(nom);
        }
      });
    }
  }, [initialCategory]);

  // Debounce search term update
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch projects once on mount
  useEffect(() => {
    const query = `*[_type == "projet"] | order(_createdAt desc){
      _id,
      _createdAt,
      thumbnail,
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
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter((p) => p.categorie?.nom === selectedCategory);
    }

    // Filter by search term
    if (debouncedSearchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.titre?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
    }

    // Sort projects
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a._createdAt || 0).getTime();
      const dateB = new Date(b._createdAt || 0).getTime();
      return order === "desc" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [projects, selectedCategory, debouncedSearchTerm, order]);

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
      <section className={styles['projects-section']}>
        <SEO
          title="Mes Projets"
          description="Découvrez les projets de Jade, incluant graphisme, communication et design web. Une galerie variée démontrant mes compétences."
        />

        <motion.header
          className={styles['projects-header']}
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
          variants={headerVariants}
        >
          <h1 className={styles['projects-title']}>
            <span className="sr-only">Mes Projets de Communication et Design</span>
            <img src={projets} alt="Projets" />
          </h1>

          <ProjectFilters
            selectedCategory={selectedCategory}
            onFilterChange={setSelectedCategory}
            onSearchChange={setSearchTerm}
            order={order}
            onOrderChange={setOrder}
          />
        </motion.header>

        <motion.div
          className={styles['projects-grid']}
          variants={containerVariants}
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
          onAnimationComplete={handleExitComplete}
          // Key change forces re-animation when category changes or data loads
          key={`${selectedCategory}-${projects.length}-${isLoading}-${debouncedSearchTerm}-${order}`}
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
