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
        localStorage.removeItem("jwt");
      } else if (error.response.status === 403) {
        router.push(`/login`, "", { scroll: true });
      } else if (error.response.status === 404) {
        router.push(`/404`, "", { scroll: true });
      }
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
