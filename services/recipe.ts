import http from "./HTTPcommon";

export const postRecipe = (data: any) => {
  return http({ method: "POST", url: "/Recipe", data: data }).then(
    (res) => res.body
  );
};
