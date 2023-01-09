import http from "./HTTPcommon";

export const postStep = (data: any, recipeId: number) => {
  return http({
    method: "POST",
    url: `/Step?recipeId=${recipeId}`,
    data: data,
  }).then((res) => res.data);
};

export const putStep = (data: any, stepId: number) => {
  return http({
    method: "PUT",
    url: `/Step/${stepId}`,
    data: data,
  }).then((res) => res.data);
};

export const deleteStep = (stepId: number) => {
  return http({
    method: "DELETE",
    url: `/Step/${stepId}`,
  }).then((res) => res.data);
};
