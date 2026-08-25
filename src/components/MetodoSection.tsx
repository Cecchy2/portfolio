import ColossalText from "./ColossalText";

const STEPS = [
  {
    title: "Call e obiettivi",
    desc: "Parliamo del contesto in cui operi e delle tue priorità. Condividi i tuoi obiettivi e definiamo il percorso migliore per raggiungerli.",
  },
  {
    title: "Proposta chiara",
    desc: "Consegno una proposta con perimetro, tempi e modalità operative — a progetto o continuativo.",
  },
  {
    title: "Sviluppo per step",
    desc: "Lavoro per fasi, con feedback costante. Sai sempre a che punto siamo e puoi correggere il tiro.",
  },
  {
    title: "Consegna e supporto",
    desc: "Rilascio, verifica e (se serve) manutenzione continuativa: il progetto resta affidabile nel tempo.",
  },
];

const MetodoSection = () => (
  <section className="band shell" id="metodo">
    <ColossalText
      lines={[{ text: "Come lavoro", px: -80 }]}
      style={{ marginBottom: "clamp(1.6rem,3vw,2.6rem)" }}
    />
    <div className="method" data-stagger>
      {STEPS.map((s, i) => (
        <div
          key={s.title}
          className="method-cell spot"
          data-spot
          style={{ "--i": i } as React.CSSProperties}
        >
          <span className="method-num">{i + 1}</span>
          <h3 className="method-title">{s.title}</h3>
          <p className="method-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default MetodoSection;
