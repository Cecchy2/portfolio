import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Casi Studio", to: "/casi-studio" },
  { label: "Chi Sono", to: "/chi-sono" },
  { label: "FAQ", to: "/faq" },
  { label: "Contatti", to: "/contatti" },
];

const Footer = () => (
  <footer className="footer shell">
    <div className="footer-grid">
      <div>
        <span className="footer-name">Dario Cecchinato</span>
        <span className="footer-role">Sviluppo soluzioni web su misura</span>
        <div className="socials" style={{ marginTop: "1.1rem" }}>
          <a className="social" href="mailto:dariocecchinato@gmail.com" aria-label="Email"><MdEmail size={19} /></a>
          <a className="social" href="https://www.linkedin.com/in/cecchy2" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
          <a className="social" href="https://github.com/Cecchy2" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={18} /></a>
        </div>
      </div>

      <nav>
        <span className="footer-col-label">Navigazione</span>
        {NAV_LINKS.map((l) => (
          <Link key={l.label} to={l.to} className="footer-link" onClick={() => window.scrollTo(0, 0)}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div>
        <span className="footer-col-label">Realizzato con</span>
        <span className="footer-stack-item">React &amp; TypeScript</span>
        <span className="footer-stack-item">Spring Boot</span>
        <span className="footer-stack-item">Three.js</span>
        <span className="footer-stack-item">Vite · Koyeb · Netlify</span>
      </div>
    </div>

    <div className="footer-bottom">
      <span>© 2026 Dario Cecchinato — Sviluppo soluzioni web su misura</span>
      <div className="footer-legal">
        <Link to="/privacy-policy" className="footer-legal-link" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
        <Link to="/cookie-policy" className="footer-legal-link" onClick={() => window.scrollTo(0, 0)}>Cookie Policy</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
