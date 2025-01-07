import { Col, Container, Image, Row } from "react-bootstrap";
import CarouselLoghi from "./CorouselLoghi";

const SecondSection = () => {
  return (
    <div className="stickyWrapper">
      <div className="secondSection">
        <h1 className=" pt-5 text-center display-3 fw-bold mb-4">Le tecnologie che uso:</h1>
        <Container>
          <Row>
            <Col className="d-flex align-items-center ">
              <Image src="/public/javascript.png" className="javascriptImage me-4" />
              <h4>Javascript per lo sviluppo di applicazioni web interattive e robuste</h4>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center ">
              <Image src="/public/typescript.png" className="typescriptImage me-4" />
              <h4 className="typescriptText">Typescript per un maggiore controllo del codice</h4>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center ">
              <Image src="/public/react.png" className="reactImage me-4" />
              <h4>React per la creazione di interfacce utente dinamiche e performanti</h4>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center justify-content-center">
              <Image src="/public/java.png" className="javaImage me-4" />
              <h4 className="javaText">
                Java e 🌱Spring Boot per lo sviluppo del backend, con particolare attenzione alla sicurezza e
                all'architettura REST
              </h4>
            </Col>
          </Row>
        </Container>
        <div className="">
          <div>
            <CarouselLoghi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
