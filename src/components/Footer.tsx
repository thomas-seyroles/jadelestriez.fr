import { motion } from "motion/react";
import Link from "./ui/Link";
import SocialIcon from "./ui/SocialIcon";
import "../styles/layout/Footer.css";
import { usePageExitContext } from "../context/PageExitContext";

export default function Footer({ className }: { className?: string }) {
  const { shouldLayoutExit } = usePageExitContext();

  return (
    <motion.footer
      className={`footer ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldLayoutExit ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="footer-links">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/projets">Projets</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <div className="social-links">
        <SocialIcon
          network="instagram"
          href="https://instagram.com/jade_lstz"
          size={32}
        />
        <SocialIcon
          network="linkedin"
          href="https://linkedin.com/in/jade-lestriez"
          size={32}
        />
      </div>
    </motion.footer>
  );
}
