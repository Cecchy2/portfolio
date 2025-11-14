import { Container, Row, Col, Image } from "react-bootstrap";

const Smartwage = () => {
  return (
    <>
      <div className="smartwage" id="sicilyFresh">
        <Container fluid>
          <Row>
            <Col></Col>
          </Row>{" "}
          <Row>
            {" "}
            <Col xl={6}>
              <Image
                src="/projects/Smartwage.png"
                className="sicilyFreshImg my-5 px-5 "
                onClick={() =>
                  window.open("https://www.smartwage.it/", "_blank")
                }
              />
            </Col>
            <Col xl={6}>
              <div>
                <h1 className="mx-5 display-6 fw-bold mt-xl-5 mb-5">
                  Smartwage 🎯
                </h1>
                <h4 className="mx-5">
                  Piattaforma che permette la gestione del Welfare
                </h4>
                <br />

                <h4 className="mx-5 pb-5 pb-xl-0">
                  Web app in React e App mobile collegata in React native
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Smartwage;
