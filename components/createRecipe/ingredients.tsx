import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import SelectList from "../inputs/selectList";
import { FieldArray, useFormikContext } from "formik";
import { Unit } from "../../utils/unit";

interface Option {
  value: string;
  label: string;
}

interface IngredientsProps {
  options: Option[];
  errors: any;
  values: { unit: string; ingredientId: string; amount: string }[];
  handleChange: any;
}

const Ingredients = ({
  options,
  errors,
  values,
  handleChange,
}: IngredientsProps) => {
  const { setFieldValue } = useFormikContext();
  return (
    <div>
      <Form.Group>
        <Form.Label className="bold">Składniki</Form.Label>
        <FieldArray
          name="productFromRecipes"
          render={({ insert, remove }) => (
            <div>
              {values.map((value, index) => (
                <div key={index}>
                  <Row className="mb-4 pb-md-0">
                    <Col xs={12} lg={7} className="mb-2 mb-lg-0">
                      <SelectList
                        options={options}
                        placeholder="np. Pomidor"
                        name={`productFromRecipes.${index}.ingredientId`}
                        error={
                          errors && errors[index] && errors[index].ingredientId
                        }
                        value={value.ingredientId}
                      />
                      <small className="pt-1 text-danger">
                        {errors && errors[index] && errors[index].ingredientId}
                      </small>
                    </Col>
                    <Col>
                      <Row>
                        <Col xs={4}>
                          <Form.Control
                            type="number"
                            placeholder="1"
                            name={`productFromRecipes.${index}.amount`}
                            min={1}
                            value={values[index].amount}
                            onChange={handleChange}
                            isInvalid={
                              errors && errors[index] && !!errors[index].amount
                            }
                          />
                        </Col>
                        <Col>
                          <SelectList
                            options={Unit.map((u, index) => {
                              return { label: u, value: index.toString() };
                            })}
                            placeholder="np. litr"
                            name={`productFromRecipes.${index}.unit`}
                            error={
                              errors && errors[index] && !!errors[index].unit
                            }
                            value={value.unit}
                          />
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="link"
                            className="px-0"
                            onClick={() => values.length > 1 && remove(index)}
                          >
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
              <div className="d-flex">
                <Button
                  variant="success"
                  className="ms-auto"
                  onClick={() =>
                    insert(values.length + 1, {
                      unit: "",
                      ingredientId: "",
                      amount: "",
                    })
                  }
                >
                  Dodaj składnik
                </Button>
              </div>
            </div>
          )}
        />
      </Form.Group>
    </div>
  );
};

export default Ingredients;
