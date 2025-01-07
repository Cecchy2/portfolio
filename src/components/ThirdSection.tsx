import { Card, Col, Container, Row } from "react-bootstrap";

const ThirdSection = () => {
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <h1 className="text-center display-6 fw-bold mb-4 mt-5">Alcuni Progetti:</h1>

          <Col xs={5}>
            <Card className="projectsCards mx-2 p-1 mb-2">
              <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.50.33.png" />
            </Card>
          </Col>
          <Col xs={5}>
            SICILY FRESH è Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero ex ab cum labore facere esse
            vero dicta doloremque necessitatibus rem hic aspernatur, fugit dolorem amet, dolores illum dolore soluta.
            Delectus.
          </Col>

          <Col xs={5}>
            <Card className="projectsCards mx-2 p-1 mb-2">
              <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.50.55.png" />
            </Card>
          </Col>
          <Col xs={5}>
            SICILY FRESH è Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero ex ab cum labore facere esse
            vero dicta doloremque necessitatibus rem hic aspernatur, fugit dolorem amet, dolores illum dolore soluta.
            Delectus.
          </Col>

          <Col xs={5}>
            <Card className="projectsCards mx-2 p-1 mb-2">
              <Card.Img variant="top" src="/public/projects/Screenshot 2024-12-13 alle 15.51.25.png" />
            </Card>
          </Col>

          <Col xs={5}>
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
