import React, { useEffect, useState } from "react";
import { Container, Col, Form, Button } from "react-bootstrap";
import FirstValue from "../../../components/createRecipe/firstValue";
import Ingredients from "../../../components/createRecipe/ingredients";
import Steps from "../../../components/createRecipe/steps";
import AddImage from "../../../components/createRecipe/addImage";
import { Formik } from "formik";
import * as yup from "yup";
import { getIngredients } from "../../../services/ingredients";
import { postRecipe, putRecipe } from "../../../services/recipe";
import { Recipe, Step, ProductFromRecipe } from "../../../types";
import { feachApi } from "../../../utils/feachApi";
import {
  deleteProductFromRecipe,
  postProductFromRecipe,
  putProductFromRecipe,
} from "../../../services/productFromRecipe";
import { deleteStep, postStep, putStep } from "../../../services/step";

interface EditRecipeProps {
  recipe: Recipe;
  steps: Step[];
  products: ProductFromRecipe[];
}

const EditIndex = ({ recipe, steps, products }: EditRecipeProps) => {
  const [options, setOptions] = useState([]);
  const [stepsToDelete, setStepsToDelete] = useState<any>([]);
  const [productsToDelete, setProductsToDelete] = useState<any>([]);

  const deleteSetp = (stepToDelete: any) => {
    setStepsToDelete([...stepsToDelete, stepToDelete]);
  };
  const deleteProduct = (productToDelete: any) => {
    setProductsToDelete([...productsToDelete, productToDelete]);
  };

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
        photo: yup.string(),
      })
    ),
    photo: yup.string(),
  });

  const onSubmit = async (values: any) => {
    const recipeToUpdate = {
      id: recipe.id,
      title: values.title,
      level: Number(values.level),
      time: values.time,
      people: Number(values.people),
      photo: values.photo,
      recipeType: Number(values.recipeType),
    };
    const productFromRecipes = values.productFromRecipes.map((product: any) => {
      return {
        id: product.id || undefined,
        unit: Number(product.unit),
        amount: Number(product.amount),
        ingredientId: Number(product.ingredientId),
      };
    });
    const stepsToUpdate = values.steps.map((step: any) => {
      return {
        id: step.id || undefined,
        stepNumber: Number(step.stepNumber),
        description: step.description,
        photo: step.photo,
      };
    });

    await putRecipe(recipe.id!, recipeToUpdate).then(() => {
      stepsToUpdate.map(async (step: any) => {
        typeof step.id === "undefined"
          ? await postStep(
              {
                stepNumber: step.stepNumber,
                description: step.description,
                photo: step.photo,
              },
              recipe.id!
            )
          : await putStep(
              {
                id: step.id,
                stepNumber: step.stepNumber,
                description: step.description,
                photo: step.photo,
              },
              step.id
            );
      });

      productFromRecipes.map(async (product: any) => {
        typeof product.id === "undefined"
          ? await postProductFromRecipe(
              { unit: product.unit, amount: product.amount },
              recipe.id!,
              product.ingredientId
            )
          : await putProductFromRecipe(
              { id: product.id, unit: product.unit, amount: product.amount },
              product.id!,
              product.ingredientId
            );
      });

      stepsToDelete.map(async (step: any) => {
        typeof step.id !== "undefined" && (await deleteStep(step.id));
      });

      productsToDelete.map(async (product: any) => {
        typeof product.id !== "undefined" &&
          (await deleteProductFromRecipe(product.id));
      });

      window.location.href = `/przepisy/${recipe.id}`;
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
              title: recipe.title,
              recipeType: recipe.recipeType,
              level: recipe.level,
              people: recipe.people,
              time: recipe.time,
              productFromRecipes: products.map((x) => {
                return {
                  id: x.id,
                  unit: x.unit?.toString() || "",
                  ingredientId: x.ingredientId?.toString() || "",
                  amount: x.amount?.toString() || "",
                };
              }),
              steps: steps.map((x, index) => {
                return {
                  id: x.id,
                  stepNumber: x.stepNumber || index + 1,
                  description: x.description || "",
                  photo: x.photo || "",
                };
              }),
              photo: recipe.photo,
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
                  deleteProduct={deleteProduct}
                />
                <Steps
                  errors={errors.steps}
                  values={values.steps}
                  handleChange={handleChange}
                  deleteSetp={deleteSetp}
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: {
  params: { recipeId: string };
}) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

  const recipe = await feachApi(`/Recipe/${params.recipeId}`);

  if (!recipe || recipe.status) {
    return {
      notFound: true,
    };
  }

  const steps = await feachApi(`/Recipe/${params.recipeId}/steps`);
  const products = await feachApi(`/Recipe/${params.recipeId}/products`);

  return {
    props: {
      recipe: recipe,
      steps: steps,
      products: products,
    },
  };
}

export default EditIndex;
