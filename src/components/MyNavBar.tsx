import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "HOME", path: "/" },
  { label: "CASI STUDIO", path: "/casi-studio" },
  { label: "CHI SONO", path: "/chi-sono" },
  { label: "FAQ", path: "/faq" },
  { label: "CONTATTI", path: "/contatti" },
];

const MyNavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  const handleNav = (path: string) => {
    handleClose();
    navigate(path);
    window.scrollTo(0, 0);
    if (path === "/") {
      window.dispatchEvent(new CustomEvent("particles-reset"));
    }
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary navbarIndex"
      fixed="top"
      expanded={expanded}
      style={{ zIndex: 99999 }}
    >
      <Container>
        <Navbar.Brand
          className="navbar-brand-custom"
          role="button"
          onClick={() => handleNav("/")}
        >
          DC
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links">
            {NAV_ITEMS.map((item) => (
              <Nav.Link
                key={item.path}
                onClick={() => handleNav(item.path)}
                active={location.pathname === item.path}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
