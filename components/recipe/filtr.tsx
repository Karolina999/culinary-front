import React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import MultipleSelect from "../inputs/multipleSelect";
import { Category } from "../../frontType/category";
import { Level } from "../../frontType/level";
import { BsSearch } from "react-icons/bs";

interface FiltrProps {
  setCategories: any;
  setLevels: any;
  setPeople: any;
}

const Filtr = ({ setCategories, setLevels, setPeople }: FiltrProps) => {
  return (
    <div className="rounded p-5" style={{ background: "#F6F6F6" }}>
      <Container>
        <h3 className="pb-3 text-center ">
          Wyszukaj przepis z{" "}
          <span className="caladea-font bold">Daily Cooking</span>{" "}
        </h3>
        <Row>
          <InputGroup>
            <Form.Control
              placeholder="Wyszukaj potrawy..."
              name="title"
              size="lg"
            />
            <Button size="lg" variant="success">
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
