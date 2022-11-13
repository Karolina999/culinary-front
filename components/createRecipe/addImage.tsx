import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import UploadImage from "./uploadImage";

interface AddImageProps {
  name: string;
  value: any;
}

const AddImage = ({ name, value }: AddImageProps) => {
  return (
    <div className="pb-4">
      <Form.Label className="bold">
        Zdjęcie{" "}
        <Form.Text style={{ fontWeight: "normal" }}>(opcjonalnie)</Form.Text>
      </Form.Label>
      <Row>
        <Col md={9} lg={6}>
          <UploadImage
            onClick={(e) => e.preventDefault()}
            name={name}
            value={value}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddImage;
