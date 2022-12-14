import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import UploadImage from "./uploadImage";

interface AddImageProps {
  name: string;
  value: any;
  user?: boolean;
}

const AddImage = ({ name, value, user }: AddImageProps) => {
  return (
    <div className="pb-4">
      {!user && (
        <Form.Label className="bold">
          Zdjęcie{" "}
          <Form.Text style={{ fontWeight: "normal" }}>(opcjonalnie)</Form.Text>
        </Form.Label>
      )}
      <Row>
        {user ? (
          <div style={{ width: "250px" }}>
            <UploadImage
              onClick={(e) => e.preventDefault()}
              name={name}
              value={value}
              user={user}
            />
          </div>
        ) : (
          <Col md={9} lg={6}>
            <UploadImage
              onClick={(e) => e.preventDefault()}
              name={name}
              value={value}
              user={user}
            />
          </Col>
        )}
        <div className="mt-1">
          <Form.Text>
            Możesz dodać zdjęcie w formacie:
            <strong> .png .jpg .jpeg .bpm</strong>
            {/* o maksymalnym rozmiarze{" "} <strong>5 MB</strong> */}
          </Form.Text>
        </div>
      </Row>
    </div>
  );
};

export default AddImage;
