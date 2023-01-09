import React, { useEffect, useState } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import FirstValue from "../../components/createRecipe/firstValue";
import Ingredients from "../../components/createRecipe/ingredients";
import Steps from "../../components/createRecipe/steps";
import AddImage from "../../components/createRecipe/addImage";
import { Formik } from "formik";
import * as yup from "yup";
import { getIngredients } from "../../services/ingredients";
import { postRecipe } from "../../services/recipe";

const Dodaj = () => {
  const [options, setOptions] = useState([]);

  const fetchIngredients = async () => {
    await getIngredients().then((res) => {
      const ingredients = res.map((ingredient: any) => {
        return { label: ingredient.name, value: ingredient.id.toString() };
      });
      setOptions(ingredients);
    });
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

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
        amount: yup.string().required("To pole jest wymagane"),
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

  const onSubmit = async (values: any) => {
    const productFromRecipes = values.productFromRecipes.map((product: any) => {
      return {
        unit: Number(product.unit),
        amount: Number(product.amount),
        ingredientId: Number(product.ingredientId),
      };
    });
    const steps = values.steps.map((step: any) => {
      return {
        stepNumber: Number(step.stepNumber),
        description: step.description,
        photo: "",
      };
    });

    const recipe = {
      title: values.title,
      level: Number(values.level),
      time: values.time,
      people: Number(values.people),
      photo: "",
      recipeType: Number(values.recipeType),
      products: productFromRecipes,
      steps: steps,
    };

    await postRecipe(recipe).then((res) => {
      window.location.href = `/przepisy/${res.id}`;
    });
  };

  return (
    <div>
      <Container className="py-5 d-flex justify-content-center">
        <Col xs={12} lg={10} xxl={9}>
          <h3 className="bold pb-4">Dodaj przepis</h3>
          <Formik
            onSubmit={(values) => onSubmit(values)}
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
                { unit: "", ingredientId: "", amount: "" },
                { unit: "", ingredientId: "", amount: "" },
                { unit: "", ingredientId: "", amount: "" },
              ],
              steps: [{ stepNumber: 1, description: "", photo: "" }],
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
                  <Button
                    type="submit"
                    className="ms-md-auto"
                    variant="success"
                  >
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
