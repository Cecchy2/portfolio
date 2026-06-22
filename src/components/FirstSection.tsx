import { Image } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import HeroScene from "./HeroScene";

const USE_CASES = [
  {
    title: "Hai bisogno di un sito web che funzioni davvero",
    text: "Un'attività o un servizio che si spiega bene, è professionale e facile da usare. Che porti contatti e richieste concrete.",
  },
  {
    title: "Ti serve un'applicazione web su misura",
    text: "Devi gestire dati, processi o servizi online e le soluzioni standard non bastano. Hai bisogno di uno strumento costruito sulle tue esigenze.",
  },
  {
    title: "Hai già un software, ma non funziona come dovrebbe",
    text: "Il progetto esiste, ma è lento, instabile o difficile da usare. Vuoi migliorarlo senza rifare tutto da zero.",
  },
];

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const FirstSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        {/* ── Left: content ─────────────────────────────── */}
        <div className="hero-left">
          <div className="hero-avatar-row">
            <Image
              src="/Fotoprofilo.jpg"
              className="profileImage bordiImage"
              alt="Dario Cecchinato"
            />
          </div>

          <h1 className="hero-headline">
            Il tuo prossimo sito web<br />
            lo costruisce qualcuno<br />
            <em className="hero-headline-em">
              che capisce il tuo business.
            </em>
          </h1>

          <p className="hero-lead">
            Sono Dario. Sviluppo siti, web app e strumenti digitali per aziende
            e professionisti. Con un background commerciale e un approccio
            concreto: prima capisco cosa ti serve, poi lo costruisco.
          </p>

          <div className="hero-actions">
            <Link to="/contatti" className="hero-btn-primary">
              Parliamo del tuo progetto
            </Link>
            <div className="hero-socials">
              <a
                href="https://www.linkedin.com/in/cecchy2"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-icon-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com/Cecchy2"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-icon-link"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="mailto:dariocecchinato@gmail.com"
                className="hero-icon-link"
                aria-label="Email"
              >
                <MdEmail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Right: Three.js scene ──────────────────────── */}
        <div className="hero-right" aria-hidden="true">
          <HeroScene />
        </div>
      </div>

      {/* ── Use cases row ─────────────────────────────────── */}
      <div className="hero-usecases-row">
        {USE_CASES.map((uc) => (
          <div
            key={uc.title}
            className="hero-usecase-card"
            onMouseMove={handleMouseMove}
          >
            <h3 className="hero-usecase-title">{uc.title}</h3>
            <p className="hero-usecase-text">{uc.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FirstSection;
