

export const MAX_FILE_SIZE = 2

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024

const FILE_TYPES = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "application/pdf"
]

export const isAcceptedFile = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE_BYTES
}


export const isAcceptedFileType = (fileType: string) => {
  return FILE_TYPES.includes(fileType)
}