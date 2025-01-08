import { Col, Container, Row } from "react-bootstrap";
import CarouselLoghi from "./CorouselLoghi";

const TechSection = () => {
  return (
    <div className="stickyWrapper">
      <div className="secondSection">
        <h1 className="mx-5 display-6 fw-bold text-center pt-5">Le tecnologie che uso:</h1>
        <Container>
          <Row className="gy-4 justify-content-between mt-5">
            <Col xs={4} md={3} lg={2}>
              <div className="tech-card">
                <img src="/public/javascript.png" alt="JavaScript" className="tech-image" />
                <div className="tech-overlay">
                  <h4>JavaScript per sviluppare applicazioni interattive e robuste</h4>
                </div>
              </div>
            </Col>

            <Col xs={4} md={3} lg={2}>
              <div className="tech-card">
                <img src="/public/typescript.png" alt="TypeScript" className="tech-image" />
                <div className="tech-overlay">
                  <h4>TypeScript per un maggiore controllo del codice</h4>
                </div>
              </div>
            </Col>
            <Col xs={4} md={3} lg={2}>
              <div className="tech-card">
                <img src="/public/react.png" alt="React" className="tech-image" />
                <div className="tech-overlay">
                  <h4>React per la creazione di interfacce utente dinamiche e performanti</h4>
                </div>
              </div>
            </Col>

            <Col xs={4} md={3} lg={2}>
              <div className="tech-card ">
                <img src="/public/java 2.png" alt="Java" className="tech-image " />
                <div className="tech-overlay">
                  <h4>Java per lo sviluppo del backend</h4>
                </div>
              </div>
            </Col>
            <Col xs={4} md={4} lg={2}>
              <div className="tech-card">
                <img src="/public/spring.png" alt="Spring" className="tech-image " />
                <div className="tech-overlay">
                  <h4>Spring e Spring Boot per la sicurezza e un'architettura REST manutenibile</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <h4 className="text-center mt-5">
          Html5 | Css | Javascript | Typescript | Vite | React | Redux | Bootstrap | Sass | Java | Spring | Sql |
          Hibernate | PostgreSql | Git | GitHub | VsCode | IntelliJ
        </h4>
        <div>
          <div className="">
            <CarouselLoghi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSection;
