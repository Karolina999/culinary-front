import http from "./HTTPcommon";

export const getPlanner = () => {
  return http({
    method: "GET",
    url: `/Planner/fromUser/11?date=2022-12-04`,
  }).then((res) => res.data);
};
