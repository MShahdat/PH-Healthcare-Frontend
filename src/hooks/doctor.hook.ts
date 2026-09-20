
import { doctorApply } from "@/api"
import { useMutation } from "@tanstack/react-query"


export const useDoctorApply = () => {
  return useMutation({
    mutationFn: doctorApply
  })
}