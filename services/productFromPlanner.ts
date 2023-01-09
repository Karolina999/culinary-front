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

export const putProductFromPlanner = (
  productId: number,
  ingredientId: number,
  data: any
) => {
  return http({
    method: "PUT",
    url: `https://localhost:7193/api/ProductFromPlanner/${productId}?ingredientId=${ingredientId}`,
    data: data,
  }).then((res) => res.body);
};

export const deleteProductFromPlanner = (productId: number) => {
  return http({
    method: "DELETE",
    url: `https://localhost:7193/api/ProductFromPlanner/${productId}`,
  }).then((res) => res.body);
};
