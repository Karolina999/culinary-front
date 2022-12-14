import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/settings.module.css";
import router from "next/router";
import { UserDto } from "../types";
import { putUser, putUserPassword } from "../services/user";
import { Toast } from "primereact/toast";

const Ustawienia = () => {
  const schema1 = yup.object().shape({
    firstName: yup.string().required("To pole jest wymagane"),
    lastName: yup.string().required("To pole jest wymagane"),
  });
  const schema2 = yup.object().shape({
    oldPassword: yup.string().required("To pole jest wymagane"),
    newPassword: yup
      .string()
      .required("To pole jest wymagane")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Hasło musi mieć minimum 8 znaków, jedeną dużą literę, jeden numer i jeden specjalny znak"
      ),
    confirmPassword: yup
      .string()
      .required("To pole jest wymagane")
      .oneOf([yup.ref("newPassword"), null], "Hasła się nie zgadzają"),
  });
  const schema3 = yup.object().shape({
    email: yup
      .string()
      .required("To pole jest wymagane")
      .email("Podaj adres e-mail"),
  });

  const [user, setUser] = useState<UserDto>({});
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const toast = useRef<any>(null);

  useEffect(() => {
    if (localStorage.getItem("jwt") && localStorage.getItem("user")) {
      const storageUser = localStorage.getItem("user");
      typeof storageUser === "string" && setUser(JSON.parse(storageUser));
    } else {
      router.push(`/login`, "", { scroll: true });
    }
    setLoading(false);
  }, []);

  async function updateUser(userToUpdate: UserDto) {
    let error = "";
    await putUser(userToUpdate)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(userToUpdate));
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Dane zostały zaktualizowane",
          life: 3000,
        });
      })
      .catch((err) => {
        error =
          err.data.detail === "There is a user with this e-mail"
            ? "Ten e-mail jest zajęty"
            : "Wystąpił błąd";
        setPasswordError(error);
      });
    return error;
  }

  async function updatePassword(oldPassword: string, newPassword: string) {
    let error = "";
    await putUserPassword(oldPassword, newPassword)
      .then((res) =>
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Dane zostały zaktualizowane",
          life: 3000,
        })
      )
      .catch((err) => {
        error =
          err.data.detail === "Bad old password"
            ? "Złe stare hasło"
            : "Wystąpił błąd";
      });
    return error;
  }

  return (
    <>
      <Toast ref={toast} />

      <div style={{ position: "relative" }}>
        <div className={`${styles.background}`}>
          {loading ? (
            <Container
              className="py-5 my-5"
              style={{ minHeight: "92vh" }}
            ></Container>
          ) : (
            <Container className="py-5 my-5">
              <Row className="justify-content-center">
                <Col md={10} lg={6} className="mt-sm-5 mt-md-0">
                  <h3 className="bold pt-sm-5 pt-md-0 mt-5 mt-md-0">
                    Ustawienia konta
                  </h3>
                  <h5 className="pt-4 pb-3">Dodaj zdjęcie</h5>
                  <h5 className="pt-4 pb-3">Zmień dane</h5>
                  <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={schema1}
                    onSubmit={async (values) => {
                      const userToUpdate = user;
                      user.firstName = values.firstName;
                      user.lastName = values.lastName;
                      const error = await updateUser(userToUpdate);
                      error ? setDataError(error) : setDataError("");
                    }}
                    initialValues={{
                      firstName: user.firstName ? user.firstName : "",
                      lastName: user.lastName ? user.lastName : "",
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
                        <Form.Group className="mb-2">
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
                        <small className="text-danger">{dataError}</small>
                        <div className="d-grid mt-3">
                          <Button
                            variant="danger"
                            type="submit"
                            className="mt-2"
                          >
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
                    onSubmit={async (values) => {
                      const error = await updatePassword(
                        values.oldPassword,
                        values.newPassword
                      );
                      error ? setPasswordError(error) : setPasswordError("");
                    }}
                    initialValues={{
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
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
                            placeholder="Nowe hasło"
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.newPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.newPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Powtórz hasło</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Powtórz hasło"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmPassword}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <small className="text-danger">{passwordError}</small>
                        <div className="d-grid">
                          <Button
                            variant="danger"
                            type="submit"
                            className="mt-3"
                          >
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
                    onSubmit={async (values) => {
                      const userToUpdate = user;
                      user.email = values.email;
                      const error = await updateUser(userToUpdate);
                      error ? setEmailError(error) : setEmailError("");
                    }}
                    initialValues={{
                      email: user.email ? user.email : "",
                    }}
                  >
                    {({ handleSubmit, handleChange, values, errors }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
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
                        <small className="text-danger">{emailError}</small>
                        <div className="d-grid mt-3">
                          <Button
                            variant="danger"
                            type="submit"
                            className="mt-2"
                          >
                            Zapisz
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    </>
  );
};

export default Ustawienia;
