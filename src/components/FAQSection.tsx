import { Accordion } from "react-bootstrap";
import { useScrollReveal } from "../hooks/useScrollReveal";

const FAQ_ITEMS = [
  {
    q: "Quanto costa un progetto?",
    a: "Dipende da obiettivi, complessit\u00e0 e tempi. Dopo una prima call ti fornisco una proposta chiara e coerente con il perimetro.",
  },
  {
    q: "Quanto tempo serve?",
    a: "Interventi mirati: pochi giorni. Siti/landing: in genere alcune settimane. Web app: per fasi concordate.",
  },
  {
    q: "Lavori a progetto o continuativo?",
    a: "Entrambe le modalit\u00e0: a progetto se il perimetro \u00e8 definito, continuativo se serve evoluzione/manutenzione.",
  },
  {
    q: "Come \u00e8 definito il processo di lavoro?",
    a: "Il lavoro segue un percorso chiaro e concordato all\u2019inizio. Preferisco definire bene perimetro, priorit\u00e0 e vincoli prima di scrivere codice, per evitare inefficienze e cambi continui in corsa.",
  },
  {
    q: "Ti occupi anche dell\u2019evoluzione nel tempo?",
    a: "S\u00ec, posso seguire interventi successivi, supporto, manutenzione o miglioramenti progressivi, mantenendo continuit\u00e0 e controllo sul codice. L\u2019obiettivo \u00e8 che il progetto resti stabile e migliorabile nel tempo.",
  },
  {
    q: "Puoi intervenire senza rifare tutto da zero?",
    a: "S\u00ec. Quando lavoro su un progetto esistente, l\u2019obiettivo \u00e8 migliorare ci\u00f2 che non funziona senza riscrivere inutilmente ci\u00f2 che \u00e8 gi\u00e0 valido. Le riscritture complete hanno senso solo quando sono davvero necessarie.",
  },
  {
    q: "Come gestisci comunicazione e avanzamento?",
    a: "Per step, con aggiornamenti regolari e dando priorit\u00e0 a tempi e obiettivi: niente sorprese e niente ritardi!",
  },
  {
    q: "In quanto tempo rispondi?",
    a: "Entro 24 ore.",
  },
];

const FAQSection = () => {
  const revealRef = useScrollReveal({ threshold: 0.06 });

  return (
    <div>
      <div ref={revealRef} className="faq-wrapper">
        <div className="section-header">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="section-title">Domande frequenti</h2>
          <div className="section-title-bar" />
        </div>

        <Accordion className="faq-accordion">
          {FAQ_ITEMS.map((item, i) => (
            <Accordion.Item key={i} eventKey={String(i)}>
              <Accordion.Header>{item.q}</Accordion.Header>
              <Accordion.Body>{item.a}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;
