import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSearch, FiX } from "react-icons/fi";
import "../../../styles/FilterSearch.css";

interface FilterSearchProps {
  onSearchChange: (searchTerm: string) => void;
}

export default function FilterSearch({ onSearchChange }: FilterSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus l'input quand il s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchValue("");
    onSearchChange("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  const handleBlur = () => {
    // Si l'input est vide, on ferme
    if (searchValue.trim() === "") {
      handleClose();
    }
  };

  return (
    <div className="filter-search">
      <motion.button
        className="search-icon-button"
        onClick={handleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label="Rechercher"
      >
        <FiSearch size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="search-input-container"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "250px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Rechercher un projet..."
              value={searchValue}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <motion.button
              className="search-close-button"
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Fermer la recherche"
            >
              <FiX size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
