import { ingestCsvText } from '../ingestion/pipeline.js'
import { appendIngestion, appendRuntimeAudit, appendRuntimeEvent, upsertCases } from '../runtime/osgcStore.js'
import { validateUploadPolicy } from '../security/uploadPolicy.js'

export async function processRuntimeUpload(file: File) {
  const policy = validateUploadPolicy(file)

  if (!policy.ok) {
    appendRuntimeAudit({
      action: 'UPLOAD_REJECTED',
      reason: policy.reason,
      fileName: file.name
    })

    return {
      ok: false,
      errors: [{ row: 0, missing: [policy.reason] }],
      created: []
    }
  }

  const text = await file.text()
  const result = ingestCsvText(text)

  if (!result.ok) {
    appendRuntimeAudit({
      action: 'INGESTION_FAILED',
      payload: result.errors
    })

    return result
  }

  upsertCases(result.created as never[])

  appendIngestion({
    fileName: file.name,
    rows: result.created.length
  })

  result.created.forEach(item => {
    appendRuntimeEvent({
      type: 'CASE_HYDRATED',
      folio: item.folio
    })
  })

  appendRuntimeAudit({
    action: 'INGESTION_SUCCESS',
    fileName: file.name
  })

  return result
}
