import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const NAV_LINKS = [
  { label: "Home",      href: "#home" },
  { label: "Chi sono",  href: "#about-me" },
  { label: "Skills",    href: "#skills" },
  { label: "Progetti",  href: "#sicilyFresh" },
  { label: "Contatti",  href: "#formSection" },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">

      {/* Brand col */}
      <div className="footer-brand">
        <span className="footer-name">Dario Cecchinato</span>
        <span className="footer-role">Front-end Developer</span>
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
          <a key={l.label} href={l.href} className="footer-nav-link">{l.label}</a>
        ))}
      </nav>

      {/* Stack col */}
      <div className="footer-stack">
        <span className="footer-col-label">Realizzato con</span>
        <span className="footer-stack-item">React &amp; TypeScript</span>
        <span className="footer-stack-item">Spring Boot</span>
        <span className="footer-stack-item">Three.js</span>
        <span className="footer-stack-item">Vite · Koyeb · Netlify</span>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="footer-bottom">
      <span>© 2025 Dario Cecchinato. Tutti i diritti riservati.</span>
    </div>
  </footer>
);

export default Footer;
