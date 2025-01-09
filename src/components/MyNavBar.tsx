import { Container, Nav, Navbar } from "react-bootstrap";

const MyNavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#link">ABOUT ME</Nav.Link>
            <Nav.Link href="#link">SKILLS </Nav.Link>
            <Nav.Link href="#link">MY WORKS </Nav.Link>
            <Nav.Link href="#link">CONTACT </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
