import { useScrollReveal } from "../hooks/useScrollReveal";
import CorouselLoghi from "./CorouselLoghi";

const AboutMe = () => {
  const revealRef = useScrollReveal({ threshold: 0.06 });

  return (
    <div ref={revealRef}>
      <div className="chisono-section">
        <div className="section-header">
          <p className="section-eyebrow">Chi Sono</p>
          <h2 className="section-title">Dario Cecchinato</h2>
          <div className="section-title-bar" />
        </div>

        <div className="chisono-text">
          <p>
            Aiuto aziende e professionisti a trasformare le loro idee in siti e
            applicazioni che funzionano — e che portano risultati.
          </p>
          <p>
            Costruisco da zero e intervengo su progetti esistenti: bugfix,
            performance, funzionalità nuove. Se il codice c&apos;è già, non
            riscrivo tutto — miglioro quello che serve.
          </p>
          <p>
            Vengo dal commerciale, non solo dal codice. Per questo quando lavoro
            a un progetto parto sempre dalla domanda: cosa serve davvero al
            business? La tecnologia viene dopo.
          </p>
        </div>

        <p className="chisono-tech-label">Tecnologie principali</p>
        <div className="chisono-tech-list">
          Html5 | Css | Javascript | Typescript | Vite | React | Redux |
          Three.js | Tailwind | Bootstrap | Figma | Firebase | Sass | npm |
          Java | Spring | Sql | Hibernate | PostgreSql | Docker | Git | GitHub
          | BitBucket | VsCode | IntelliJ
        </div>
      </div>

      {/* Carousel full-width, fuori dal contenitore centrato */}
      <div className="chisono-carousels">
        <CorouselLoghi direction="left" />
        <CorouselLoghi direction="right" />
      </div>
    </div>
  );
};

export default AboutMe;
