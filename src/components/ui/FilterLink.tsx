import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import "../../styles/ui/Link.css";

interface FilterLinkProps extends HTMLMotionProps<"button"> {
  isActive?: boolean;
  children: React.ReactNode;
}

export default function FilterLink({
  isActive = false,
  children,
  className = "",
  ...props
}: FilterLinkProps) {
  return (
    <motion.button
      className={`link ${isActive ? "active" : ""} ${className}`}
      whileHover={{ opacity: 0.7 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        fontSize: "inherit",
        color: isActive ? "var(--color-primary)" : "var(--color-foreground)",
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
