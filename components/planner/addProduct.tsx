import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import SelectList from "../inputs/selectList";
import { getIngredients } from "../../services/ingredients";
import { IngredientDto } from "../../types";
import { Unit } from "../../frontType/unit";
import { Button } from "primereact/button";

interface AddProductProps {
  setIsOpen: any;
  plannerId: number;
  mealType: number;
  addProduct: any;
}

const AddProduct = ({
  setIsOpen,
  plannerId,
  mealType,
  addProduct,
}: AddProductProps) => {
  const [ingredients, setIngredients] = useState<
    { label: string; value: string }[]
  >([]);
  const fetchProducts = async () => {
    await getIngredients().then((res) => {
      const options = res.map((x: IngredientDto) => {
        if (x.id) {
          return { label: x.name, value: x.id.toString() };
        }
      });
      setIngredients(options);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={yup.object().shape({
          ingredientId: yup.string().required("To pole jest wymagane"),
          unit: yup.string().required("To pole jest wymagane"),
          amount: yup
            .number()
            .required("To pole jest wymagane")
            .min(1, "To pole jest wymagane"),
        })}
        onSubmit={async (values) => {
          const data = {
            unit: Number(values.unit),
            amount: Number(values.amount),
            mealType: mealType,
          };
          addProduct(Number(values.ingredientId), plannerId, data);
          setIsOpen(false);
        }}
        initialValues={{
          ingredientId: "",
          unit: "",
          amount: "",
        }}
      >
        {({ handleSubmit, values, errors, handleChange }) => (
          <Form
            onSubmit={handleSubmit}
            style={{ height: "36vh" }}
            className="d-flex flex-column"
          >
            <Form.Group className="mb-3">
              <Form.Label>Produkt</Form.Label>
              <SelectList
                options={ingredients}
                placeholder="np. Pomidor"
                name="ingredientId"
                error={!!errors.ingredientId}
                value={values.ingredientId}
              />
              <small className="pt-1 text-danger">{errors.ingredientId}</small>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ilość</Form.Label>
              <Form.Control
                type="number"
                placeholder="np. 1"
                name="amount"
                onChange={handleChange}
                isInvalid={!!errors.amount}
                value={values.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jednostka</Form.Label>
              <SelectList
                options={Unit.map((u, index) => {
                  return { label: u, value: index.toString() };
                })}
                placeholder="np. kilogram"
                name="unit"
                error={!!errors.unit}
                value={values.unit}
              />
              <small className="pt-1 text-danger">{errors.unit}</small>
            </Form.Group>
            <div className="text-end mt-auto">
              <Button
                label="Anuluj"
                icon="pi pi-times"
                className="p-button-text"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              />
              <Button
                label="Zapisz"
                icon="pi pi-check"
                className="p-button-text"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
