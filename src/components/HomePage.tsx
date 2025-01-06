import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import CarouselLoghi from "./CorouselLoghi";

const HomePage = () => {
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
    <>
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
                  </div>
                </div>
              </Col>
            </Col>
          </div>
        </Row>
      </Container>
      <Row className="d-flex justify-content-center align-items-center">
        <h1 className="text-center display-6 fw-bold mb-2">Alcuni Progetti:</h1>

        <Card className="projectsCards mx-2 p-1">
          <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.50.55.png" />
          <Card.Body className="pt-0 mt-0">
            <Card.Title className="text-center mt-3">ILLBE</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="projectsCards mx-2 p-1">
          <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.50.33.png" />
          <Card.Body className="pt-0 mt-0">
            <Card.Title className="text-center mt-3">SICILY FRESH</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="projectsCards mx-2 p-1">
          <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.51.25.png" />
          <Card.Body className="pt-0 mt-0">
            <Card.Title className="text-center mt-3">METEO</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <div className="section ">
        <div>
          <CarouselLoghi />
        </div>
      </div>

      {/* <div className={`sottolineatura ${isFirstSectionVisible ? "" : "opacityTransition"}`}></div> */}

      <div className="section d-flex justify-content-center align-items-center align-content-center bg-dark">
        <div className="d-flex align-items-center align-content-center">
          <h1>ciao</h1>
        </div>
      </div>

      <div className="section ">
        <h1>Sezione 4</h1>
      </div>
    </>
  );
};

export default HomePage;
