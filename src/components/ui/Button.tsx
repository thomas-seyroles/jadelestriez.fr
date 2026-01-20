import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import "../../styles/ui/Button.css"; // We will move button styles here

type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "accent" 
  | "border" 
  | "border-primary" 
  | "foreground" 
  | "background";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}: ButtonProps) {
  
  const baseClass = `btn btn-${variant}`;
  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <motion.button
      className={combinedClass}
      whileHover={{ opacity: 0.8 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
