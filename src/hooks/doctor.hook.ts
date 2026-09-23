import {
  doctorApply,
  doctorReview,
  doctorVerifyEmail,
  getAllDoctors,
} from "@/api";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QueryParams } from "../types/doctor.type";

export const useDoctorApply = () => {
  return useMutation({
    mutationFn: doctorApply,
  });
};

export const useDoctorEmailVerify = () => {
  return useMutation({
    mutationFn: doctorVerifyEmail,
  });
};

export const useAllDoctors = (params: QueryParams) => {
  return useQuery({
    queryKey: ["all-doctors", params],
    queryFn: () => getAllDoctors(params),
  });
};

export const useSuspenseGetAllDoctors = (params: QueryParams) => {
  return useSuspenseQuery({
    queryKey: ["all-doctors", params],
    queryFn: () => getAllDoctors(params),
  });
};

export const useDoctorReview = () => {
  return useMutation({
    mutationFn: doctorReview,
  });
};
