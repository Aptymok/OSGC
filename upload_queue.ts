const uploadQueue: Array<Record<string, unknown>> = []

export function enqueueUpload(file: Record<string, unknown>) {
  uploadQueue.push({
    ...file,
    queuedAt: new Date().toISOString()
  })
}

export function getUploadQueue() {
  return uploadQueue
}
