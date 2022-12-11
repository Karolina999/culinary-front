import http from "./HTTPcommon";

export const postPlannerRecipe = (
  recipeId: number,
  plannerId: number,
  mealType: number
) => {
  return http({
    method: "POST",
    url: `/PlannerRecipe?recipeId=${recipeId}&plannerId=${plannerId}&mealType=${mealType}`,
  }).then((res) => res.body);
};

export const deletePlannerRecipe = (plannerRecipeId: number) => {
  return http({
    method: "DELETE",
    url: `/PlannerRecipe?plannerRecipeId=${plannerRecipeId}`,
  }).then((res) => res.body);
};
