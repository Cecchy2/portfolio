import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FaGlobe, FaLaptopCode, FaPlug, FaWrench } from "react-icons/fa";

const SERVIZI = [
  {
    icon: <FaGlobe size={28} />,
    title: "Siti web e landing page",
    desc: "Siti e landing page veloci, responsive e orientati all\u2019azione: struttura chiara, contenuti organizzati, UX pulita e ottimizzazione base per performance e leggibilit\u00e0.",
    ideale: "Professionisti, attivit\u00e0 locali, PMI, servizi B2B.",
    output: "Homepage + pagine servizi + contatti + SEO base.",
  },
  {
    icon: <FaLaptopCode size={28} />,
    title: "Web application e dashboard su misura",
    desc: "Progetto e sviluppo web app per gestire dati e processi: aree riservate, dashboard, flussi operativi, CRUD, ruoli e permessi quando necessari.",
    ideale: "Strumenti interni, portali cliente, prodotti digitali.",
    output: "UI + API + database + deploy.",
  },
  {
    icon: <FaPlug size={28} />,
    title: "Integrazioni e API",
    desc: "Integrazione di servizi esterni e API: sincronizzazione dati, automazioni, collegamenti tra app e strumenti (CRM, servizi terzi, sistemi interni), con gestione robusta di errori e casi limite.",
    ideale: "Aziende con sistemi da collegare o automatizzare.",
    output: "Connettori, sync, webhook, automazioni.",
  },
  {
    icon: <FaWrench size={28} />,
    title: "Supporto, manutenzione ed evoluzione",
    desc: "Interventi su progetti esistenti: bugfix, refactoring, performance, miglioramenti UX, nuove funzionalit\u00e0.",
    ideale: "Progetti gi\u00e0 avviati che necessitano di miglioramenti.",
    output: "Analisi, intervento mirato, documentazione.",
  },
];

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
          Sviluppo soluzioni web su misura, progettate per essere comprensibili,
          affidabili e sostenibili nel tempo. Lavoro sia su progetti nuovi sia su
          sistemi esistenti, selezionando di volta in volta l&apos;approccio
          pi&ugrave; adatto in base a obiettivi, tempi e budget.
        </p>

        <div className="servizi-grid">
          {SERVIZI.map((s) => (
            <div key={s.title} className="servizi-card">
              <div className="servizi-card-icon">{s.icon}</div>
              <h3 className="servizi-card-title">{s.title}</h3>
              <p className="servizi-card-desc">{s.desc}</p>
              <div className="servizi-card-meta">
                <span className="servizi-card-label">Ideale per:</span>{" "}
                {s.ideale}
              </div>
              <div className="servizi-card-meta">
                <span className="servizi-card-label">Output tipici:</span>{" "}
                {s.output}
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
