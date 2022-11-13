import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/login.module.css";

const LogIn = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("To pole jest wymagane")
      .email("Nieprawidłowy adres email"),
    password: yup.string().required("To pole jest wymagane"),
  });
  return (
    <div className={styles.background}>
      <Container className="py-5 my-5">
        <Row className="justify-content-center">
          <Col md={10} lg={6}>
            <h3 className="bold text-center pb-5 pt-sm-5 pt-md-0 mt-5 mt-md-0">
              Logowanie
            </h3>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={schema}
              onSubmit={console.log}
              initialValues={{
                email: "",
                password: "",
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      placeholder="example@gmail.com"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="hasło"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="danger" type="submit" className="mt-3">
                      Zaloguj się
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="pt-5 text-center">
              <h5>Nie posiadasz konta?</h5>
              <p className="cursor-pointer">Zarejestruj się</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;
