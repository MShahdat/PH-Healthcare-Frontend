import { doctorApply, doctorVerifyEmail } from "@/api";
import { useMutation } from "@tanstack/react-query";

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
