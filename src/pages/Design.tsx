import { 
  FaArrowRight, 
  FaCheck, 
  FaTimes, 
  FaStar, 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone
} from "react-icons/fa";
import Button from "../components/ui/Button";
import ColorCard from "../components/design/ColorCard";
import Link from "../components/ui/Link";
import "../styles/pages/Design.css"; // We will create this locally for this page's layout

export default function Design() {
  const brandColors = [
    { name: "--color-primary", value: "var(--color-primary)" },
    { name: "--color-secondary", value: "var(--color-secondary)" },
    { name: "--color-accent", value: "var(--color-accent)" },
  ];

  const contrastColors = [
    { name: "--color-foreground", value: "var(--color-foreground)" },
    { name: "--color-background", value: "var(--color-background)" },
  ];

  const grayColors = [
    { name: "--gray-800", value: "var(--gray-800)" },
    { name: "--gray-600", value: "var(--gray-600)" },
    { name: "--gray-400", value: "var(--gray-400)" },
    { name: "--gray-200", value: "var(--gray-200)" },
    { name: "--gray-50", value: "var(--gray-50)" },
  ];

  return (
    <div className="design-system">
      <header className="design-header">
        <h1>Système de Design JADE</h1>
        <p>Bibliothèque de composants et guide de style</p>
      </header>

      {/* Colors Section */}
      <section className="design-section">
        <h2>Couleurs</h2>
        
        <h3 className="color-subtitle">Marque</h3>
        <div className="color-grid">
          {brandColors.map((color) => (
            <ColorCard key={color.name} color={color.value} label={color.name} />
          ))}
        </div>

        <h3 className="color-subtitle">Contraste</h3>
        <div className="color-grid">
          {contrastColors.map((color) => (
            <ColorCard key={color.name} color={color.value} label={color.name} />
          ))}
        </div>

        <h3 className="color-subtitle">Nuances de Gris</h3>
        <div className="color-grid">
          {grayColors.map((color) => (
            <ColorCard key={color.name} color={color.value} label={color.name} />
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className="design-section">
        <h2>Typographie</h2>
        <div className="type-examples">
          <div className="type-row">
            <h1>Heading 1 - Titre Principal</h1>
            <code>font-size: var(--font-size-h1); (Ratio x1.4)</code>
          </div>
          <div className="type-row">
            <h2>Heading 2 - Sous-titre</h2>
            <code>font-size: var(--font-size-h2);</code>
          </div>
          <div className="type-row">
            <h3>Heading 3 - Section</h3>
            <code>font-size: var(--font-size-h3);</code>
          </div>
          <div className="type-row">
            <p>
              <strong>Paragraphe (Body):</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              <br /><br />
              Duis aute irure dolor in reprehenderit. Voluptate velit esse cillum dolore. Eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              <br /><br />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
              <br /><br />
              <strong>Liste de mots :</strong> Créativité, Structure, Harmonie, Espace, Rythme, Couleur, Typographie, Contraste, Équilibre, Nuance.
            </p>
            <code>font-size: var(--font-size-base); (1rem)</code>
          </div>
        </div>
      </section>

      {/* UI Elements / Buttons */}
      <section className="design-section">
        <h2>Éléments UI</h2>
        <div className="ui-container">
          <div className="ui-group">
            <h3>Boutons</h3>
            <div className="component-row">
              <Button variant="primary">Primaire</Button>
              <Button variant="secondary">Secondaire</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="border">Bordure Foreground</Button>
              <Button variant="border-primary">Bordure Primaire</Button>
              <Button variant="foreground">Foreground</Button>
              <Button variant="background">Background</Button>
            </div>
          </div>
          
          <div className="ui-group" style={{ marginTop: '3rem' }}>
            <h3>Liens de Navigation</h3>
            <nav className="component-row">
                <Link href="#" style={{ textTransform: 'uppercase' }}>Lien Standard</Link>
            </nav>
          </div>
        </div>
      </section>

      {/* Icons Section */}
      <section className="design-section">
        <h2>Iconographie (Font Awesome)</h2>
        <div className="icon-grid">
            <div className="icon-item"><FaArrowRight size={24} /> <span>ArrowRight</span></div>
            <div className="icon-item"><FaCheck size={24} /> <span>Check</span></div>
            <div className="icon-item"><FaTimes size={24} /> <span>Times</span></div>
            <div className="icon-item"><FaStar size={24} /> <span>Star</span></div>
        </div>
        <div className="icon-grid" style={{ marginTop: '2rem' }}>
            <div className="icon-item"><FaGithub size={24} /> <span>Github</span></div>
            <div className="icon-item"><FaLinkedin size={24} /> <span>Linkedin</span></div>
            <div className="icon-item"><FaInstagram size={24} /> <span>Instagram</span></div>
            <div className="icon-item"><FaEnvelope size={24} /> <span>Envelope</span></div>
            <div className="icon-item"><FaMapMarkerAlt size={24} /> <span>MapMarker</span></div>
            <div className="icon-item"><FaPhone size={24} /> <span>Phone</span></div>
        </div>
      </section>
    </div>
  );
}

