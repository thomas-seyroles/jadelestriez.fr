import Link from "./ui/Link";
import logo from "../assets/images/JADE.svg";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
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
    </header>
  );
}
