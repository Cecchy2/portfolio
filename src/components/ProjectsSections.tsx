import { useScrollReveal } from "../hooks/useScrollReveal";
import { FiExternalLink } from "react-icons/fi";

const PROJECTS = [
  {
    name: "La Baietta",
    subtitle: "Piattaforma gestionale per scuola di wakeboard",
    logo: "/projects/BAIETTAWHITE.png",
    image: "/projects/LaBaiettaImage.png",
    link: "http://la-baietta.duckdns.org:8081/",
    context:
      "Piattaforma completa per una scuola di wakeboard: sito pubblico con gallery e news, sistema di prenotazione lezioni e corsi con pagamento integrato (Stripe) e control room amministrativa per la gestione di prenotazioni, calendario, contenuti e operativit\u00e0 quotidiana.",
    challenges: [
      "Integrare un flusso di prenotazione lezioni/corsi con pagamento end-to-end",
      "Costruire una control room admin per gestire prenotazioni, calendario, contenuti e operativit\u00e0",
      "Garantire coerenza tra la parte pubblica e il pannello di gestione",
    ],
    contributions: [
      "Sviluppo frontend completo (sito pubblico + control room admin) con React",
      "Backend API con FastApi e Python",
      "Integrazione Stripe per pagamenti e gestione transazioni",
      "Control room con dashboard prenotazioni, gestione calendario, gallery e news",
      "Database PostgreSQL e deploy con Docker",
    ],
    results:
      "Piattaforma operativa con prenotazione e pagamento end-to-end, control room che permette alla scuola di gestire l\u2019intera attivit\u00e0 in autonomia.",
    tags: ["React", "FastApi", "Python", "PostgreSQL", "Docker", "Stripe"],
    cta: "Hai bisogno di una piattaforma con prenotazione e pannello di gestione?",
    cardClass: "proj-sicilyFresh",
  },
  {
    name: "Smartwage",
    subtitle: "Piattaforma Welfare Aziendale (Web + Mobile)",
    logo: "/projects/Pittogramma.png",
    image: "/projects/Smartwage.png",
    link: "https://www.smartwage.it/",
    logoClass: "proj-logo-bg",
    context:
      "Sistema composto da due applicazioni connesse: una web app per la gestione lato azienda e un\u2019app mobile per l\u2019utente finale (dipendente). Obiettivo: realizzare un\u2019esperienza coerente tra web e mobile, con flussi chiari e integrazioni affidabili.",
    challenges: [
      "Gestire due prodotti collegati (coerenza UX e flussi)",
      "Integrare funzionalit\u00e0 e dati in modo stabile",
      "Mantenere interfacce rapide, chiare e manutenibili nel tempo",
    ],
    contributions: [
      "Sviluppo e manutenzione di componenti UI",
      "Gestione stato e flussi applicativi",
      "Integrazione con servizi/API e gestione casi limite",
      "Rifinitura UX per ridurre attrito nei passaggi chiave",
    ],
    results:
      "Flussi pi\u00f9 lineari e interfaccia pi\u00f9 consistente tra le due applicazioni. Componenti riusabili e struttura pi\u00f9 manutenibile.",
    tags: ["React", "React Native", "TypeScript", "Redux", "Docker", "Firebase", "Tailwind", "Zod", "Jira", "Agile", "MySQL"],
    cta: "Hai una piattaforma o un prodotto digitale da costruire o far evolvere?",
    cardClass: "proj-smartwage",
  },
  {
    name: "Ristonic",
    subtitle: "Piattaforma di matching lavoro HO.RE.CA",
    logo: "/projects/logoIcon.png",
    image: "/projects/Ristonic.png",
    link: "https://ristonic.com/home",
    context:
      "Piattaforma che connette chi cerca lavoro e chi cerca personale nel settore HO.RE.CA. Obiettivo: costruire un prodotto con flussi chiari per i due profili (candidato/azienda) e fondamenta solide per crescere nel tempo.",
    challenges: [
      "Due tipologie di utenti con bisogni diversi (matching e gestione candidature)",
      "Definire flussi e priorit\u00e0 in modo snello (MVP)",
      "Progettare una base evolvibile senza complicazioni iniziali",
    ],
    contributions: [
      "Definizione dei flussi principali e dell\u2019MVP",
      "Implementazione UI e struttura applicativa",
      "Preparazione delle integrazioni per funzioni core (autenticazione, gestione dati)",
    ],
    results:
      "Progetto in sviluppo \u2014 demo/preview disponibile su richiesta.",
    tags: ["React", "TypeScript", "Tailwind", "PostgreSQL"],
    cta: "Stai valutando un marketplace o una piattaforma con pi\u00f9 ruoli utente?",
    cardClass: "proj-ristonic",
  },
  {
    name: "Sicily Fresh",
    subtitle: "Web app con browsing, carrello e checkout",
    logo: "/projects/limoni.svg",
    image: "/projects/SicilyFresh.png",
    link: "http://sicilyfresh.duckdns.org:8088/",
    context:
      "Esperienza utente completa, simile a un e-commerce leggero: ricerca/esplorazione, selezione, carrello e completamento dell\u2019ordine.",
    challenges: [
      "Flusso end-to-end coerente dal catalogo al checkout",
      "Gestione dello stato complesso (carrello, selezioni, navigazione)",
      "UI responsive e feedback utente chiari",
    ],
    contributions: [
      "Sviluppo componenti UI e layout responsive",
      "Gestione dello stato applicativo (carrello, selezioni, navigazione)",
      "Cura dei feedback utente (stati, errori, conferme)",
    ],
    results:
      "Flusso completo e coerente, base solida per estensioni (pagamenti, profili utente, gestione ordini).",
    tags: ["React", "Spring Boot", "PostgreSQL", "Docker"],
    cta: "Hai bisogno di un\u2019applicazione con flusso e-commerce?",
    cardClass: "proj-sicilyFresh",
  },
];

type Project = (typeof PROJECTS)[number];

const CaseStudyCard = ({
  project,
  reversed,
}: {
  project: Project;
  reversed: boolean;
}) => (
  <div
    className={`proj-card ${project.cardClass}${reversed ? " proj-card--rev" : ""}`}
  >
    {/* Image */}
    <div className="proj-card-img-side">
      <img
        src={project.image}
        alt={project.name}
        className="proj-card-img"
        onClick={() => window.open(project.link, "_blank")}
      />
      <div className="proj-card-img-overlay">
        <FiExternalLink size={28} />
      </div>
    </div>

    {/* Info */}
    <div className="proj-card-info">
      <div className="proj-card-title-row">
        {project.logo && (
          <img
            src={project.logo}
            alt={`logo ${project.name}`}
            className={`proj-card-logo ${"logoClass" in project && project.logoClass ? project.logoClass : ""}`}
          />
        )}
        <div>
          <h3 className="proj-card-name">{project.name}</h3>
          <p className="proj-card-subtitle">{project.subtitle}</p>
        </div>
      </div>

      <p className="proj-card-desc">{project.context}</p>

      <div className="proj-case-section">
        <h4 className="proj-case-label">Sfide</h4>
        <ul className="proj-case-list">
          {project.challenges.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="proj-case-section">
        <h4 className="proj-case-label">Contributo</h4>
        <ul className="proj-case-list">
          {project.contributions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="proj-case-section">
        <h4 className="proj-case-label">Risultato</h4>
        <p className="proj-case-result">{project.results}</p>
      </div>

      <div className="proj-card-tags">
        {project.tags.map((t) => (
          <span key={t} className="proj-card-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="proj-card-bottom">
        <p className="proj-card-cta-text">{project.cta}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-card-link"
        >
          Visita il progetto <FiExternalLink size={13} />
        </a>
      </div>
    </div>
  </div>
);

const ProjectsSections = () => {
  const revealRef = useScrollReveal({ threshold: 0.05 });

  return (
    <div>
      <div ref={revealRef} className="proj-section-wrapper">
        <div className="section-header">
          <p className="section-eyebrow">Case Study</p>
          <h2 className="section-title">Progetti reali, risultati concreti</h2>
          <div className="section-title-bar" />
        </div>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <CaseStudyCard key={p.name} project={p} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSections;
