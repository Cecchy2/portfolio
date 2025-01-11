import { Col, Container, Nav, Row } from "react-bootstrap";
import { CiLinkedin } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Container className="text-white">
          <Row>
            <Col className="mt-5" md={8}>
              <p>Hai un progetto in mente? Contattami: </p>
              <div className="d-flex">
                <MdOutlineMail size={25} />
                <a href="mailto:dariocecchinato@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
                  <p> dariocecchinato@gmail.com</p>
                </a>
              </div>
              <div className="d-flex">
                <CiLinkedin size={25} />
                <Nav.Link href="https://www.linkedin.com/in/cecchy2">
                  <p>LinkedIn: linkedin.com/in/cecchy2</p>
                </Nav.Link>
              </div>
              <div className="d-flex">
                <LuGithub size={25} />
                <Nav.Link href="https://github.com/Cecchy2">
                  <p>GitHub : github.com/Cecchy2</p>
                </Nav.Link>
              </div>
            </Col>
            <Col className="mt-5" md={4}>
              <p>Realizzato da Dario Cecchinato </p>
              <p>Creato con React e Spring Boot | Typescript e Bootstrap | Deploy: Koyeb, Render & Netlify</p>
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
