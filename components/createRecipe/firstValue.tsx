import React from "react";
import { Form } from "react-bootstrap";

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
        <Form.Select
          name="recipeType"
          value={values.recipeType}
          onChange={handleChange}
          isInvalid={!!errors.recipeType}
        >
          <option value="">Wybierz kategorię</option>
          <option value="1">Śniadanie</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.recipeType}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Stopień trudności</Form.Label>
        <Form.Select
          name="level"
          value={values.level}
          onChange={handleChange}
          isInvalid={!!errors.level}
        >
          <option value="">Wybierz stopień trudności</option>
          <option value="0">Łatwy</option>
          <option value="1">Średni</option>
          <option value="2">Trudny</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.level}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Liczba osób</Form.Label>
        <Form.Select
          name="people"
          value={values.people}
          onChange={handleChange}
          isInvalid={!!errors.people}
        >
          <option value="">Wybierz liczbę osób</option>
          <option value="1">1</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.people}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="bold">Czas przygotowania</Form.Label>
        <Form.Select
          name="time"
          value={values.time}
          onChange={handleChange}
          isInvalid={!!errors.time}
        >
          <option value="">Wybierz czas przygotowania</option>
          <option value="0">15 minut</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.time}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default FirstValue;
