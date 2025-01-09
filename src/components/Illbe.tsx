import { Image, Col, Container, Row } from "react-bootstrap";

const Illbe = () => {
  return (
    <>
      <div className="illbe ">
        <Container fluid>
          {" "}
          <Row>
            {" "}
            <Col xl={6}>
              <Image
                src="/public/projects/Screenshot 2024-12-13 alle 15.50.55.png"
                className="sicilyFreshImg my-5 px-5"
                onClick={() => window.open("https://illbe.netlify.app/", "_blank")}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col xl={6}>
              <div>
                <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">IllBe</h1>
                <h4 className="mx-5">App Social network </h4>
                <br />
                <h4 className="mx-5">
                  App che dopo una semplice registrazione permette, dopo essersi loggati, di aggiungere amici e
                  chattare.
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Illbe;
