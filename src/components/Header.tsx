import { motion } from "motion/react";
import Link from "./ui/Link";
import logo from "../assets/images/JADE.svg";
import "../styles/Header.css";
import { usePageExitContext } from "../context/PageExitContext";

export default function Header() {
  const { shouldLayoutExit } = usePageExitContext();

  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldLayoutExit ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo">
        <Link href="/">
          <img src={logo} alt="Logo JADE" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/" className="nav-link">
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/projets" className="nav-link">
              Projets
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
