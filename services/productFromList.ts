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
