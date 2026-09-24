import apiClient from "@/lib/apiClient";
import { QueryParams } from "@/types";

export const getMySchedules = (params: QueryParams) => {
  return apiClient("/schedule/my-schedule", {
    params,
  });
};

export const createSchedule = (payload: any) => {
  return apiClient("/schedule", {
    method: "POST",
    body: payload,
  });
};
