import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSearch, FiX } from "react-icons/fi";
import styles from "../../../styles/pages/Projects.module.css";

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
    <div className={styles['filter-search']}>
      <div className={styles['search-input-container']}>
        <div className={styles['search-icon']}>
          <FiSearch size={20} />
        </div>
        <input
          type="text"
          className={styles['search-input']}
          placeholder="Rechercher un projet..."
          value={searchValue}
          onChange={handleChange}
        />
        <AnimatePresence>
          {searchValue && (
            <motion.button
              className={styles['search-close-button']}
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
