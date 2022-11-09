import React from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/settings.module.css";

const Ustawienia = () => {
  const schema1 = yup.object().shape({
    firstName: yup.string().required("To pole jest wymagane"),
    lastName: yup.string().required("To pole jest wymagane"),
  });
  const schema2 = yup.object().shape({
    oldPassword: yup.string().required("To pole jest wymagane"),
    newPassword: yup.string().required("To pole jest wymagane"),
  });
  const schema3 = yup.object().shape({
    email: yup.string().required("To pole jest wymagane"),
  });
  return (
    <div style={{ position: "relative" }}>
      <div className={`${styles.background}`}>
        <Container className="py-5 my-5">
          <Row className="justify-content-center">
            <Col md={6} className="mt-sm-5 mt-md-0">
              <h3 className="bold pt-sm-5 pt-md-0 mt-5 mt-md-0">
                Ustawienia konta
              </h3>
              <h5 className="pt-4 pb-3">Dodaj zdjęcie</h5>
              <h5 className="pt-4 pb-3">Zmień dane</h5>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={schema1}
                onSubmit={console.log}
                initialValues={{
                  firstName: "",
                  lastName: "",
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>Imię</Form.Label>
                      <Form.Control
                        placeholder="Imię"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Nazwisko</Form.Label>
                      <Form.Control
                        placeholder="Nazwisko"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="danger" type="submit" className="mt-2">
                        Zapisz
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <h5 className="pt-4 pb-3">Zmień hasło</h5>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={schema2}
                onSubmit={console.log}
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>Stare hasło</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Stare hasło"
                        name="oldPassword"
                        value={values.oldPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.oldPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.oldPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Nowe hasło</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Hasło"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.newPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.newPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="danger" type="submit" className="mt-2">
                        Zapisz
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <h5 className="pt-4 pb-3">Zmień email</h5>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={schema3}
                onSubmit={console.log}
                initialValues={{
                  email: "",
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="danger" type="submit" className="mt-2">
                        Zapisz
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Ustawienia;
