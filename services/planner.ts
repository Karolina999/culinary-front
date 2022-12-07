import http from "./HTTPcommon";

export const getPlanner = (date: string) => {
  return http({
    method: "GET",
    url: `/Planner/fromUser/11?date=${date}`,
  }).then((res) => res.data);
};
