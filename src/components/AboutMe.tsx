const LOGHI = [
  "react.png", "typescript.png", "javascript.png", "html.png", "css.png", "Tailwind.png",
  "redux.png", "vite-js-logo.png", "sass.png", "bootstrap.png", "Three.png", "Figma.png",
  "java 2.png", "spring.png", "hibernate.png", "sql.png", "Postgresql_elephant.svg.png",
  "Docker.png", "git.png", "GitHub-Mark-ea2971cee799.png", "Bitbucket.png", "Npm.png",
  "postman.png", "intellij.png", "visual-studio-code.png", "Firebase.png", "netlify.png",
  "koyeb_logo_icon_247887.png",
];

const LogoRow = ({ files, dir }: { files: string[]; dir: 1 | -1 }) => (
  <div className="logo-row">
    <div className="logo-track" data-vtrack data-speed={26} data-dir={dir}>
      <div data-vgroup style={{ display: "flex" }}>
        {files.map((f) => (
          <span className="logo-chip" key={f}>
            <img src={`/Icone/${f}`} alt="" loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  </div>
);

const AboutMe = () => (
  <div id="chi-sono">
    <section className="band shell" style={{ paddingBottom: "clamp(1.8rem,3.5vw,3rem)" }}>
      <div className="about-grid">
        <div data-reveal>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Chi sono</p>
          <h2 className="h-sec">Dario Cecchinato</h2>
        </div>
        <div className="about-text" data-reveal>
          <p>
            Aiuto aziende e professionisti a trasformare le loro idee in siti e
            applicazioni che funzionano — e che portano risultati.
          </p>
          <p>
            Costruisco da zero e intervengo su progetti esistenti: bugfix, performance,
            funzionalità nuove. Se il codice c&apos;è già, non riscrivo tutto — miglioro
            quello che serve.
          </p>
          <p>
            <strong>Vengo dal commerciale, non solo dal codice.</strong> Per questo quando
            lavoro a un progetto parto sempre dalla domanda: cosa serve davvero al
            business? La tecnologia viene dopo.
          </p>
        </div>
      </div>
    </section>

    {/* I marchi restano nei loro colori: a riposo leggermente attenuati, pieni
        al passaggio del mouse. Solo GitHub e Three.js, monocromatici scuri,
        vengono invertiti in bianco dal CSS per non sparire sul fondo. */}
    <div className="logos" aria-hidden="true">
      <LogoRow files={LOGHI.slice(0, 14)} dir={-1} />
      <LogoRow files={LOGHI.slice(14)} dir={1} />
    </div>
    <p className="shell body-s" style={{ paddingTop: "1rem", color: "var(--ink-4)", fontSize: ".9rem" }}>
      Html5 | Css | Javascript | Typescript | Vite | React | Redux | Three.js | Tailwind |
      Bootstrap | Figma | Firebase | Sass | npm | Java | Spring | Sql | Hibernate |
      PostgreSql | Docker | Git | GitHub | BitBucket | VsCode | IntelliJ
    </p>
  </div>
);

export default AboutMe;
