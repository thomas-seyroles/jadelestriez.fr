import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import "../../styles/ui/Link.css";

interface CustomLinkProps extends HTMLMotionProps<"a"> {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

const MotionRouterLink = motion.create(RouterLink);

export default function Link({ 
  href, 
  children, 
  className = "", 
  external = false,
  ...props 
}: CustomLinkProps) {
  
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <motion.a
        href={href}
        className={`link ${className}`}
        whileHover={{ opacity: 0.6 }}
        whileTap={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        target="_blank"
        rel="noopener noreferrer"
        {...(props as HTMLMotionProps<"a">)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionRouterLink
      to={href}
      className={`link ${className}`}
      whileHover={{ opacity: 0.6 }}
      whileTap={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...(props as HTMLMotionProps<"a">)}
    >
      {children}
    </MotionRouterLink>
  );
}
