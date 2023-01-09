import http from "./HTTPcommon";

export const getPlanner = (date: string) => {
  return http({
    method: "GET",
    url: `/Planner/fromUser?date=${date}`,
  }).then((res) => res.data);
};

export const postPlanner = (date: any) => {
  return http({
    method: "POST",
    url: `https://localhost:7193/api/Planner`,
    data: date,
  }).then((res) => res.body);
};

export const deletePlanner = (plannerId: number) => {
  return http({
    method: "DELETE",
    url: `https://localhost:7193/api/Planner/${plannerId}`,
  }).then((res) => res.body);
};
