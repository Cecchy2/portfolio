import { Image, Col, Container, Row } from "react-bootstrap";

const TechQuizGame = () => {
  return (
    <>
      <div className="techQuizGame ">
        <Container fluid>
          {" "}
          <Row>
            {" "}
            <Col xl={6}>
              <Image
                src="/projects/Screenshot 2025-01-09 alle 09.17.52.png"
                className="sicilyFreshImg my-5 px-5"
                onClick={() => window.open("https://techquizgame.netlify.app/", "_blank")}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col xl={6}>
              <div>
                <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">Tech Quiz Game 🤔</h1>
                <h4 className="mx-5">Quiz game creato per la prima build week.</h4>
                <br />

                <h4 className="mx-5">L' applicazione è in Vanilla Javascript,HTML, CSS e DOM Manipulation.</h4>

                <h4 className="mx-5 pb-5 pb-xl-0">L’interfaccia non è responsive, va aperto in schermi grandi.</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TechQuizGame;
