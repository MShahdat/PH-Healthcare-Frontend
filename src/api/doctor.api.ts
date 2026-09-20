
import apiClient from "@/lib/apiClient";
import { DoctorApplicationPayload } from "@/types";


export const doctorApply = (payload: DoctorApplicationPayload) => {
  const formData = new FormData()

  formData.append('data', JSON.stringify(payload.data))
  formData.append('resume', payload.resume)

  for (const file of payload.additionalFiles) {
    formData.append('additionalFiles', file)
  }

  return apiClient('/doctor/apply-doctor', {
    method: 'POST',
    body: formData
  })
}