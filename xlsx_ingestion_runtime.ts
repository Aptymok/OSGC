export async function processXlsxUpload(fileName: string) {
  return {
    fileName,
    status: 'UPLOADED',
    rowsDetected: 0,
    normalized: false
  }
}
