import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const STEPS = [
  {
    number: "1",
    title: "Call e obiettivi",
    desc: "Parliamo del contesto in cui operi e delle tue priorit\u00e0. Niente giri: condividi i tuoi obiettivi e definiamo il percorso migliore per raggiungerli.",
  },
  {
    number: "2",
    title: "Proposta chiara",
    desc: "Consegno una proposta con perimetro, tempi e modalit\u00e0 operative (a progetto o continuativo).",
  },
  {
    number: "3",
    title: "Sviluppo per step",
    desc: "Lavoro per fasi, con feedback costante. Sai sempre a che punto siamo.",
  },
  {
    number: "4",
    title: "Consegna + supporto",
    desc: "Rilascio, verifica e (se serve) manutenzione: il progetto resta affidabile nel tempo.",
  },
];

const MetodoSection = () => {
  const revealRef = useScrollReveal({ threshold: 0.06 });

  return (
    <div>
      <div ref={revealRef} className="metodo-wrapper">
        <div className="section-header">
          <p className="section-eyebrow">Metodo</p>
          <h2 className="section-title">Come lavoro</h2>
          <div className="section-title-bar" />
        </div>

        <div className="metodo-timeline">
          {STEPS.map((step) => (
            <div key={step.number} className="metodo-step">
              <div className="metodo-step-badge">{step.number}</div>
              <div className="metodo-step-content">
                <h3 className="metodo-step-title">{step.title}</h3>
                <p className="metodo-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="servizi-cta">
          <p className="metodo-cta-text">Hai un progetto in mente?</p>
          <Link to="/contatti" className="cta-button">
            Partiamo dalla prima call
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MetodoSection;
