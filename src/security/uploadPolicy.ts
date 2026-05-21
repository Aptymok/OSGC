export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024

export const ALLOWED_EXTENSIONS = ['csv']

export function validateUploadPolicy(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      ok: false,
      reason: 'INVALID_EXTENSION'
    }
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return {
      ok: false,
      reason: 'FILE_TOO_LARGE'
    }
  }

  return {
    ok: true,
    reason: 'OK'
  }
}
