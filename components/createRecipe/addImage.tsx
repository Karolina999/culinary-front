import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import UploadImage from "./uploadImage";

const AddImage = () => {
  return (
    <div className="pb-4">
      <Form.Label className="bold">
        Dodaj zdjęcie{" "}
        <Form.Text style={{ fontWeight: "normal" }}>(opcjonalnie)</Form.Text>
      </Form.Label>
      <Row>
        <Col md={9} lg={6}>
          {/* <UploadImage onClick={(e) => e.preventDefault()} /> */}
        </Col>
      </Row>
    </div>
  );
};

export default AddImage;
