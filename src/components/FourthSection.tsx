import { Col, Container, Image, Row } from "react-bootstrap";

const FourthSection = () => {
  return (
    <>
      <div className=" bg-dark">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Image src="/public/Fotoprofilo.jpg" className="aboutImage mb-md-5 mt-5" />
            </Col>
            <Col md={6} className="text-white">
              {" "}
              <h1 className="  text-center display-3 fw-bold mb-2 text-white">Chi sono:</h1>
              <p className="fs-5 mb-5 mt-2">
                Sono un Full-Stack Developer con una forte passione per la tecnologia e la programmazione. Dopo anni nel
                settore commerciale, ho deciso di inseguire il mio vero interesse avviando una nuova carriera in un
                ambito che mi ha sempre affascinato. Per farlo, ho completato con successo un Bootcamp intensivo di
                oltre 1200 ore presso Epicode, dove, grazie a progetti reali e alla mia determinazione, ho consolidato
                competenze in{" "}
                <span className="text-warning">JavaScript, Typescript, React, Java, Spring e molto altro </span>. Oggi
                metto insieme la mia esperienza pregressa nella gestione e nel problem solving con le mie abilità
                tecniche per sviluppare soluzioni innovative, efficienti e focalizzate sull’utente. Sono costantemente
                alla ricerca di nuove sfide e crescita professionale, entusiasta di collaborare con team dinamici e
                contribuire attivamente a progetti ambiziosi. L’obiettivo? Creare prodotti digitali di valore, portando
                passione e precisione in ogni riga di codice.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FourthSection;
