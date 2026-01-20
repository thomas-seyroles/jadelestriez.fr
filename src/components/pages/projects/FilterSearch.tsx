import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSearch, FiX } from "react-icons/fi";
import "../../../styles/features/FilterSearch.css";

interface FilterSearchProps {
  onSearchChange: (searchTerm: string) => void;
}

export default function FilterSearch({ onSearchChange }: FilterSearchProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
    onSearchChange("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <div className="filter-search">
      <div className="search-input-container">
        <div className="search-icon">
          <FiSearch size={20} />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un projet..."
          value={searchValue}
          onChange={handleChange}
        />
        <AnimatePresence>
          {searchValue && (
            <motion.button
              className="search-close-button"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Effacer la recherche"
            >
              <FiX size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
