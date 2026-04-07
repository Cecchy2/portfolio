import { Col, Container, Image } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const USE_CASES = [
  {
    emoji: "\uD83D\uDD39",
    title: "Hai bisogno di un sito web che funzioni davvero",
    text: "Hai un\u2019attivit\u00e0 o un servizio e ti serve un sito chiaro, professionale e facile da usare, che spieghi bene cosa fai e aiuti a ottenere contatti o richieste concrete.",
  },
  {
    emoji: "\uD83D\uDD39",
    title: "Ti serve un\u2019applicazione web su misura",
    text: "Devi gestire dati, processi o servizi online e le soluzioni \u201Cstandard\u201D non sono sufficienti. Hai bisogno di uno strumento costruito sulle tue esigenze reali.",
  },
  {
    emoji: "\uD83D\uDD39",
    title: "Hai gi\u00e0 un software, ma non funziona come dovrebbe",
    text: "Il progetto esiste gi\u00e0, ma \u00e8 lento, poco stabile, difficile da usare o da modificare. Vuoi migliorarlo senza rifare tutto da zero.",
  },
];

const FirstSection = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <Container className="py-5">
        <div className="hero-content">
          <Col className="d-flex justify-content-center mb-4">
            <Image
              src="../../Fotoprofilo.jpg"
              className="profileImage object-fit-cover bordiImage"
            />
          </Col>

          <h1 className="hero-name hero-headline">
            Il tuo prossimo sito web lo costruisce qualcuno che capisce il tuo
            business.
          </h1>
          <p className="hero-lead">
            Sono Dario. Sviluppo siti, web app e strumenti digitali per aziende
            e professionisti. Con un background commerciale e un approccio
            concreto: prima capisco cosa ti serve, poi lo costruisco.
          </p>

          <p className="hero-cue">Ecco quando posso esserti utile:</p>

          <div className="hero-usecases">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="hero-usecase-card">
                <h3 className="hero-usecase-title">
                  {uc.emoji} {uc.title}
                </h3>
                <p className="hero-usecase-text">{uc.text}</p>
              </div>
            ))}
          </div>

          <div className="hero-socials">
            <a
              href="https://www.linkedin.com/in/cecchy2"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-icon-link"
            >
              <FaLinkedin size={44} />
            </a>
            <a
              href="https://github.com/Cecchy2"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-icon-link"
            >
              <FaGithub size={44} />
            </a>
            <a
              href="mailto:dariocecchinato@gmail.com"
              className="hero-icon-link"
            >
              <MdEmail size={44} />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FirstSection;
