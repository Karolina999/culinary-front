import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/login.module.css";
import { User, UserDto } from "../types";
import { registerUser } from "../services/user";

const Rejestracja = () => {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: UserDto) => {
    setIsLoading(true);
    await registerUser(values)
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.data?.detail.includes("There is a user with this e-mail"))
          setIsError("Konto o tym adresie email już istenieje");
        else {
          setIsError("Wystąpił błąd");
        }
      });
  };

  const schema = yup.object().shape({
    firstName: yup.string().required("To pole jest wymagane"),
    lastName: yup.string().required("To pole jest wymagane"),
    email: yup
      .string()
      .required("To pole jest wymagane")
      .email("Nieprawidłowy adres email"),
    password: yup.string().required("To pole jest wymagane"),
  });

  return (
    <div className={styles.background}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={6}>
            <h3 className="bold text-center pb-5 pt-sm-5 pt-lg-3 mt-5 mt-lg-0">
              Rejestracja
            </h3>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={schema}
              onSubmit={(values) => onSubmit(values)}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                imageUrl: "",
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control
                      placeholder="Jan"
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
                      placeholder="Kowalski"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
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
                  <div className="pb-2">
                    <small className="text-danger">{isError}</small>
                  </div>
                  <div className="d-grid">
                    <Button
                      variant="danger"
                      type="submit"
                      className="mt-3"
                      onClick={() => setIsError("")}
                    >
                      {isLoading ? (
                        <Spinner animation="border" variant="light" size="sm" />
                      ) : (
                        "Zarejestruj się"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Rejestracja;
