import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  Doctor,
  DoctorApplicationPayload,
  IDoctorReview,
  QueryParams,
} from "@/types";

export const doctorApply = (payload: DoctorApplicationPayload) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctor/apply-doctor", {
    method: "POST",
    body: formData,
  });
};

export const doctorVerifyEmail = (payload: { email: string; otp: string }) => {
  return apiClient("/doctor/apply-doctor/email-verify", {
    method: "POST",
    body: payload,
  });
};

export const getAllDoctors = (params: QueryParams) => {
  return apiClient<ApiResponse<Doctor[]>>("/doctor/all-doctors", {
    params,
  });
};

export const doctorReview = (payload: IDoctorReview) => {
  return apiClient("/doctor/approved-doctor", {
    method: "POST",
    body: payload,
  });
};
