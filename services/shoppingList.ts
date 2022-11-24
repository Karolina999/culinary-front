import { ShoppingListDto } from "../types";
import http from "./HTTPcommon";

export const postShoppingList = (data: any) => {
  return http({ method: "POST", url: "/ShoppingList", data: data }).then(
    (res) => res.body
  );
};

export const putShoppingList = (data: ShoppingListDto) => {
  return http({
    method: "PUT",
    url: `/ShoppingList/${data.id}`,
    data: data,
  }).then((res) => res.body);
};

export const deleteShoppingList = (shoppingListId: number) => {
  return http({
    method: "DELETE",
    url: `/ShoppingList/${shoppingListId}`,
  }).then((res) => res.body);
};

export const deleteShoppingLists = (shoppingListsId: number[]) => {
  return http({
    method: "DELETE",
    url: "/ShoppingList/shoppingLists",
    data: shoppingListsId,
  }).then((res) => res.body);
};
