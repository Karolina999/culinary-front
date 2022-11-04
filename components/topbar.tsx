import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { GiCook, GiShoppingCart } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";

interface TopbarProps {
  transparent?: boolean;
}

const Topbar = ({ transparent }: TopbarProps) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className={`py-3 ${transparent ? "navTransparent" : "navColor"}`}
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          href="/"
          className="caladea-font border-bottom px-2 pb-1"
          style={{ letterSpacing: "3px", fontWeight: "bold" }}
        >
          Daily Cooking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {/* <Nav.Link href="">More deets</Nav.Link> */}
            <div className="d-flex px-2">
              <Nav.Link href="">
                <GiShoppingCart style={{ fontSize: "30px", color: "white" }} />
              </Nav.Link>
              <Nav.Link href="">
                <GiCook style={{ fontSize: "30px", color: "white" }} />
              </Nav.Link>
              <Nav.Link href="">
                <BsSearch style={{ fontSize: "25px", color: "white" }} />
              </Nav.Link>
            </div>
            <Button
              variant="danger"
              style={{ borderRadius: "40px" }}
              className="px-4"
            >
              Planner
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
