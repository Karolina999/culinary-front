import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import FirstValue from "../components/createRecipe/firstValue";
import Ingredients from "../components/createRecipe/ingredients";
import Steps from "../components/createRecipe/steps";
import AddImage from "../components/createRecipe/addImage";
import { Formik } from "formik";
import * as yup from "yup";

const Dodaj = () => {
  const options = [
    { value: "0", label: "Chocolate" },
    { value: "1", label: "Strawberry" },
    { value: "2", label: "Vanilla" },
  ];
  // ,[Photo]
  const schema = yup.object().shape({
    title: yup.string().required("To pole jest wymagane"),
    recipeType: yup.string().required("To pole jest wymagane"),
    level: yup.string().required("To pole jest wymagane"),
    people: yup.string().required("To pole jest wymagane"),
    time: yup.string().required("To pole jest wymagane"),
    productFromRecipes: yup.array().of(
      yup.object().shape({
        unit: yup.number().required("To pole jest wymagane"),
        ingredientId: yup.string().required("To pole jest wymagane"),
        quantity: yup.number().required("To pole jest wymagane"),
      })
    ),
    steps: yup.array().of(
      yup.object().shape({
        stepNumber: yup.number().required("To pole jest wymagane"),
        description: yup.string().required("To pole jest wymagane"),
        photo: yup.object(),
      })
    ),
    photo: yup.object(),
  });
  return (
    <div>
      <Container className="py-5 d-flex justify-content-center">
        <Col xs={12} lg={10} xxl={9}>
          <h3 className="bold pb-4">Dodaj przepis</h3>
          <Formik
            onSubmit={(values) => console.log(values)}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={schema}
            initialValues={{
              title: "",
              recipeType: "",
              level: "",
              people: "",
              time: "",
              productFromRecipes: [
                { unit: "", ingredientId: "", quantity: "" },
                { unit: "", ingredientId: "", quantity: "" },
                { unit: "", ingredientId: "", quantity: "" },
              ],
              steps: [
                { stepNumber: 1, description: "", photo: "" },
                { stepNumber: 2, description: "", photo: "" },
              ],
              photo: "",
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <FirstValue
                  handleChange={handleChange}
                  values={values}
                  errors={errors}
                />
                <Ingredients
                  options={options}
                  errors={errors.productFromRecipes}
                  values={values.productFromRecipes}
                  handleChange={handleChange}
                />
                <Steps
                  errors={errors.steps}
                  values={values.steps}
                  handleChange={handleChange}
                />
                <AddImage name="photo" value={values.photo} />
                <div className="d-grid d-md-flex">
                  <Button type="submit" className="ms-md-auto">
                    Dodaj przepis
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Container>
    </div>
  );
};

export default Dodaj;
