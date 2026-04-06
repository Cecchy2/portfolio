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
            Sviluppo soluzioni web affidabili e sostenibili, progettate per
            aiutare aziende e professionisti a creare reali opportunit&agrave;
            commerciali e trasformare idee e progetti in risultati concreti.
          </p>
          <p>
            Realizzo siti web, applicazioni e strumenti online su misura, e
            intervengo anche su software gi&agrave; esistenti per migliorarne
            funzionamento, prestazioni e affidabilit&agrave;.
          </p>
          <p>
            Grazie all&apos;esperienza maturata in ambito commerciale, affronto
            lo sviluppo con una visione orientata al business, trasformando le
            tecnologie in soluzioni concrete e utili per l&apos;attivit&agrave;
            del cliente.
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
