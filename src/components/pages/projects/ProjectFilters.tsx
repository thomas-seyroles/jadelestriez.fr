import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";
import FilterLink from "../../ui/FilterLink";
import type { Categorie } from "../../../types";

interface ProjectFiltersProps {
  selectedCategory: string;
  onFilterChange: (category: string) => void;
}

export default function ProjectFilters({
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
  );
}
