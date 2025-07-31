import { Col, Container, Image, Row } from "react-bootstrap";

const AboutMe = () => {
  return (
    <>
      <div className=" bg-dark mt-5" id="about-me">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Image
                src="/Fotoprofilo.jpg"
                className="aboutImage mb-md-5 mt-5 ms-4 ms-xl-0"
              />
            </Col>
            <Col md={6} className="text-white">
              <h1 className="mx-5 display-6 fw-bold text-white">Chi sono:</h1>
              <p className="fs-5 mb-2 mt-2">
                Sono un Full-Stack Developer con una forte passione per la
                tecnologia e la programmazione. Dopo anni nel settore
                commerciale, ho deciso di inseguire il mio vero interesse
                avviando una nuova carriera in un ambito che mi ha sempre
                affascinato.
              </p>
              <br />
              <p className="fs-5 mb-2 mt-2">
                Per farlo, ho completato con successo un Bootcamp intensivo di
                oltre 1200 ore presso Epicode, dove, grazie a progetti reali e
                alla mia determinazione, ho consolidato competenze in
                <span className="text-warning">
                  JavaScript, Typescript, React,React-native, Java, Spring e
                  molto altro ed ho iniziato subito a lavorare in ambito tech.
                </span>
                .
              </p>
              <br />

              <p className="fs-5 mb-2 mt-2">
                Da marzo 2025 lavoro come Frontend Developer presso Smartwage,
                dove sto sviluppando un'applicazione gestionale web in React e
                una mobile app in React Native.
              </p>
              <br />
              <p className="fs-5 mb-5 mt-2">
                Sono stato anche selezionato da Epicode come assistente alla
                docenza, per supportare gli studenti del corso Full-Stack.
                Unisco alla mia passione per il coding l’esperienza maturata nel
                settore commerciale e come istruttore federale di Surf,
                Wakeboard e Wakesurf, portando nel lavoro spirito di iniziativa,
                organizzazione e capacità comunicative.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default AboutMe;
