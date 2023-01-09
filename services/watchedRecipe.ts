import http from "./HTTPcommon";

export const postWatchedRecipe = (recipeId: number) => {
  return http({
    method: "POST",
    url: `/WatchedRecipe?recipeId=${recipeId}`,
  }).then((response) => response.data);
};

export const isWatched = (recipeId: number) => {
  return http({
    method: "GET",
    url: `/WatchedRecipe/isWatched?recipeId=${recipeId}`,
  }).then((response) => response.data);
};

export const deleteWatchedRecipe = (recipeId: number) => {
  return http({
    method: "DELETE",
    url: `/WatchedRecipe?recipeId=${recipeId}`,
  }).then((response) => response.data);
};
