import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

const FormSection = () => {
  const [formValues, setFormValues] = useState({
    nome: "",
    cognome: "",
    email: "",
    messaggio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://fellow-jyoti-cecchy-3c2d0121.koyeb.app/messaggi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Messaggio inviato con successo!");
        setFormValues({
          nome: "",
          cognome: "",
          email: "",
          messaggio: "",
        });
      } else {
        const error = await response.json();
        console.error("Errore nell'invio del messaggio:", error);
        alert("Si è verificato un errore durante l'invio del messaggio.");
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      alert("Errore di connessione. Controlla il server.");
    }
  };

  return (
    <>
      <div className="formSection" id="formSection">
        <Container>
          <Row className="pt-5">
            <Col></Col>
          </Row>
          <Row className="pt-5">
            <Col md={5}>
              <Image src="/photo-1432821596592-e2c18b78144f.avif" alt="macchina da scrivere" className="formImage" />
            </Col>
            <Col md={7}>
              <h2 className="mt-5 display-6 fw-bold text-center">Lasciami un messaggio</h2>
              <Form className="my-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formValues.nome}
                    onChange={handleChange}
                    placeholder="Inserisci il tuo nome"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupCognome">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    name="cognome"
                    value={formValues.cognome}
                    onChange={handleChange}
                    placeholder="Inserisci il tuo cognome"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Inserisci la tua email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupText">
                  <Form.Label>Scrivi il tuo messaggio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="messaggio"
                    value={formValues.messaggio}
                    onChange={handleChange}
                    placeholder="Scrivi un messaggio..."
                    required
                  />
                </Form.Group>
                <Button variant="warning" className="w-100" type="submit">
                  {" "}
                  Invia
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FormSection;
