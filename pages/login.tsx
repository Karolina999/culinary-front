import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/login.module.css";

const LogIn = () => {
  return (
    <div className={styles.background}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={7}>
            <h3 className="bold text-center pb-4">Logowanie</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;
