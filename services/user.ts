import http from "./HTTPcommon";

export const loginUser = (data: any) => {
  return http({ method: "POST", url: "/User/SignIn", data: data });
};

export const registerUser = (data: any) => {
  return http({ method: "POST", url: "/User", data: data }).then(
    (res) => res.body
  );
};

export const getUserShoppingLists = () => {
  return http({ method: "GET", url: "/User/shoppingLists" }).then(
    (response) => response.data
  );
};

export const putUser = (data: any) => {
  return http({ method: "PUT", url: "/User", data: data }).then((res) => res);
};

export const putUserPassword = (oldPassword: string, newPassword: string) => {
  return http({
    method: "PUT",
    url: `/User/password?newPassword=${newPassword}&oldPassword=${oldPassword}`,
  }).then((res) => res);
};
