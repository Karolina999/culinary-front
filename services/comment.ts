import http from "./HTTPcommon";

export const postComment = (userId: number, recipeId: number, data: any) => {
  return http({
    method: "POST",
    url: `/UserComment?userId=${userId}&recipeId=${recipeId}`,
    data: data,
  }).then((res) => res.data);
};

export const getRecipeComments = (recipeId: number) => {
  return http({
    method: "GET",
    url: `/Recipe/${recipeId}/comments`,
  }).then((res) => res.data);
};
