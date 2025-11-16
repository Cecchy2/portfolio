import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const MyNavBar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary navbarIndex"
      fixed="top"
      expanded={expanded}
      style={{ zIndex: 99999 }}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links">
            <Nav.Link href="#home" onClick={handleClose}>
              HOME
            </Nav.Link>
            <Nav.Link href="#about-me" onClick={handleClose}>
              CHI SONO
            </Nav.Link>
            <Nav.Link href="#skills" onClick={handleClose}>
              SKILLS
            </Nav.Link>
            <Nav.Link href="#sicilyFresh" onClick={handleClose}>
              PROGETTI
            </Nav.Link>
            <Nav.Link href="#formSection" onClick={handleClose}>
              CONTATTAMI
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
