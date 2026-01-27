import { motion } from "motion/react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import styles from "../../../styles/pages/Projects.module.css";

interface ProjectsOrderProps {
  order: "desc" | "asc";
  onOrderChange: (order: "desc" | "asc") => void;
}

export default function ProjectsOrder({ order, onOrderChange }: ProjectsOrderProps) {
  return (
    <div className={styles['projects-order']}>
      <motion.button
        className={`${styles['order-button']} ${order === "desc" ? styles['active'] : ""}`}
        onClick={() => onOrderChange("desc")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Plus récents d'abord"
      >
        <BsSortDown size={20} />
      </motion.button>
      
      <motion.button
        className={`${styles['order-button']} ${order === "asc" ? styles['active'] : ""}`}
        onClick={() => onOrderChange("asc")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Plus anciens d'abord"
      >
        <BsSortUp size={20} />
      </motion.button>
    </div>
  );
}
