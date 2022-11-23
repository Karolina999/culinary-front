import { UserDto } from "../types";
import http from "./HTTPcommon";

export const loginUser = (data: any) => {
  return http({ method: "POST", url: "/User/SignIn", data: data });
};

export const registerUser = (data: any) => {
  return http({ method: "POST", url: "/User", data: data }).then(
    (res) => res.body
  );
};
