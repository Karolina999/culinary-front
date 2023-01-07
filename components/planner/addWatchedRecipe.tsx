import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { getUserWatchedRecipe } from "../../services/user";
import { Level, RecipeDto } from "../../types";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import SelectList from "../inputs/selectList";
import { ScrollPanel } from "primereact/scrollpanel";
import { polishPlural } from "../../utils/polishPlural";
import { Button } from "primereact/button";

interface AddWatchedRecipeProps {
  plannerId: number;
  mealType: number;
  setIsOpen: any;
  addMeal: any;
}

const addWatchedRecipe = ({
  plannerId,
  setIsOpen,
  mealType,
  addMeal,
}: AddWatchedRecipeProps) => {
  const [watchedRecipes, setWatchedRecipes] = useState<RecipeDto[]>([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const fetchRecipes = async () => {
    await getUserWatchedRecipe().then((res) => {
      const options = res.map((x: RecipeDto) => {
        if (x.id) {
          return { label: x.title, value: x.id.toString() };
        }
      });
      setOptions(options);
      setWatchedRecipes(res);
    });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <>
      {watchedRecipes.length > 0 ? (
        <div>
          <Formik
            validationSchema={yup.object().shape({
              recipeId: yup.string().required("To pole jest wymagane"),
            })}
            onSubmit={async (values) => {
              addMeal(Number(values.recipeId), plannerId, mealType);
              setIsOpen(false);
            }}
            initialValues={{
              recipeId: "",
            }}
          >
            {({ handleSubmit, values, errors, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <div style={{ position: "relative", height: "53px" }}>
                  <Form.Group
                    className="mb-3 mt-1"
                    style={{
                      position: "absolute",
                      zIndex: "10",
                      width: "100%",
                    }}
                  >
                    <SelectList
                      options={options}
                      placeholder="np. Zupy"
                      name="recipeId"
                      error={!!errors.recipeId}
                      value={values.recipeId}
                    />
                  </Form.Group>
                </div>
                <div>
                  <p style={{ fontWeight: "500" }}>Ulubione</p>

                  <ScrollPanel
                    style={{
                      width: "100%",
                      height: "180px",
                    }}
                    className="custom"
                  >
                    <hr className="mt-0" />
                    {watchedRecipes.map((recipe) => {
                      return (
                        <>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p className="mb-0" style={{ fontWeight: "500" }}>
                                {recipe.title}
                              </p>
                              <small className="text-secondary">
                                {recipe.time} -{" "}
                                {Level[recipe.level ? recipe.level : 0]} -{" "}
                                {recipe.people}{" "}
                                {polishPlural(
                                  "osoba",
                                  "osoby",
                                  "osób",
                                  recipe.people ? recipe.people : 0
                                )}
                              </small>
                            </div>
                            <Button
                              icon="pi pi-plus"
                              className="p-button-rounded p-button-text p-button-plain"
                              onClick={() =>
                                setFieldValue("recipeId", recipe.id!.toString())
                              }
                              type="submit"
                            />
                          </div>
                          <hr />
                        </>
                      );
                    })}
                  </ScrollPanel>
                </div>
                <div className="text-end mt-4">
                  <Button
                    label="Anuluj"
                    icon="pi pi-times"
                    className="p-button-text"
                    onClick={() => setIsOpen(false)}
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
      ) : (
        <p className="text-center">Nie obserwujesz żadnych przepisów</p>
      )}
    </>
  );
};

export default addWatchedRecipe;
