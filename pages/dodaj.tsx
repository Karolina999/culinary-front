import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import SelectList from "../components/inputs/selectList";
import { BsTrashFill } from "react-icons/bs";
import UploadImage from "../components/createRecipe/uploadImage";

const Dodaj = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <Container className="py-5 d-flex justify-content-center">
        <Col xs={12} lg={10} xxl={9}>
          <h3 className="bold pb-4">Dodaj przepis</h3>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="bold">Nazwa potrawy</Form.Label>
              <Form.Control
                placeholder="np. Zupa pomidorowa"
                name=""
                // value={values.email}
                // onChange={handleChange}
                // isInvalid={!!errors.email}
              />
              {/* <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="bold">Kategoria</Form.Label>
              <Form.Select
                // placeholder="Zupa pomidorowa"
                name=""
                // value={values.email}
                // onChange={handleChange}
                // isInvalid={!!errors.email}
              >
                <option>Default select</option>
              </Form.Select>
              {/* <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="bold">Stopień trudności</Form.Label>
              <Form.Select
                // placeholder="Zupa pomidorowa"
                name=""
                // value={values.email}
                // onChange={handleChange}
                // isInvalid={!!errors.email}
              >
                <option>Default select</option>
              </Form.Select>
              {/* <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="bold">Liczba osób</Form.Label>
              <Form.Select
                // placeholder="Zupa pomidorowa"
                name=""
                // value={values.email}
                // onChange={handleChange}
                // isInvalid={!!errors.email}
              >
                <option>Default select</option>
              </Form.Select>
              {/* <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="bold">Czas przygotowania</Form.Label>
              <Form.Select
                // placeholder="Zupa pomidorowa"
                name=""
                // value={values.email}
                // onChange={handleChange}
                // isInvalid={!!errors.email}
              >
                <option>Default select</option>
              </Form.Select>
              {/* <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback> */}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="bold">Składniki</Form.Label>
              <Row>
                <Col xs={12} lg={7} className="mb-4 mb-lg-0">
                  <SelectList options={options} placeholder="np. Pomidory" />
                </Col>
                <Col>
                  <Row>
                    <Col xs={4}>
                      <Form.Control
                        type="number"
                        placeholder="1"
                        name=""
                        // value={values.email}
                        // onChange={handleChange}
                        // isInvalid={!!errors.email}
                      />
                    </Col>
                    <Col>
                      <Form.Select
                        // placeholder="Zupa pomidorowa"
                        name=""
                        // value={values.email}
                        // onChange={handleChange}
                        // isInvalid={!!errors.email}
                      >
                        <option>Default select</option>
                      </Form.Select>
                    </Col>
                    <Col xs="auto">
                      <Button variant="link" className="px-0">
                        <BsTrashFill
                          style={{ fontSize: "22px" }}
                          className="text-danger"
                        />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="d-flex pt-4">
                <Button variant="success" className="ms-auto">
                  Dodaj składnik
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="bold">Przygotowanie</Form.Label>
              <Row className="align-items-end">
                <Col xs="12">
                  <Form.Label>Krok 1</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Opisz krok"
                    name=""
                    // value={values.email}
                    // onChange={handleChange}
                    // isInvalid={!!errors.email}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback> */}
                </Col>
                <Col xs={12} md="auto">
                  <Row className="pt-2 pt-md-0">
                    <Col xs="auto" className="ms-auto">
                      <Button variant="success">Dodaj zdjęcie</Button>
                    </Col>
                    <Col xs="auto">
                      <Button variant="link" className="px-0">
                        <BsTrashFill
                          style={{ fontSize: "22px" }}
                          className="text-danger"
                        />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <div>
              <Form.Label className="bold">Dodaj zdjęcie</Form.Label>
              <Row>
                <Col md={6}>
                  <UploadImage onClick={(e) => e.preventDefault()} />
                </Col>
              </Row>
            </div>
            <Button type="submit">Dodaj przepis</Button>
          </Form>
        </Col>
      </Container>
      {/* <section onClick={(e) => e.preventDefault()}> */}
    </div>
  );
};

export default Dodaj;
