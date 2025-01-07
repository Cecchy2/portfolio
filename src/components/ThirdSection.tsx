import { Card, Col, Container, Row } from "react-bootstrap";

const ThirdSection = () => {
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <h1 className="text-center display-3 fw-bold mb-4 mt-5">Alcuni Progetti:</h1>

          <Col xs={12} xl={5}>
            <Card className="projectsCards p-1 mb-xl-4 mx-auto">
              <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.50.33.png" />
            </Card>
          </Col>
          <Col xs={12} xl={6} className="pb-5 pt-3 px-5 px-xl-0">
            Sicily Fresh è il mio capstone per il diploma FullStack di Epicode. Il back-end è in Java con Spring Boot e
            Hibernate, usando PostgreSQL e un ERD per il mapping relazionale. Spring Security per autenticazione e
            autorizzazione, con ruoli per Clienti e Fornitori. Il front-end utilizza JavaScript, React e Redux per la
            gestione dello stato. La comunicazione tra front-end e back-end avviene tramite API REST, testate con
            Postman. L’interfaccia permette di sfogliare ricette, aggiungerle al carrello e completare ordini.
          </Col>

          <Col xs={12} xl={5}>
            <Card className="projectsCards  p-1 mb-xl-4 mx-auto">
              <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.50.55.png" />
            </Card>
          </Col>
          <Col xs={12} xl={6} className=" pb-5 pt-3 px-5 px-xl-0">
            SICILY FRESH è Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero ex ab cum labore facere esse
            vero dicta doloremque necessitatibus rem hic aspernatur, fugit dolorem amet, dolores illum dolore soluta.
            Delectus.
          </Col>

          <Col xs={12} xl={5}>
            <Card className="projectsCards  p-1 mb-xl-4 mx-auto">
              <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.51.25.png" />
            </Card>
          </Col>

          <Col xs={12} xl={6} className=" pb-5 pt-3 px-5 px-xl-0">
            SICILY FRESH è Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero ex ab cum labore facere esse
            vero dicta doloremque necessitatibus rem hic aspernatur, fugit dolorem amet, dolores illum dolore soluta.
            Delectus.
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ThirdSection;
