import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Ripple } from "primereact/ripple";
import { GetPlannerDto, Recipe } from "../../types";
import { getPlanner } from "../../services/planner";

const Index = () => {
  const template = (options: any, mealName: string, toggle: boolean) => {
    const toggleIcon = options.collapsed
      ? "pi pi-chevron-down text-dark"
      : "pi pi-chevron-up text-dark";
    const className = `${options.className} justify-content-between`;
    const titleClassName = `${options.titleClassName} pl-1`;

    return (
      <div className={className} style={{ backgroundColor: "transparent" }}>
        <div
          onClick={options.onTogglerClick}
          className="cursor-pointer w-100 d-flex"
        >
          <span className={`${titleClassName} my-2`}>{mealName}</span>
          <div className={options.togglerClassName}>
            {toggle && <span className={toggleIcon}></span>}
            <Ripple />
          </div>
        </div>
        <div>
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-success bg-success border-success"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    );
  };

  const meals = (recipes: Recipe[]) => {
    return (
      <>
        {recipes?.map((recipe) => {
          return <p>{recipe.title}</p>;
        })}
      </>
    );
  };

  const mealType = [
    "Śniadanie",
    "II śniadanie",
    "Obiad",
    "Przekąska",
    "Kolacja",
  ];
  const [loading, setLoading] = useState(true);
  const [planner, setPlanner] = useState<GetPlannerDto | undefined>(undefined);
  const [plannerMeals, setPlannerMeals] = useState<any[]>([]);

  const fetchPlanner = async () => {
    await getPlanner()
      .then((res) => {
        setPlanner(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchPlanner();
  }, []);

  useEffect(() => {
    setLoading(true);
    const filtrMeals = mealType.map((mealType, index) => {
      const type = index;
      const recipes = planner?.plannerRecipes
        ?.filter((pr) => pr.mealType === index)
        .map((pr) => pr.recipe);
      return { type, recipes };
    });
    setPlannerMeals(filtrMeals);

    setLoading(false);
  }, [planner]);

  return (
    <Container className="py-5" style={{ minHeight: "92vh" }}>
      {loading ? (
        <div className="d-flex">
          <Spinner
            animation="border"
            variant="success"
            className="mx-auto my-5"
          />
        </div>
      ) : (
        mealType.map((mealType, index) => {
          return (
            <Panel
              headerTemplate={(e) =>
                template(e, mealType, plannerMeals[index].recipes.length > 0)
              }
              collapsed={true}
              toggleable
              className={`py-1 ${
                plannerMeals[index].recipes.length === 0 && "mypanel"
              }`}
            >
              <div>{meals(plannerMeals[index].recipes)}</div>
            </Panel>
          );
        })
      )}
    </Container>
  );
};

export default Index;
