import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const FirstSection = () => {
  const [isFirstSectionVisible, setIsFirstSectionVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsFirstSectionVisible(window.scrollY <= 100);
    };
    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Container>
      <Row>
        <div className={`section ${isFirstSectionVisible ? "" : "opacityTransition"}`}>
          <Col className={`d-flex justify-content-center align-items-center sectionImage flex-column flex-xl-row`}>
            <Col md={2}>
              <Image src="../../Fotoprofilo.jpg" className={`profileImage object-fit-cover bordiImage`} /> <br />
            </Col>
            <Col xs={12} xl={5} className="text-center text-xl-start">
              <p className="m-0 fs-4 fw-bold">Ciao, sono</p>
              <div>
                <h1 className="m-0 display-3 fw-bold">Dario Cecchinato</h1>
                <h2>Sviluppatore Web • Front-end • Back-end</h2>
                <hr className="w-75 mx-auto mt-4" />
                <p className="m-0 fs-5 mt-4">
                  La programmazione è ciò che mi entusiasma da sempre, un campo dove posso mettere in gioco la mia
                  creatività e risolvere problemi reali.
                </p>
                <div className="d-flex  align-items-center justify-content-xl-start justify-content-center">
                  <div className="mt-4 me-3">
                    <FaLinkedin size={50} />
                  </div>
                  <div className="mt-4 me-3">
                    <FaGithub size={50} />
                  </div>
                  <div className="mt-4 me-3">
                    <MdEmail size={50} />
                  </div>
                  <a href="/public/curriculum  2024.pdf" className="mt-4">
                    <Button variant="warning"> Scarica il CV</Button>
                  </a>
                </div>
              </div>
            </Col>
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default FirstSection;
