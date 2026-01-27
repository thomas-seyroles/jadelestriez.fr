import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";
import FilterLink from "../../ui/FilterLink";
import FilterSearch from "./FilterSearch";
import ProjectsOrder from "./ProjectsOrder";
import type { Categorie } from "../../../types";
import styles from "../../../styles/pages/Projects.module.css";

interface ProjectFiltersProps {
  selectedCategory: string;
  onFilterChange: (category: string) => void;
  onSearchChange: (searchTerm: string) => void;
  order: "desc" | "asc";
  onOrderChange: (order: "desc" | "asc") => void;
}

export default function ProjectFilters({
  selectedCategory,
  onFilterChange,
  onSearchChange,
  order,
  onOrderChange,
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
    <div className={styles['filters']}>
      <div className={styles['category-filters']}>
        <FilterLink
          className={styles['filter-button']}
          isActive={selectedCategory === "Tous"}
          onClick={() => onFilterChange("Tous")}
        >
          Tous
        </FilterLink>
        {filters.map((filter) => (
          <FilterLink
            key={filter._id}
            className={styles['filter-button']}
            isActive={selectedCategory === filter.nom}
            onClick={() => onFilterChange(filter.nom)}
          >
            {filter.nom}
          </FilterLink>
        ))}
      </div>
      
      <div className={styles['filter-controls-container']}>
        <FilterSearch onSearchChange={onSearchChange} />
        <ProjectsOrder order={order} onOrderChange={onOrderChange} />
      </div>
    </div>
  );
}
