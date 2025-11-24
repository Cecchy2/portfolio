import { Col, Container, Row } from "react-bootstrap";
import CarouselLoghi from "./CorouselLoghi";
import { useSectionObserver } from "../hooks/useSectionObserver";

const TechSection = () => {
  const ref = useSectionObserver("skills");
  return (
    <div id="skills" ref={ref}>
      <div className="techSection pt-5 ">
        <h1 className="mx-5 display-6 fw-bold text-center pt-5 ">
          Alcune tecnologie che uso
        </h1>
        <div className=" border-t-8 border-t-amber-400 w-2/6 mx-auto mb-10" />
        <Container>
          <Row className="gy-4 justify-content-between mt-3">
            <Col xs={4} md={4} lg={2}>
              <div className="tech-card">
                <img
                  src="/javascript.png"
                  alt="JavaScript"
                  className="tech-image"
                />
                <div className="tech-overlay">
                  <h4>
                    JavaScript per sviluppare applicazioni interattive e robuste
                  </h4>
                </div>
              </div>
            </Col>

            <Col xs={4} md={4} lg={2}>
              <div className="tech-card">
                <img
                  src="/typescript.png"
                  alt="TypeScript"
                  className="tech-image"
                />
                <div className="tech-overlay">
                  <h4>TypeScript per un maggiore controllo del codice</h4>
                </div>
              </div>
            </Col>
            <Col xs={4} md={4} lg={2}>
              <div className="tech-card">
                <img src="/react.png" alt="React" className="tech-image" />
                <div className="tech-overlay">
                  <h4>
                    React per la creazione di interfacce utente dinamiche e
                    performanti
                  </h4>
                </div>
              </div>
            </Col>

            <Col xs={4} md={4} lg={2}>
              <div className="tech-card ">
                <img src="/java 2.png" alt="Java" className="tech-image " />
                <div className="tech-overlay">
                  <h4>Java per lo sviluppo del backend</h4>
                </div>
              </div>
            </Col>
            <Col xs={4} md={4} lg={2}>
              <div className="tech-card">
                <img src="/spring.png" alt="Spring" className="tech-image " />
                <div className="tech-overlay">
                  <h4>
                    Spring e Spring Boot per la sicurezza e un'architettura REST
                    manutenibile
                  </h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="mx-10 md:mx-20">
          <h4 className="text-center mt-5 ">
            Html5 | Css | Javascript | Typescript | Vite | React | Redux |
            Three.js | Tailwind | Bootstrap | Figma | Firebase | Sass | npm |
            Java | Spring | Sql | Hibernate | PostgreSql | Docker | Git | GitHub
            | BitBucket | VsCode | IntelliJ
          </h4>
        </div>

        <div>
          <div className="md:mt-10 md:pb-20">
            <CarouselLoghi direction="left" />
            <CarouselLoghi direction="right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSection;
