import apiClient from "@/lib/apiClient";

export const userRegister = (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const userEmailVerify = (payload: { email: string; otp: string }) => {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const userLogin = (payload: { email: string; password: string }) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const googleAuth = (payload: { idToken: string }) => {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};

export const logout = () => {
  return apiClient("/auth/logout", {
    method: "POST",
  });
};

export const getMe = () => {
  return apiClient("/auth/me");
};
