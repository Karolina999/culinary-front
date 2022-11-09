import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import SelectList from "../components/inputs/selectList";

const Dodaj = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <Container className="py-5 d-flex justify-content-center">
        <Col xs={12} lg={10} xxl={8}>
          <h3 className="bold pb-4">Dodaj przepis</h3>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Nazwa potrawy</Form.Label>
              <Form.Control
                placeholder="Zupa pomidorowa"
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
              <Form.Label>Kategoria</Form.Label>
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
              <Form.Label>Składniki</Form.Label>
              <Row>
                <Col>
                  <SelectList options={options} placeholder="Pomidory" />
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="Zupa pomidorowa"
                        name=""
                        // value={values.email}
                        // onChange={handleChange}
                        // isInvalid={!!errors.email}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Zupa pomidorowa"
                        name=""
                        // value={values.email}
                        // onChange={handleChange}
                        // isInvalid={!!errors.email}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button>Kosz</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default Dodaj;
