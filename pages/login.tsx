import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "../styles/login.module.css";

const LogIn = () => {
  return (
    <div className={styles.background}>
      <Container className="py-5 my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h3 className="bold text-center pb-5 pt-sm-5 pt-md-0 mt-5 mt-md-0">
              Logowanie
            </h3>
            <Form>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="example@gmail.com" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="hasło" />
              </Form.Group>
              <div className="d-grid">
                <Button variant="danger" type="submit" className="mt-3">
                  Zaloguj się
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;
