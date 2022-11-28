import React from "react";
import { Form } from "react-bootstrap";
import SelectList from "../inputs/selectList";
import { Category } from "../../frontType/category";
import { Level } from "../../frontType/level";

interface FirstValueProps {
  handleChange: any;
  values: any;
  errors: any;
}

const FirstValue = ({ handleChange, values, errors }: FirstValueProps) => {
  return (
    <div>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Nazwa potrawy</Form.Label>
        <Form.Control
          placeholder="np. Zupa pomidorowa"
          name="title"
          value={values.title}
          onChange={handleChange}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Kategoria</Form.Label>
        <SelectList
          options={Category.map((c, index) => {
            return { label: c, value: index.toString() };
          })}
          placeholder="np. Zupy"
          name="recipeType"
          error={!!errors.recipeType}
          value={values.recipeType}
        />
        <small className="pt-1 text-danger">{errors.recipeType}</small>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Stopień trudności</Form.Label>
        <SelectList
          options={Level.map((c, index) => {
            return { label: c, value: index.toString() };
          })}
          placeholder="np. Ławty"
          name="level"
          error={!!errors.level}
          value={values.level}
        />
        <small className="pt-1 text-danger">{errors.level}</small>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Liczba osób</Form.Label>
        <SelectList
          options={[...Array(10)].map((a, index) => {
            return {
              label: (index + 1).toString(),
              value: (index + 1).toString(),
            };
          })}
          placeholder="np. 2"
          name="people"
          error={!!errors.people}
          value={values.people}
        />
        <small className="pt-1 text-danger">{errors.people}</small>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Czas przygotowania</Form.Label>
        <SelectList
          options={[
            { label: "15 min", value: "15 min" },
            { label: "30 min", value: "30 min" },
            { label: "45 min", value: "45 min" },
            { label: "60 min", value: "60 min" },
            { label: "90 min", value: "90 min" },
          ]}
          placeholder="np. 15 min"
          name="time"
          error={!!errors.time}
          value={values.time}
        />
        <small className="pt-1 text-danger">{errors.time}</small>
      </Form.Group>
    </div>
  );
};

export default FirstValue;
