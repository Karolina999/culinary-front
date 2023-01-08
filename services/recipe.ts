import http from "./HTTPcommon";

export const postRecipe = (data: any) => {
  return http({ method: "POST", url: "/Recipe", data: data }).then(
    (res) => res.body
  );
};

export const getRecipe = () => {
  return http({ method: "GET", url: "/Recipe" }).then((res) => res.data);
};

export const getPopularRecipe = () => {
  return http({ method: "GET", url: "/Recipe/top12" }).then((res) => res.data);
};

export const getRecipeProducts = (recipeId: number) => {
  return http({ method: "GET", url: `/Recipe/${recipeId}/products` }).then(
    (res) => res.data
  );
};

export const getRecipesProducts = (data: number[]) => {
  return http({ method: "POST", url: `/Recipe/products`, data: data }).then(
    (res) => res.data
  );
};

export const putRecipe = (recipeId :number ,data: any) => {
  return http({ method: "PUT", url: `/Recipe/${recipeId}`, data: data }).then(
    (res) => res.body
  );
};