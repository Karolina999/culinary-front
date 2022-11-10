import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import SelectList from "../inputs/selectList";
import { FieldArray, useFormikContext } from "formik";

interface Option {
  value: string;
  label: string;
}

interface IngredientsProps {
  options: Option[];
  errors: any;
  values: { unit: string; ingredientId: string; quantity: string }[];
  handleChange: any;
}

const Ingredients = ({
  options,
  errors,
  values,
  handleChange,
}: IngredientsProps) => {
  const { setFieldValue } = useFormikContext();
  console.log(values);
  return (
    <div>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Składniki</Form.Label>
        <FieldArray
          name="productFromRecipes"
          render={(arrayHelper) => (
            <div>
              {values.map((value, index) => (
                <div>
                  <Row className="mb-4 pb-md-0">
                    <Col xs={12} lg={7} className="mb-2 mb-lg-0">
                      <SelectList
                        options={options}
                        placeholder="np. Pomidory"
                        name={`productFromRecipes.${index}.ingredientId`}
                        error={
                          errors && errors[index] && errors[index].ingredientId
                        }
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
                            name={`productFromRecipes.${index}.quantity`}
                            min={1}
                            value={values[index].quantity}
                            onChange={handleChange}
                            isInvalid={
                              errors &&
                              errors[index] &&
                              !!errors[index].quantity
                            }
                          />
                          {/* <small className="pt-1 text-danger">
                            {errors && errors[index] && errors[index].quantity}
                          </small> */}
                        </Col>
                        <Col>
                          <Form.Select
                            name={`productFromRecipes.${index}.unit`}
                            // value={values[index].unit}
                            onChange={(event) => {
                              const selectName = `productFromRecipes.${index}.unit`;
                              setFieldValue(selectName, event.target.value);
                            }}
                            isInvalid={
                              errors && errors[index] && !!errors[index].unit
                            }
                          >
                            <option value="">Default select</option>
                            <option value={0}>Szczypta</option>
                          </Form.Select>
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="link"
                            className="px-0"
                            onClick={() =>
                              values.length > 1 && arrayHelper.remove(index)
                            }
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
                    arrayHelper.insert(values.length + 1, {
                      unit: "",
                      ingredientId: "",
                      quantity: "",
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
