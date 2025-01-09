import { Col, Container, Form, Image, Row } from "react-bootstrap";

const FormSection = () => {
  return (
    <>
      <div className="FormSection">
        <Container>
          <Row className="pt-5">
            <Col></Col>
          </Row>
          <Row className="pt-5">
            <Col md={5}>
              <Image src="/photo-1432821596592-e2c18b78144f.avif" alt="macchina da scrivere" className="formImmage" />
            </Col>
            <Col md={7} class>
              <h2 className="mt-5 display-6 fw-bold text-center">Lasciami un messaggio</h2>
              <Form className="mt-5">
                <Form.Group className="mb-3" controlId="formGroupNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="name" placeholder="inserisci il tuo nome" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupCognome">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control type="name" placeholder="inserisci il tuo cognome" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email </Form.Label>
                  <Form.Control type="email" placeholder="Inserisci la tua email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupText">
                  <Form.Label>Scrivi il tuo messaggio</Form.Label>
                  <Form.Control as="textarea" rows={5} />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FormSection;
