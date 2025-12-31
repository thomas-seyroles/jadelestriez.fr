import { useEffect, useState } from "react";
import { client, urlFor } from "../sanityClient";
import SEO from "../components/SEO";
import type { Categorie, Project } from "../types";
import "../styles/Projects.css";
import projets from "../assets/images/PROJETS.svg";
import Footer from "../components/Footer";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  useEffect(() => {
    const query = `*[_type == "projet"] | order(_createdAt desc){
      _id,
      miniature,
      titre,
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

  const filteredProjects =
    selectedCategory === "Tous"
      ? projects
      : projects.filter((p) => p.categorie?.nom === selectedCategory);

  return (
    <>
      <section className="projects-section">
        <SEO
          title="Mes Projets"
          description="Découvrez les projets de Jade, incluant graphisme, communication et design web. Une galerie variée démontrant mes compétences."
        />
        <h1 className="projects-title">
          <img src={projets} alt="Projets" />
        </h1>
        <ProjectFilters
          selectedCategory={selectedCategory}
          onFilterChange={setSelectedCategory}
        />
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project._id} className="project-card">
              {project.miniature && (
                <img
                  src={urlFor(project.miniature).width(600).height(400).url()}
                  alt={project.titre || ""}
                  className="project-image"
                />
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

interface ProjectFiltersProps {
  selectedCategory: string;
  onFilterChange: (category: string) => void;
}

function ProjectFilters({
  selectedCategory,
  onFilterChange,
}: ProjectFiltersProps) {
  const [filters, setFilters] = useState<Categorie[]>([]);

  useEffect(() => {
    const query = `*[_type == "categorie"]{
      _id,
      nom,
      slug
    }`;

    client
      .fetch(query)
      .then((data) => setFilters(data))
      .catch(console.error);
  }, []);

  return (
    <div className="filters">
      <button
        className={`filter-button ${
          selectedCategory === "Tous" ? "active" : ""
        }`}
        onClick={() => onFilterChange("Tous")}
      >
        Tous
      </button>
      {filters.map((filter) => (
        <button
          key={filter._id}
          className={`filter-button ${
            selectedCategory === filter.nom ? "active" : ""
          }`}
          onClick={() => onFilterChange(filter.nom)}
        >
          {filter.nom}
        </button>
      ))}
    </div>
  );
}
