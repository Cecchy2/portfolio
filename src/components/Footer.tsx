import { Col, Container, Nav, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Container className="text-white">
          <Row>
            <Col className="mt-5">
              <p>Hai un progetto in mente? Contattami: dariocecchinato@gmail.com</p>

              <Nav.Link href="https://www.linkedin.com/in/cecchy2">
                <p>LinkedIn: linkedin.com/in/cecchy2</p>
              </Nav.Link>
              <Nav.Link href="https://github.com/Cecchy2">
                <p>GitHub : github.com/Cecchy2</p>
              </Nav.Link>
            </Col>
            <Col className="mt-5">
              <p>Realizzato da Dario Cecchinato </p>
              <p>Creato con React e Spring Boot | Deploy: Koyeb, Render & Netlify</p>
            </Col>
            <Col className="mt-5"></Col>
          </Row>
          <Row>
            <p>© 2025 Dario Cecchinato. Tutti i diritti riservati. Grazie per aver visitato il mio portfolio!</p>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
