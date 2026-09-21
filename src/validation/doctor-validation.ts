import z from "zod";

export const MAX_FILE_SIZE = 1;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_ADDITIONAL_FILES = 6;

export const MAX_BIO_LENGTH = 1000;

const FILE_TYPES = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const isAcceptedFile = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE_BYTES;
};

export const isAcceptedFileType = (fileType: string) => {
  return FILE_TYPES.includes(fileType);
};

export const isAcceptedAdditionalFilesLimit = (files: File[]) => {
  return files.length <= MAX_ADDITIONAL_FILES;
};

const getCustomFileSchema = <T>() =>
  z.custom<T>(
    (value) =>
      value === null ||
      (value instanceof File &&
        isAcceptedFile(value.size) &&
        isAcceptedFileType(value.type)),
    {
      message: `File must be PDF, DOC, DOCS or Image file under ${MAX_FILE_SIZE} MB`,
    },
  );

export const applyDoctorZodSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email address"),
  address: z.string().trim().optional(),
  bio: z
    .string()
    .max(
      MAX_BIO_LENGTH,
      `Bio must be at most ${MAX_BIO_LENGTH} characters long`,
    ),
  specialization: z
    .string()
    .trim()
    .min(3, "Specialization must be at least 3 characters long"),
  licenceNumber: z
    .string()
    .trim()
    .min(3, "Licence Number must be at least 3 characters long"),
  qualifications: z
    .string()
    .trim()
    .min(3, "Qualifications must be at least 3 characters long"),
  experienceYears: z
    .number()
    .int()
    .nonnegative()
    .refine((value) => value >= 0 || value <= 50, {
      message: "Experience years must be between 0 and 50",
    }),
  consultationFee: z.number().refine((value) => value >= 0, {
    message: "Consultation fee must be a positive number",
  }),
  resume: getCustomFileSchema<File>().refine((value) => value instanceof File, {
    message: "A resume or CV required",
  }),

  additionalFiles: z
    .array(z.custom<File>((value) => value instanceof File))
    .max(MAX_ADDITIONAL_FILES, {
      message: `You can attatch at most ${MAX_ADDITIONAL_FILES} files as a documents`,
    })
    .refine(
      (files) =>
        files.every(
          (file) => isAcceptedFileType(file.type) && isAcceptedFile(file.size),
        ),
      {
        message: `Each File must be PDF, DOC, DOCS or Image file under ${MAX_FILE_SIZE} MB`,
      },
    ),
});
