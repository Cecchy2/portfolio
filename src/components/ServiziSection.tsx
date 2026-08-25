import { Link } from "react-router-dom";

const SERVIZI = [
  {
    title: "Siti web e landing page",
    desc: "Siti che spiegano bene cosa fai e portano chi li visita a contattarti. Veloci, chiari e facili da usare su qualsiasi dispositivo.",
    ideale: "Professionisti, attività locali, PMI, servizi B2B.",
    output: "Homepage + pagine servizi + contatti + SEO base.",
  },
  {
    title: "Web application e dashboard su misura",
    desc: "Progetto e sviluppo web app per gestire dati e processi: aree riservate, dashboard, flussi operativi, CRUD, ruoli e permessi quando necessari.",
    ideale: "Strumenti interni, portali cliente, prodotti digitali.",
    output: "UI + API + database + deploy.",
  },
  {
    title: "Integrazioni e API",
    desc: "Integrazione di servizi esterni e API: sincronizzazione dati, automazioni, collegamenti tra app e strumenti con gestione robusta di errori e casi limite.",
    ideale: "Aziende con sistemi da collegare o automatizzare.",
    output: "Connettori, sync, webhook, automazioni.",
  },
  {
    title: "Supporto, manutenzione ed evoluzione",
    desc: "Interventi su progetti esistenti: bugfix, refactoring, performance, miglioramenti UX, nuove funzionalità.",
    ideale: "Progetti già avviati che necessitano di miglioramenti.",
    output: "Analisi, intervento mirato, documentazione.",
  },
];

/**
 * Lo scorrimento verticale diventa pan laterale: i quattro servizi sono
 * paritetici, e il pan li presenta come un percorso unico invece che come
 * una lista da scorrere. Sotto i 1024px diventa uno swipe nativo.
 */
const ServiziSection = () => (
  <section className="pan" id="servizi" data-pan>
    <div className="pan-sticky">
      <div className="pan-track" data-pan-track>
        <div className="pan-panel pan-panel--intro">
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Servizi</p>
          <h2 className="h-sec" style={{ marginBottom: "1.2rem" }}>Cosa posso fare per te</h2>
          <p className="pan-desc">
            Lavoro su progetti nuovi e su sistemi già esistenti. Ogni progetto è
            diverso — per questo parto sempre da cosa serve davvero, non da uno
            schema fisso.
          </p>
        </div>

        {SERVIZI.map((s, i) => (
          <article className="pan-panel" key={s.title}>
            <p className="pan-index">
              <b>{String(i + 1).padStart(2, "0")}</b> / 04
            </p>
            <h3 className="pan-title">{s.title}</h3>
            <p className="pan-desc">{s.desc}</p>
            <div className="pan-meta">
              <div><span>Ideale per:</span> {s.ideale}</div>
              <div><span>Output:</span> {s.output}</div>
            </div>
            {i === SERVIZI.length - 1 && (
              <Link
                to="/contatti"
                className="btn btn-line"
                style={{ marginTop: "1.8rem", alignSelf: "flex-start" }}
                onClick={() => window.scrollTo(0, 0)}
              >
                Raccontami cosa ti serve
              </Link>
            )}
          </article>
        ))}
      </div>
      <div className="pan-progress" aria-hidden="true"><i data-pan-bar /></div>
    </div>
  </section>
);

export default ServiziSection;
