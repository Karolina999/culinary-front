import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { GiCook } from "react-icons/gi";
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
            <div className="d-lg-flex px-2 pt-4 py-lg-0">
              <Nav.Link href="/lista" className="d-flex">
                <CgNotes style={{ fontSize: "30px" }} />
                <p className="px-2 pt-1 d-lg-none">Listy zakupów</p>
              </Nav.Link>
              <Nav.Link href="/przepisy/szukaj" className="d-flex">
                <BsSearch style={{ fontSize: "25px" }} />
                <p className="px-2 pt-1 d-lg-none">Znajdź przepis</p>
              </Nav.Link>

              <div className="d-lg-none">
                <hr className="text-light mt-0" />
                {user ? (
                  <>
                    <Nav.Link href="/przepisy/dodaj">Dodaj przepis</Nav.Link>
                    <Nav.Link href="/przepisy/obserwowane">
                      Ulubione przepisy
                    </Nav.Link>
                    <Nav.Link href="/ustawienia">Ustawienia konta</Nav.Link>
                    <hr className="text-light" />
                    <Nav.Link
                      href="/"
                      onClick={() => {
                        localStorage.removeItem("jwt");
                        localStorage.removeItem("user");
                      }}
                      className="mb-3"
                    >
                      Wyloguj się
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login">Logowanie</Nav.Link>
                    <Nav.Link href="/rejestracja">Rejestracja</Nav.Link>
                  </>
                )}
                <hr className="text-light" />
              </div>

              <NavDropdown
                className="topbar d-none d-lg-block"
                title={<GiCook style={{ fontSize: "30px" }} />}
              >
                {user ? (
                  <>
                    <NavDropdown.Item href="/przepisy/dodaj">
                      Dodaj przepis
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/przepisy/obserwowane">
                      Ulubione przepisy
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/ustawienia">
                      Ustawienia konta
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="/"
                      onClick={() => {
                        localStorage.removeItem("jwt");
                        localStorage.removeItem("user");
                      }}
                    >
                      Wyloguj się
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="/login">Logowanie</NavDropdown.Item>
                    <NavDropdown.Item href="/rejestracja">
                      Rejestracja
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </div>
            <Button
              onClick={() => (window.location.href = "/planner")}
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
