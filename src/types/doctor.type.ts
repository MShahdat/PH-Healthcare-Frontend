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
  data: DoctorApplicationData,
  resume: File,
  additionalFiles: File[]
}