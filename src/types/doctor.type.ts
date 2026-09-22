import { User } from "./user.type";

export type DoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface DoctorApplicationData {
  user: {
    name: string;
    email: string;
  };
  doctor: {
    address?: string;
    bio?: string;
    specialization: string;
    licenceNumber: string;
    qualifications: string;
    experienceYears: number;
    consultationFee: number;
  };
}

export interface DoctorApplicationPayload {
  data: DoctorApplicationData;
  resume: File;
  additionalFiles: File[];
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  address?: string;
  bio?: string;
  specialization: string;
  licenceNumber: string;
  qualifications: string;
  experienceYears: number;
  consultationFee?: string;
  verificationStatus: DoctorVerificationStatus;
  rejectionReason?: string;
  reviewdBy: string;
  reviewdAt: string;
  resume: string;
  resumePublicId?: string;
  additionalFiles?: AdditionalFile[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface AdditionalFile {
  url: string;
  publicId: string;
}

export interface QueryParams {
  search?: string;
  sortOrder?: string;
  sortBy?: string;
  limit?: string;
  page?: string;
  [key: string]: any;
}
