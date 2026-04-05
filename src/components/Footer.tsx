import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home",        to: "/" },
  { label: "Casi Studio", to: "/casi-studio" },
  { label: "Chi Sono",    to: "/chi-sono" },
  { label: "FAQ",         to: "/faq" },
  { label: "Contatti",    to: "/contatti" },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">

      {/* Brand col */}
      <div className="footer-brand">
        <span className="footer-name">Dario Cecchinato</span>
        <span className="footer-role">Sviluppo soluzioni web su misura</span>
        <div className="footer-socials">
          <a href="mailto:dariocecchinato@gmail.com" className="footer-social-link" aria-label="Email">
            <MdEmail size={20} />
          </a>
          <a href="https://www.linkedin.com/in/cecchy2" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>
          <a href="https://github.com/Cecchy2" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      {/* Nav col */}
      <nav className="footer-nav">
        <span className="footer-col-label">Navigazione</span>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className="footer-nav-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Stack col */}
      <div className="footer-stack">
        <span className="footer-col-label">Realizzato con</span>
        <span className="footer-stack-item">React &amp; TypeScript</span>
        <span className="footer-stack-item">Spring Boot</span>
        <span className="footer-stack-item">Three.js</span>
        <span className="footer-stack-item">Vite &middot; Koyeb &middot; Netlify</span>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="footer-bottom">
      <span>&copy; 2026 Dario Cecchinato &mdash; Sviluppo soluzioni web su misura</span>
      <span className="footer-bottom-sub">Siti, web app e integrazioni: chiarezza, affidabilit&agrave;, risultati.</span>
    </div>
  </footer>
);

export default Footer;
