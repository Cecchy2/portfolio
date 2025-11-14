import { Col, Container, Image, Row } from "react-bootstrap";

const AboutMe = () => {
  return (
    <>
      <div className=" bg-dark mt-5" id="about-me">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Image
                src="/Fotoprofilo.jpg"
                className="aboutImage mb-md-5 mt-5 ms-4 ms-xl-0"
              />
            </Col>
            <Col md={6} className="text-white">
              <h1 className="mx-5 display-6 fw-bold text-white">Chi sono:</h1>
              <p className="fs-3 mb-2 mt-2">
                Lavoro come front-end developer e ogni giorno mi destreggio tra
                <span className="text-warning">
                  {" "}
                  JavaScript, TypeScript, React, React Native e Redux.{" "}
                </span>{" "}
                <br />
                <br />
                Le API (con le loro key) sono il mio pane quotidiano, e non
                manca una buona dose di curiosità per nuovi framework e
                strumenti che possano rendere il mio lavoro più fluido e
                divertente. <br /> <br />
                Ho esperienza anche con{" "}
                <span className="text-warning"> Java e Spring, </span>
                che mi aiutano a vedere il quadro completo quando serve.
              </p>
              <br />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default AboutMe;
