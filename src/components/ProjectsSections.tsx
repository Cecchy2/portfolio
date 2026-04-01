import { useSectionObserver } from "../hooks/useSectionObserver";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FiExternalLink } from "react-icons/fi";

const PROJECTS = [
  {
    name: "La Baietta",
    logo: "/projects/BAIETTAWHITE.png",
    image: "/projects/LaBaiettaImage.png",
    link: "https://la-baietta.duckdns.org:8443/",
    desc: "Piattaforma completa, sito vetrina con sezione gallery, news, gestione prenotazione e pagamento",
    tags: ["React", "FastApi", "Python", "PostgreSQL", "Docker", "Stripe"],
    cardClass: "proj-sicilyFresh",
  },
  {
    name: "Smartwage",
    logo: "/projects/Pittogramma.png",
    image: "/projects/Smartwage.png",
    link: "https://www.smartwage.it/",
    desc: "Piattaforma per la gestione del Welfare Aziendale: web app per le aziende e app mobile per i dipendenti.",
    tags: ["React", "React Native", "Redux", "Spring Boot"],
    cardClass: "proj-smartwage",
    logoClass: "proj-logo-bg",
  },
  {
    name: "Ristonic",
    logo: "/projects/logoIcon.png",
    image: "/projects/Ristonic.png",
    link: "https://ristonic.com/home",
    desc: "Piattaforma HO.RE.CA che collega chi cerca lavoro e chi cerca personale nel settore della ristorazione.",
    tags: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    cardClass: "proj-ristonic",
  },
  {
    name: "Sicily Fresh",
    logo: "/projects/limoni.svg",
    image: "/projects/SicilyFresh.png",
    link: "http://sicilyfresh.duckdns.org:8088/",
    desc: "Il mio capstone FullStack per Epicode. Piattaforma per sfogliare ricette siciliane, aggiungerle al carrello e completare ordini.",
    tags: ["React", "Spring Boot", "PostgreSQL", "Docker"],
    cardClass: "proj-sicilyFresh",
  },

  {
    name: "Tech Quiz Game",
    logo: null,
    image: "/projects/TechQuiz.png",
    link: "https://techquizgame.netlify.app/",
    desc: "Quiz game interattivo su tecnologie web. Sviluppato in Vanilla JavaScript con HTML, CSS e DOM Manipulation.",
    tags: ["Vanilla JS", "HTML", "CSS"],
    cardClass: "proj-techquiz",
  },
  {
    name: "Meteo",
    logo: null,
    image: "/projects/Meteo.png",
    link: "https://meteocecchy.netlify.app/",
    desc: "App meteo che mostra condizioni correnti e previsioni a breve termine per qualsiasi città del mondo.",
    tags: ["JavaScript", "OpenWeather API", "CSS"],
    cardClass: "proj-meteo",
  },
] as const;

type Project = (typeof PROJECTS)[number];

const ProjectCard = ({
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
            className={`proj-card-logo ${"logoClass" in project ? project.logoClass : ""}`}
          />
        )}
        <h3 className="proj-card-name">{project.name}</h3>
      </div>

      <p className="proj-card-desc">{project.desc}</p>

      <div className="proj-card-tags">
        {project.tags.map((t) => (
          <span key={t} className="proj-card-tag">
            {t}
          </span>
        ))}
      </div>

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
);

const ProjectsSections = () => {
  const ref = useSectionObserver("sicilyFresh", 0.2);
  const revealRef = useScrollReveal({ threshold: 0.05 });

  return (
    <div id="sicilyFresh" ref={ref}>
      <div ref={revealRef} className="proj-section-wrapper">
        {/* Header */}
        <div className="proj-header">
          <p className="proj-eyebrow">Portfolio</p>
          <h2 className="proj-title">Alcuni progetti</h2>
          <div className="proj-title-bar" />
        </div>

        {/* Cards */}
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSections;
