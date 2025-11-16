import { Col, Container, Row } from "react-bootstrap";

const AboutMe = () => {
  return (
    <>
      <div className=" bg-dark mt-5 p-5" id="about-me">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col className="text-white text-center md:p-10">
              <h1 className=" display-6 fw-bold text-white">Chi sono:</h1>

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
