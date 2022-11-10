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
    // title: yup.string().required("To pole jest wymagane"),
    // recipeType: yup.string().required("To pole jest wymagane"),
    // level: yup.string().required("To pole jest wymagane"),
    // people: yup.string().required("To pole jest wymagane"),
    time: yup.string().required("To pole jest wymagane"),
    productFromRecipes: yup.array().of(
      yup.object().shape({
        unit: yup
          .number()
          .min(0, "To pole jest wymagane")
          .required("To pole jest wymagane"),
        // ingredientId: yup.string().required("To pole jest wymagane"),
        // quantity: yup.string().required("To pole jest wymagane"),
        // unit: yup.string(),
        ingredientId: yup.string().required("To pole jest wymagane"),
        quantity: yup
          .number()
          .min(1, "To pole jest wymagane")
          .required("To pole jest wymagane"),
      })
    ),
  });
  return (
    <div>
      <Container className="py-5 d-flex justify-content-center">
        <Col xs={12} lg={10} xxl={9}>
          <h3 className="bold pb-4">Dodaj przepis</h3>
          <Formik
            onSubmit={(values) => console.log(values.productFromRecipes)}
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
                {/* <Steps /> */}
                {/* <AddImage /> */}
                <Button type="submit">Dodaj przepis</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Container>
    </div>
  );
};

export default Dodaj;
