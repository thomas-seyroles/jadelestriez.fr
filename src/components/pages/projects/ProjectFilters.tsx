import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";
import FilterLink from "../../ui/FilterLink";
import FilterSearch from "./FilterSearch";
import ProjectsOrder from "./ProjectsOrder";
import type { Categorie } from "../../../types";
import "../../../styles/features/ProjectFilters.css";

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
    <div className="filters">
      <div className="category-filters">
        <FilterLink
          isActive={selectedCategory === "Tous"}
          onClick={() => onFilterChange("Tous")}
        >
          Tous
        </FilterLink>
        {filters.map((filter) => (
          <FilterLink
            key={filter._id}
            isActive={selectedCategory === filter.nom}
            onClick={() => onFilterChange(filter.nom)}
          >
            {filter.nom}
          </FilterLink>
        ))}
      </div>
      
      <div className="filter-controls-container">
        <FilterSearch onSearchChange={onSearchChange} />
        <ProjectsOrder order={order} onOrderChange={onOrderChange} />
      </div>
    </div>
  );
}
