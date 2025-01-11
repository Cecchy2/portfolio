import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const MyNavBar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  const handleClose = () => setExpanded(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbarIndex" fixed="top" expanded={expanded}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home" onClick={handleClose}>
              HOME
            </Nav.Link>
            <Nav.Link href="#about-me" onClick={handleClose}>
              ABOUT ME
            </Nav.Link>
            <Nav.Link href="#skills" onClick={handleClose}>
              SKILLS
            </Nav.Link>
            <Nav.Link href="#sicilyFresh" onClick={handleClose}>
              MY WORKS
            </Nav.Link>
            <Nav.Link href="#formSection" onClick={handleClose}>
              CONTACTS
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
