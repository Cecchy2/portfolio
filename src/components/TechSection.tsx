import CarouselLoghi from "./CorouselLoghi";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { useScrollReveal } from "../hooks/useScrollReveal";

const MAIN_TECHS = [
  { src: "/javascript.png", name: "JavaScript", desc: "Applicazioni interattive e robuste" },
  { src: "/typescript.png", name: "TypeScript",  desc: "Tipizzazione statica e maggiore controllo" },
  { src: "/react.png",      name: "React",       desc: "Interfacce utente dinamiche e performanti" },
  { src: "/java 2.png",     name: "Java",        desc: "Sviluppo backend solido e scalabile" },
  { src: "/spring.png",     name: "Spring",      desc: "API REST sicure con Spring Boot" },
];


const TechSection = () => {
  const ref       = useSectionObserver("skills");
  const revealRef = useScrollReveal({ threshold: 0.06 });

  return (
    <div id="skills" ref={ref}>
      <div ref={revealRef}>
        <div className="tech-section-wrapper">

          {/* ── Header ─────────────────────────────────── */}
          <div className="tech-header">
            <p className="tech-eyebrow">Stack &amp; competenze</p>
            <h2 className="tech-title">Le mie tecnologie</h2>
            <div className="tech-title-bar" />
          </div>

          {/* ── Main tech cards ─────────────────────────── */}
          <div className="tech-cards-grid">
            {MAIN_TECHS.map((t) => (
              <div key={t.name} className="tech-card-item">
                <div className="tech-card">
                  <img src={t.src} alt={t.name} className="tech-image" />
                  <div className="tech-overlay">
                    <h4>{t.desc}</h4>
                  </div>
                </div>
                <span className="tech-card-label">{t.name}</span>
              </div>
            ))}
          </div>

          {/* ── Tech list ───────────────────────────────── */}
          <div className="tech-list-text">
            Html5 | Css | Javascript | Typescript | Vite | React | Redux |
            Three.js | Tailwind | Bootstrap | Figma | Firebase | Sass | npm |
            Java | Spring | Sql | Hibernate | PostgreSql | Docker | Git | GitHub
            | BitBucket | VsCode | IntelliJ
          </div>

          {/* ── Carousels ───────────────────────────────── */}
          <div className="tech-carousels">
            <CarouselLoghi direction="left" />
            <CarouselLoghi direction="right" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TechSection;
