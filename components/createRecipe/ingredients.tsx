import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import SelectList from "../inputs/selectList";
import { FieldArray } from "formik";

interface Option {
  value: string;
  label: string;
}

interface IngredientsProps {
  options: Option[];
  errors: any;
  values: { unit: string; ingredientId: string; quantity: string }[];
}

const Ingredients = ({ options, errors, values }: IngredientsProps) => {
  return (
    <div>
      {values.map((x) => (
        <p>bsns</p>
      ))}
      <Form.Group className="mb-4">
        <Form.Label className="bold">Składniki</Form.Label>
        <FieldArray
          name="productFromRecipes"
          render={(arrayHelper) => (
            <div>
              {values.map((value, index) => (
                <div>
                  <Row className="pb-3">
                    <Col xs={12} lg={7} className="mb-4 mb-lg-0">
                      <SelectList
                        options={options}
                        placeholder="np. Pomidory"
                        name={`productFromRecipes.${index}.ingredientId`}
                      />
                    </Col>
                    <Col>
                      <Row>
                        <Col xs={4}>
                          <Form.Control
                            type="number"
                            placeholder="1"
                            name=""
                            min={1}
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
                            <option>Defausslt select</option>
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
                </div>
              ))}
            </div>
          )}
        />

        <div className="d-flex pt-4">
          <Button variant="success" className="ms-auto">
            Dodaj składnik
          </Button>
        </div>
      </Form.Group>
    </div>
  );
};

export default Ingredients;
