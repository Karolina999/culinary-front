import http from "./HTTPcommon";

export const postProductFromRecipe = (
  data: any,
  recipeId: number,
  ingredientId: number
) => {
  return http({
    method: "POST",
    url: `/ProductFromRecipe?recipeId=${recipeId}&ingredientId=${ingredientId}`,
    data: data,
  }).then((res) => res.data);
};

export const putProductFromRecipe = (
  data: any,
  productFromRecipeId: number,
  ingredientId: number
) => {
  return http({
    method: "PUT",
    url: `/ProductFromRecipe/${productFromRecipeId}/${ingredientId}`,
    data: data,
  }).then((res) => res.data);
};

export const deleteProductFromRecipe = (productFromRecipeId: number) => {
  return http({
    method: "DELETE",
    url: `/ProductFromRecipe/${productFromRecipeId}`,
  }).then((res) => res.data);
};
