import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/login.module.css";
import { UserLoginDto } from "../types";
import { loginUser } from "../services/user";
import router from "next/router";

const LogIn = () => {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: UserLoginDto) => {
    setIsLoading(true);
    await loginUser(values)
      .then((res) => {
        localStorage.setItem("jwt", res?.headers?.jwt);
        localStorage.setItem("user", JSON.stringify(res?.data));
        window.location.href = "/";
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.data?.detail.includes("Wrong password or login"))
          setIsError("Zły login lub hasło");
        else {
          setIsError("Wystąpił błąd");
        }
      });
  };

  const schema = yup.object().shape({
    login: yup
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
              onSubmit={(values) => onSubmit(values)}
              initialValues={{
                login: "",
                password: "",
              }}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      placeholder="example@gmail.com"
                      name="login"
                      value={values.login}
                      onChange={handleChange}
                      isInvalid={!!errors.login}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.login}
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
                        "Zaloguj się"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="pt-5 text-center">
              <h5>Nie posiadasz konta?</h5>
              <p
                className="cursor-pointer"
                onClick={() =>
                  router.push("/rejestracja", "", { scroll: true })
                }
              >
                Zarejestruj się
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;
