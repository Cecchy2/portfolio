import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import VelocityMarquee from "./VelocityMarquee";

const USE_CASES = [
  {
    title: "Hai bisogno di un sito web che funzioni davvero",
    text: "Un'attività o un servizio che si spiega bene, è professionale e facile da usare. Che porti contatti e richieste concrete.",
    px: -30,
  },
  {
    title: "Ti serve un'applicazione web su misura",
    text: "Devi gestire dati, processi o servizi online e le soluzioni standard non bastano. Hai bisogno di uno strumento costruito sulle tue esigenze.",
    px: 22,
  },
  {
    title: "Hai già un software, ma non funziona come dovrebbe",
    text: "Il progetto esiste, ma è lento, instabile o difficile da usare. Vuoi migliorarlo senza rifare tutto da zero.",
    px: -16,
  },
];

const FirstSection = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  // Le righe del titolo salgono da sotto la maschera appena la pagina e' pronta
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => h1Ref.current?.classList.add("is-in"))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* Contenitore piu' alto del viewport: l'hero al suo interno resta
          agganciato in cima e quei pixel in piu' sono il "budget di scroll"
          che fa avanzare il volo delle farfalle. La pagina non si muove
          finche' l'animazione non e' finita. */}
      <div className="hero-scrub" data-hero-scrub>
      <section className="hero shell" id="top">
        <div className="hero-grid" data-py="-22">
          <div className="hero-photo" data-reveal data-py="46">
            <span className="photo-halo" aria-hidden="true" />
            <img
              className="blob"
              src="/Fotoprofilo.jpg"
              alt="Dario Cecchinato"
              width={340}
              height={340}
              fetchPriority="high"
            />
          </div>

          <div>
            <h1 className="h-hero hero-h1" ref={h1Ref}>
              <span className="mask" style={{ "--i": 0 } as React.CSSProperties}>
                <span>Il tuo prossimo sito web</span>
              </span>
              <span className="mask" style={{ "--i": 1 } as React.CSSProperties}>
                <span>lo costruisce qualcuno</span>
              </span>
              <span className="mask" style={{ "--i": 2 } as React.CSSProperties}>
                <span className="accent">che capisce il tuo business.</span>
              </span>
            </h1>

            <p className="lede" data-reveal>
              Sono Dario. Sviluppo siti, web app e strumenti digitali per aziende e
              professionisti. Con un background commerciale e un approccio concreto:
              prima capisco cosa ti serve, poi lo costruisco.
            </p>

            <div className="hero-actions" data-reveal>
              <Link to="/contatti" className="btn btn-solid" data-magnetic onClick={() => window.scrollTo(0, 0)}>
                Parliamo del tuo progetto
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" />
                </svg>
              </Link>
              <div className="socials">
                <a className="social" href="https://www.linkedin.com/in/cecchy2" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                </a>
                <a className="social" href="https://github.com/Cecchy2" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
                <a className="social" href="mailto:dariocecchinato@gmail.com" aria-label="Email">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      <VelocityMarquee text="Sviluppo soluzioni web su misura" />

      <section className="band shell">
        <div className="cases" data-stagger>
          {USE_CASES.map((uc, i) => (
            <div
              key={uc.title}
              className="case-row spot"
              data-spot
              data-px={uc.px}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="case-num">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="case-title">{uc.title}</h2>
              <p className="case-text">{uc.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FirstSection;
