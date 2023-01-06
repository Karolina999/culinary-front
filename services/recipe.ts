import http from "./HTTPcommon";

export const postRecipe = (data: any) => {
  return http({ method: "POST", url: "/Recipe", data: data }).then(
    (res) => res.body
  );
};

export const getRecipe = () => {
  return http({ method: "GET", url: "/Recipe" }).then((res) => res.data);
};

export const getPopularRecipe = () => {
  return http({ method: "GET", url: "/Recipe/top12" }).then((res) => res.data);
};
