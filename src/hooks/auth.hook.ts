import {
  getMe,
  googleAuth,
  logout,
  userEmailVerify,
  userLogin,
  userRegister,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};

export const useEmailVerify = () => {
  return useMutation({
    mutationFn: userEmailVerify,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useGoogle = () => {
  return useMutation({
    mutationFn: googleAuth,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
};
