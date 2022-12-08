//PlannerRecipe?recipeId=100&plannerId=100&mealType=1

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
