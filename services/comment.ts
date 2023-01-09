import http from "./HTTPcommon";

export const postComment = (recipeId: number, data: any) => {
  return http({
    method: "POST",
    url: `/UserComment?recipeId=${recipeId}`,
    data: data,
  }).then((res) => res.data);
};

export const getRecipeComments = (recipeId: number) => {
  return http({
    method: "GET",
    url: `/Recipe/${recipeId}/comments`,
  }).then((res) => res.data);
};
