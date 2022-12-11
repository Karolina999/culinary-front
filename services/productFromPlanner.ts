import http from "./HTTPcommon";

export const postProductFromPlanner = (
  ingredientId: number,
  plannerId: number,
  data: any
) => {
  return http({
    method: "POST",
    url: `https://localhost:7193/api/ProductFromPlanner?ingredientId=${ingredientId}&plannerId=${plannerId}`,
    data: data,
  }).then((res) => res.body);
};
