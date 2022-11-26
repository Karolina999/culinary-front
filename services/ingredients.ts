import { ShoppingListDto } from "../types";
import http from "./HTTPcommon";

export const getIngredients = () => {
  return http({
    method: "GET",
    url: "/Ingredient",
  }).then((res) => res.data);
};
