import axios from "axios";
import router from "next/router";

var client = axios.create({
  baseURL: "https://localhost:7193/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
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
        router.push(`/login`, "", { scroll: true });
        // navigationService.navigation("/login");
        localStorage.removeItem("jwt");
      } else if (error.response.status === 403) {
        router.push(`/login`, "", { scroll: true });
        // navigationService.navigation("/Error403");
      } else if (error.response.status === 404) {
        router.push(`/login`, "", { scroll: true });
        // navigationService.navigation("/Error404");
      }
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
