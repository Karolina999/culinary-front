import axios from "axios";
import navigationService from "./NavigationService";

var client = axios.create({
  baseURL: "https://localhost:7193/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${
      typeof window !== "undefined" && localStorage.getItem("jwt")
    }`,
  },
});

const request = (options: any) => {
  const onSuccess = (response: any) => {
    return response;
  };

  const onError = (error: any) => {
    if (error.response) {
      if (error.response.status === 401) {
        navigationService.navigation("/login");
        localStorage.removeItem("jwt");
      } else if (error.response.status === 403) {
        // navigationService.navigation("/Error403");
        navigationService.navigation("/login");
      } else if (error.response.status === 404) {
        // navigationService.navigation("/Error404");
        navigationService.navigation("/login");
      }
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
