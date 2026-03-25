import { useSectionObserver } from "../hooks/useSectionObserver";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FaCode, FaServer, FaLightbulb, FaComments } from "react-icons/fa";

const STATS = [
  { value: "3+",  label: "Anni di\nesperienza" },
  { value: "15+", label: "Progetti\nrealizzati" },
  { value: "20+", label: "Tecnologie\npadroneggio" },
];

const BIO_CARDS = [
  {
    icon: <FaCode size={22} />,
    title: "Front-end",
    text: "React, TypeScript, Redux, React Native. Curo ogni dettaglio dell'interfaccia per creare esperienze utente fluide e performanti.",
  },
  {
    icon: <FaServer size={22} />,
    title: "Back-end",
    text: "Java e Spring Boot per API REST solide, Docker per la containerizzazione, PostgreSQL per i dati.",
  },
  {
    icon: <FaLightbulb size={22} />,
    title: "Creatività",
    text: "Unisco tecnica e creatività — Three.js, animazioni CSS, layout insoliti — per rendere ogni progetto memorabile.",
  },
  {
    icon: <FaComments size={22} />,
    title: "Comunicazione",
    text: "Esperienza commerciale sul campo: so tradurre le esigenze del cliente in soluzioni chiare e concrete.",
  },
];

const AboutMe = () => {
  const ref        = useSectionObserver("about-me");
  const revealRef  = useScrollReveal({ threshold: 0.06 });

  return (
    <div ref={revealRef}>
      <div
        id="about-me"
        ref={ref}
        className="about-section"
      >
        {/* ── Stats ──────────────────────────────────────── */}
        <div className="about-stats">
          {STATS.map((s) => (
            <div key={s.value} className="about-stat-card">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">
                {s.label.split("\n").map((l, i) => (
                  <span key={i} style={{ display: "block" }}>{l}</span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bio cards ──────────────────────────────────── */}
        <div className="about-cards">
          {BIO_CARDS.map((card) => (
            <div key={card.title} className="about-bio-card">
              <div className="about-bio-icon">{card.icon}</div>
              <h4 className="about-bio-title">{card.title}</h4>
              <p className="about-bio-text">{card.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AboutMe;
