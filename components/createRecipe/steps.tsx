import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";

const Steps = () => {
  return (
    <div>
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
    </div>
  );
};

export default Steps;
