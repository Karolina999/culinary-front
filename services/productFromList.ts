import http from "./HTTPcommon";

export const postProductFromList = (
  ingredientId: any,
  listId: any,
  data: any
) => {
  return http({
    method: "POST",
    url: `https://localhost:7193/api/ProductFromList?ingredientId=${ingredientId}&shoppingListId=${listId}`,
    data: data,
  }).then((res) => res.body);
};

export const postProductsFromList = (data: any, listId: any) => {
  return http({
    method: "POST",
    url: `https://localhost:7193/api/ProductFromList/products?shoppingListId=${listId}`,
    data: data,
  }).then((res) => res.body);
};

export const putProductFromList = (productId: any, data: any) => {
  return http({
    method: "PUT",
    url: `https://localhost:7193/api/ProductFromList/${productId}`,
    data: data,
  }).then((res) => res.body);
};

export const deleteProductFromList = (productId: any) => {
  return http({
    method: "DELETE",
    url: `https://localhost:7193/api/ProductFromList/${productId}`,
    data: productId,
  }).then((res) => res.body);
};

export const deleteProductsFromList = (productsId: any[]) => {
  return http({
    method: "DELETE",
    url: "https://localhost:7193/api/ProductFromList/productsFromList",
    data: productsId,
  }).then((res) => res.body);
};
