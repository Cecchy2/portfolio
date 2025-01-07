import { Col, Container, Image, Row } from "react-bootstrap";

const FourthSection = () => {
  return (
    <>
      <div className=" bg-dark">
        <h1 className=" pt-5 text-center display-3 fw-bold mb-4 text-white">Chi sono:</h1>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Image src="/public/Fotoprofilo.jpg" className="aboutImage mb-md-5" />
            </Col>
            <Col md={6} className="text-white">
              {" "}
              <p className="fs-5 mb-5 mt-2">
                Sono un Full-Stack Developer con una forte passione per la tecnologia e la programmazione. Dopo aver
                lavorato per anni nel settore commerciale ho deciso di interrompere la mia carriera per intraprenderne
                una nuova in un ambito che da sempre mi affascina e mi stimola a creare soluzioni innovative. Così ho
                completato un Bootcamp di oltre 1200 ore presso Epicode, dove, grazie alla mia determinazione e allo
                svolgimento di progetti reali, mi sono diplomato con altissimi voti.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FourthSection;
