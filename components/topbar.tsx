import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { GiCook, GiShoppingCart } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";

interface TopbarProps {
  transparent?: boolean;
  transparentNav?: boolean;
}

const Topbar = ({ transparent, transparentNav }: TopbarProps) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setUser(true);
    }
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className={`py-3 ${transparent ? "navTransparent navColor" : "navColor"}`}
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
          <Nav className="me-auto"></Nav>
          <Nav
            className={
              transparentNav ? "navTransparentOpen pt-5 mt-1 pb-3 px-2" : ""
            }
          >
            {/* <Nav.Link href="">More deets</Nav.Link> */}
            <div className="d-lg-flex px-2 pt-4 py-lg-0">
              <Nav.Link href="" className="d-flex">
                <GiShoppingCart style={{ fontSize: "30px", color: "white" }} />
                <p className="px-2 pt-1 text-white d-lg-none">Listy zakupów</p>
              </Nav.Link>
              <Nav.Link href="" className="d-flex">
                <CgNotes style={{ fontSize: "30px", color: "white" }} />
                <p className="px-2 pt-1 text-white d-lg-none">Listy zakupów</p>
              </Nav.Link>
              <Nav.Link href="" className="d-flex">
                <GiCook style={{ fontSize: "30px", color: "white" }} />
                <p className="px-2 pt-1 text-white d-lg-none">Moje konto</p>
              </Nav.Link>
              <Nav.Link href="" className="d-flex">
                <BsSearch style={{ fontSize: "25px", color: "white" }} />
                <p className="px-2 pt-1 text-white d-lg-none">Znajdź przepis</p>
              </Nav.Link>
              {user && (
                <Nav.Link
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("user");
                  }}
                >
                  Wyloguj się
                </Nav.Link>
              )}
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
