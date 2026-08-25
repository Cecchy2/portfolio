const FAQ_ITEMS = [
  { q: "Quanto costa un progetto?", a: "Dipende da obiettivi, complessità e tempi. Dopo una prima call ti fornisco una proposta chiara e coerente con il perimetro." },
  { q: "Quanto tempo serve?", a: "Interventi mirati: pochi giorni. Siti/landing: in genere alcune settimane. Web app: per fasi concordate." },
  { q: "Lavori a progetto o continuativo?", a: "Entrambe le modalità: a progetto se il perimetro è definito, continuativo se serve evoluzione/manutenzione." },
  { q: "Come è definito il processo di lavoro?", a: "Il lavoro segue un percorso chiaro e concordato all’inizio. Preferisco definire bene perimetro, priorità e vincoli prima di scrivere codice, per evitare inefficienze e cambi continui in corsa." },
  { q: "Ti occupi anche dell’evoluzione nel tempo?", a: "Sì, posso seguire interventi successivi, supporto, manutenzione o miglioramenti progressivi, mantenendo continuità e controllo sul codice. L’obiettivo è che il progetto resti stabile e migliorabile nel tempo." },
  { q: "Puoi intervenire senza rifare tutto da zero?", a: "Sì. Quando lavoro su un progetto esistente, l’obiettivo è migliorare ciò che non funziona senza riscrivere inutilmente ciò che è già valido. Le riscritture complete hanno senso solo quando sono davvero necessarie." },
  { q: "Come gestisci comunicazione e avanzamento?", a: "Per step, con aggiornamenti regolari e dando priorità a tempi e obiettivi: niente sorprese e niente ritardi!" },
  { q: "In quanto tempo rispondi?", a: "Entro 24 ore." },
];

/** Disclosure native: niente Accordion di react-bootstrap. */
const FAQSection = () => (
  <section className="band shell" id="faq">
    <h2 className="h-sec" data-reveal style={{ marginBottom: "2rem" }}>
      Domande frequenti
    </h2>
    <div className="faq" data-reveal>
      {FAQ_ITEMS.map((item) => (
        <details key={item.q}>
          <summary>
            {item.q}
            <span className="faq-icon" />
          </summary>
          <p className="faq-body">{item.a}</p>
        </details>
      ))}
    </div>
  </section>
);

export default FAQSection;
