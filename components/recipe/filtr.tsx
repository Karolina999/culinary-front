import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import MultipleSelect from "../inputs/multipleSelect";
import { Category } from "../../frontType/category";
import { Level } from "../../frontType/level";
import { BsSearch } from "react-icons/bs";
import { Divider } from "primereact/divider";
import Image from "next/image";

interface FiltrProps {
  setCategories: any;
  setLevels: any;
  setPeople: any;
  searchTitle?: string;
}

const Filtr = ({
  setCategories,
  setLevels,
  setPeople,
  searchTitle,
}: FiltrProps) => {
  const [title, setTitle] = useState(searchTitle ? searchTitle : "");
  return (
    <div>
      <Container>
        <Divider align="center" className="mt-0">
          <div className="d-flex">
            <img
              src="/spirals.png"
              style={{ width: "50px", height: "50px", opacity: "0.2" }}
            />
            <h3 className="pt-2 px-2">
              Wyszukaj przepis z{" "}
              <span className="caladea-font bold">Daily Cooking</span>{" "}
            </h3>
            <img
              src="/spirals.png"
              style={{
                width: "50px",
                height: "50px",
                opacity: "0.2",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        </Divider>
        <Row>
          <InputGroup>
            <Form.Control
              placeholder="Wyszukaj potrawy..."
              name="title"
              size="lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/przepisy/szukaj/${title}`;
                }
              }}
            />
            <Button
              size="lg"
              variant="success"
              onClick={() => {
                window.location.href = `/przepisy/szukaj/${title}`;
              }}
            >
              <BsSearch style={{ fontSize: "25px" }} />
            </Button>
          </InputGroup>
        </Row>
        <h5 className="bold pt-3 mb-0">Filtry</h5>
        <Row>
          <Col xs={12} xl={6} className="pt-2">
            <Form.Group>
              <Form.Label>Kategorie</Form.Label>
              <MultipleSelect
                options={Category.map((c, index) => {
                  return { label: c, value: index.toString() };
                })}
                placeholder="np. Zupy"
                handleChange={(values: string[]) => setCategories(values)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} xl={3} className="pt-2">
            <Form.Group>
              <Form.Label>Stopień trudności</Form.Label>
              <MultipleSelect
                options={Level.map((c, index) => {
                  return { label: c, value: index.toString() };
                })}
                placeholder="np. Ławty"
                handleChange={(values: string[]) => setLevels(values)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} xl={3} className="pt-2">
            <Form.Group>
              <Form.Label>Liczba osób</Form.Label>
              <MultipleSelect
                options={[...Array(10)].map((a, index) => {
                  return {
                    label: (index + 1).toString(),
                    value: (index + 1).toString(),
                  };
                })}
                placeholder="np. 2"
                handleChange={(values: string[]) => setPeople(values)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Filtr;
