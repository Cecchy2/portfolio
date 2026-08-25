import { useEffect, useState } from "react";
import { FiExternalLink, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import ColossalText from "./ColossalText";

const PROJECTS = [
  {
    name: "La Baietta",
    subtitle: "Piattaforma gestionale per scuola di wakeboard",
    image: "/projects/LaBaiettaImage.png",
    link: "https://labaietta.it",
    context:
      "Piattaforma completa per una scuola di wakeboard: sito pubblico con gallery e news, sistema di prenotazione lezioni e corsi con pagamento integrato (Stripe) e control room amministrativa per la gestione di prenotazioni, calendario, contenuti e operatività quotidiana.",
    tags: ["React", "FastApi", "Python", "PostgreSQL", "Docker", "Stripe"],
    cta: "Hai bisogno di una piattaforma con prenotazione e pannello di gestione?",
  },
  {
    name: "Smartwage",
    subtitle: "Piattaforma Welfare Aziendale (Web + Mobile)",
    image: "/projects/Smartwage.png",
    link: "https://www.smartwage.it/",
    context:
      "Sistema composto da due applicazioni connesse: una web app per la gestione lato azienda e un’app mobile per l’utente finale (dipendente). Obiettivo: realizzare un’esperienza coerente tra web e mobile, con flussi chiari e integrazioni affidabili.",
    tags: ["React", "React Native", "TypeScript", "Redux", "Docker", "Firebase", "Tailwind", "Zod", "MySQL"],
    cta: "Hai una piattaforma o un prodotto digitale da costruire o far evolvere?",
    screenshots: [
      "/projects/smartwage/home.png",
      "/projects/smartwage/richieste.png",
      "/projects/smartwage/carta.png",
      "/projects/smartwage/analisi.png",
      "/projects/smartwage/spese.png",
    ],
  },
  {
    name: "Ristonic",
    subtitle: "Piattaforma di matching lavoro HO.RE.CA",
    image: "/projects/Ristonic.png",
    link: "https://www.ristonic.com",
    context:
      "Piattaforma che connette chi cerca lavoro e chi cerca personale nel settore HO.RE.CA. Obiettivo: costruire un prodotto con flussi chiari per i due profili (candidato/azienda) e fondamenta solide per crescere nel tempo.",
    tags: ["React", "TypeScript", "Tailwind", "PostgreSQL"],
    cta: "Stai valutando un marketplace o una piattaforma con più ruoli utente?",
    screenshots: [
      "/projects/ristonic/01-homepage.png",
      "/projects/ristonic/02-home-worker.png",
      "/projects/ristonic/03-cerca-turni.png",
      "/projects/ristonic/04-profilo-worker.png",
      "/projects/ristonic/05-candidature.png",
      "/projects/ristonic/06-miei-turni.png",
      "/projects/ristonic/07-home-datore.png",
      "/projects/ristonic/08-profilo-datore.png",
      "/projects/ristonic/09-pubblica-turno.png",
      "/projects/ristonic/10-annunci.png",
      "/projects/ristonic/11-ingaggi.png",
    ],
  },
  {
    name: "Sicily Fresh",
    subtitle: "Web app con browsing, carrello e checkout",
    image: "/projects/SicilyFresh.png",
    link: "http://sicilyfresh.duckdns.org:8088/",
    context:
      "Esperienza utente completa, simile a un e-commerce leggero: ricerca/esplorazione, selezione, carrello e completamento dell’ordine.",
    tags: ["React", "Spring Boot", "PostgreSQL", "Docker"],
    cta: "Hai bisogno di un’applicazione con flusso e-commerce?",
  },
];

type Project = (typeof PROJECTS)[number];

const ScreenshotCarousel = ({ shots, onClose }: { shots: string[]; onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const goPrev = () => setIndex((i) => (i - 1 + shots.length) % shots.length);
  const goNext = () => setIndex((i) => (i + 1) % shots.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="shot-modal" onClick={onClose}>
      <button className="shot-close" onClick={onClose} aria-label="Chiudi"><FiX size={28} /></button>
      <button className="shot-nav shot-nav--prev" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Precedente"><FiChevronLeft size={32} /></button>
      <div className="shot-stage" onClick={(e) => e.stopPropagation()}>
        <img src={shots[index]} alt={`Screenshot ${index + 1}`} className="shot-img" />
        <div className="shot-counter">{index + 1} / {shots.length}</div>
      </div>
      <button className="shot-nav shot-nav--next" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Successivo"><FiChevronRight size={32} /></button>
      <div className="shot-dots" onClick={(e) => e.stopPropagation()}>
        {shots.map((_, i) => (
          <button key={i} className={`shot-dot${i === index ? " shot-dot--active" : ""}`} onClick={() => setIndex(i)} aria-label={`Vai a screenshot ${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

/** Sticky stack: ogni progetto si prende lo schermo e viene coperto dal successivo. */
const ProjectsSections = () => {
  const [gallery, setGallery] = useState<string[] | null>(null);

  const openShots = (p: Project) => {
    const shots = "screenshots" in p ? (p.screenshots as string[]) : undefined;
    if (shots?.length) setGallery(shots);
    else window.open(p.link, "_blank", "noopener");
  };

  return (
    <div id="progetti">
      <div className="shell" style={{ paddingTop: "clamp(3rem,6vw,5.5rem)", paddingBottom: "clamp(1.6rem,3vw,2.6rem)" }}>
        <ColossalText
          lines={[
            { text: "Progetti reali", px: -70 },
            { text: "Risultati concreti", variant: "outline", px: 70 },
          ]}
        />
      </div>

      <div className="stack">
        {PROJECTS.map((p) => (
          <section className="stack-item" key={p.name}>
            <div className="stack-scale" data-stackscale>
              <div className="stack-inner shell">
                <div data-py="-30">
                  <h3 className="stack-name">{p.name}</h3>
                  <p className="stack-sub">{p.subtitle}</p>
                  <p className="stack-desc">{p.context}</p>
                  <div className="tags">
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <p className="stack-cta-text">{p.cta}</p>
                  <a className="stack-link" href={p.link} target="_blank" rel="noopener noreferrer">
                    Visita il progetto <FiExternalLink size={13} />
                  </a>
                </div>
                <div
                  className="shot"
                  data-py="52"
                  role="button"
                  tabIndex={0}
                  onClick={() => openShots(p)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openShots(p); } }}
                >
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {gallery && <ScreenshotCarousel shots={gallery} onClose={() => setGallery(null)} />}
    </div>
  );
};

export default ProjectsSections;
