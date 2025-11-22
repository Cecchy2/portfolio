import { Col, Container, Row } from "react-bootstrap";

const AboutMe = () => {
  return (
    <>
      <div className=" bg-dark mt-5 p-5" id="about-me">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col className="text-white text-center md:p-10">
              <h1 className=" display-6 fw-bold text-white">Ciao sono Dario</h1>

              <p className="fs-3 mb-2 mt-2">
                Sono un Front-end developer con una grande passione per la
                programmazione, amo sviluppare applicazioni e curare ogni minimo
                dettaglio per renderle perfette. Ogni giorno mi destreggio tra{" "}
                <span className="text-warning">
                  JavaScript, TypeScript, React, React Native e Redux.
                </span>{" "}
                <br />
                <span>
                  Utilizzo svariati framework: da Tailwind a Bootstrap.
                </span>
                <br />
                Le API (con le loro key) sono il mio pane quotidiano, e non
                manca una buona dose di curiosità per nuovi framework e
                strumenti che possano rendere il mio lavoro più fluido e
                divertente.
                <br />
                <br />
                Ho esperienza anche con{" "}
                <span className="text-warning">Java e Spring,</span>
                che mi permettono di avere una visione completa quando serve.
                <br />
                <br />
                Inoltre, ho ottime doti comunicative sviluppate durante le mie
                esperienze come commerciale: so relazionarmi con i clienti,
                comprendere le loro esigenze e presentare soluzioni in modo
                chiaro, professionale ed empatico.
              </p>

              <br />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default AboutMe;
