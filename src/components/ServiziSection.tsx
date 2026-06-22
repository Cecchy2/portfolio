import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FaGlobe, FaLaptopCode, FaPlug, FaWrench } from "react-icons/fa";

const SERVIZI = [
  {
    icon: <FaGlobe size={26} />,
    title: "Siti web e landing page",
    desc: "Siti che spiegano bene cosa fai e portano chi li visita a contattarti. Veloci, chiari e facili da usare su qualsiasi dispositivo.",
    ideale: "Professionisti, attività locali, PMI, servizi B2B.",
    output: "Homepage + pagine servizi + contatti + SEO base.",
  },
  {
    icon: <FaLaptopCode size={26} />,
    title: "Web application e dashboard su misura",
    desc: "Progetto e sviluppo web app per gestire dati e processi: aree riservate, dashboard, flussi operativi, CRUD, ruoli e permessi quando necessari.",
    ideale: "Strumenti interni, portali cliente, prodotti digitali.",
    output: "UI + API + database + deploy.",
  },
  {
    icon: <FaPlug size={26} />,
    title: "Integrazioni e API",
    desc: "Integrazione di servizi esterni e API: sincronizzazione dati, automazioni, collegamenti tra app e strumenti con gestione robusta di errori e casi limite.",
    ideale: "Aziende con sistemi da collegare o automatizzare.",
    output: "Connettori, sync, webhook, automazioni.",
  },
  {
    icon: <FaWrench size={26} />,
    title: "Supporto, manutenzione ed evoluzione",
    desc: "Interventi su progetti esistenti: bugfix, refactoring, performance, miglioramenti UX, nuove funzionalità.",
    ideale: "Progetti già avviati che necessitano di miglioramenti.",
    output: "Analisi, intervento mirato, documentazione.",
  },
];

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const ServiziSection = () => {
  const revealRef = useScrollReveal({ threshold: 0.06 });

  return (
    <div>
      <div ref={revealRef} className="servizi-wrapper">
        <div className="section-header">
          <p className="section-eyebrow">Servizi</p>
          <h2 className="section-title">Cosa posso fare per te</h2>
          <div className="section-title-bar" />
        </div>

        <p className="servizi-intro">
          Lavoro su progetti nuovi e su sistemi già esistenti. Ogni progetto è
          diverso — per questo parto sempre da cosa serve davvero, non da uno
          schema fisso.
        </p>

        <div className="servizi-list">
          {SERVIZI.map((s, i) => (
            <div
              key={s.title}
              className="servizi-item"
              onMouseMove={handleMouseMove}
            >
              <span className="servizi-item-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="servizi-item-icon">{s.icon}</div>
              <div className="servizi-item-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <div className="servizi-item-meta">
                <div>
                  <span className="servizi-meta-label">Ideale per: </span>
                  {s.ideale}
                </div>
                <div>
                  <span className="servizi-meta-label">Output: </span>
                  {s.output}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="servizi-cta">
          <Link to="/contatti" className="cta-button">
            Raccontami cosa ti serve
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiziSection;
