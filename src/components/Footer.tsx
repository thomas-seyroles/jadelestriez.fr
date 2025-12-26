import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            JADE
          </Link>
          <p className="footer-description">
            Portfolio d'une étudiante en communication, passionnée par le design
            et la création digitale.
          </p>
        </div>

        {/* Navigation Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Navigation</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/projets">Projets</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Réseaux</h3>
          <div className="social-links">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Instagram
            </a>
            <a href="mailto:contact@jade.com" className="social-link">
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Jade Portfolio. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
