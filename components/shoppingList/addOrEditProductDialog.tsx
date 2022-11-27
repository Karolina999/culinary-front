import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button, Form } from "react-bootstrap";
import SelectList from "../inputs/selectList";
import Select from "react-select";
import { Unit } from "../../frontType/unit";

interface AddOrEditProductDialogProps {
  productDialog: boolean;
  productDialogFooter: React.ReactElement<any, any>;
  hideDialog: () => void;
  product: any;
  onInputChange: (e: any, title: any) => void;
  submitted: boolean;
  ingredients: any;
}

const AddOrEditProductDialog = ({
  productDialog,
  productDialogFooter,
  hideDialog,
  product,
  onInputChange,
  submitted,
  ingredients,
}: AddOrEditProductDialogProps) => {
  return (
    <Dialog
      visible={productDialog}
      style={{ width: "450px" }}
      header="Szczegóły produktu"
      modal
      className="p-fluid"
      footer={productDialogFooter}
      onHide={hideDialog}
    >
      <div className="field">
        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Produkt</Form.Label>
            <SelectList
              options={ingredients.map((ingredient: any) => {
                return { label: ingredient.name, value: ingredient.id };
              })}
              placeholder="np. Pomidor"
              error={submitted && !product.ingredientId}
              onChange={(value) => onInputChange(value, "ingredientId")}
              value={product.ingredientId}
            />
            {submitted && !product.ingredientId && (
              <small className="p-error">To pole jest wymagane.</small>
            )}
          </Form.Group>
        </Form>
        <Form.Group className="mb-4">
          <Form.Label>Ilość</Form.Label>
          <Form.Control
            type="number"
            placeholder="np. 1"
            min={1}
            onChange={(e) => onInputChange(e.target.value, "amount")}
            isInvalid={submitted && (!product.amount || product.amount < 1)}
            value={product.amount}
          />
          {submitted && !product.amount && (
            <small className="p-error">To pole jest wymagane.</small>
          )}
          {submitted && product.amount && product.amount < 1 && (
            <small className="p-error">Podaj liczbę dodatnią.</small>
          )}
        </Form.Group>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Jednostka</Form.Label>
            <SelectList
              options={Unit.map((u, index) => {
                return { label: u, value: index.toString() };
              })}
              placeholder="np. kilogram"
              error={submitted && !product.unit && product.unit !== 0}
              onChange={(value) => onInputChange(value, "unit")}
              value={product.unit}
            />
            {submitted && !product.unit && product.unit !== 0 && (
              <small className="p-error">To pole jest wymagane.</small>
            )}
          </Form.Group>
        </Form>
      </div>
    </Dialog>
  );
};

export default AddOrEditProductDialog;
