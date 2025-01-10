import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Container className="text-white">
          <Row>
            <Col className="mt-5">
              <p>Realizzato da Dario Cecchinato | |</p>
              <p>Contattami: dariocecchinato@gmail.com</p>
              <p>LinkedIn: linkedin.com/in/cecchy2</p>© 2025 Dario Cecchinato. Tutti i diritti riservati. Grazie per
              aver visitato il mio portfolio!
            </Col>
            <Col className="mt-5">Creato con React, Redux, e Spring Boot | Deploy: Koyeb & Netlify</Col>
            <Col className="mt-5"> Hai un progetto in mente? Contattami per collaborare!</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
