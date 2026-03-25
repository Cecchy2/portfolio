import { Col, Container, Image, Button } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSectionObserver } from "../hooks/useSectionObserver";

const FirstSection = () => {
  const ref = useSectionObserver("home");

  return (
    <div
      id="home"
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container className="py-5">
        <div
          className="d-flex justify-content-center align-items-center flex-column flex-xl-row gap-4 gap-xl-5 hero-text"
          style={{ minHeight: "80vh" }}
        >
          <Col md={2} className="d-flex justify-content-center">
            <Image
              src="../../Fotoprofilo.jpg"
              className="profileImage object-fit-cover bordiImage"
            />
          </Col>

          <Col xs={12} xl={5} className="text-center text-xl-start">
            <h1 className="m-0 display-3 fw-bold hero-name">Dario Cecchinato</h1>
            <h2 className="hero-subtitle mt-2">
              Sviluppatore Front-end • React • Redux
            </h2>
            <hr className="w-75 mx-auto mx-xl-0 mt-4 hero-divider" />
            <p className="m-0 fs-5 mt-4">
              La programmazione è ciò che mi entusiasma da sempre, un campo
              dove posso mettere in gioco la mia creatività e risolvere
              problemi reali.
            </p>
            <div className="d-flex align-items-center justify-content-xl-start justify-content-center">
              <div className="mt-4 me-3">
                <a
                  href="https://www.linkedin.com/in/cecchy2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-icon-link"
                >
                  <FaLinkedin size={50} />
                </a>
              </div>
              <div className="mt-4 me-3">
                <a
                  href="https://github.com/Cecchy2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-icon-link"
                >
                  <FaGithub size={50} />
                </a>
              </div>
              <div className="mt-4 me-3">
                <a
                  href="mailto:dariocecchinato@gmail.com"
                  className="hero-icon-link"
                >
                  <MdEmail size={50} />
                </a>
              </div>
              <a href="/curriculum2025.pdf" className="mt-4">
                <Button variant="warning">Scarica il CV</Button>
              </a>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default FirstSection;
