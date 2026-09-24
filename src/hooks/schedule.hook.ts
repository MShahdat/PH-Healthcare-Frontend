import { createSchedule, getMySchedules } from "@/api";
import { QueryParams } from "@/types";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useGetMySchedules = (params: QueryParams) => {
  return useSuspenseQuery({
    queryKey: ["my-schedules", params],
    queryFn: () => getMySchedules(params),
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-schedules"],
      });
    },
  });
};
