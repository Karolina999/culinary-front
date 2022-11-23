import http from "./HTTPcommon";

export const loginUser = (data: any) => {
  return http({ method: "POST", url: "/User/SignIn", data: data });
};
