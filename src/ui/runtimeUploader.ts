import { ingestCsvText } from '../ingestion/pipeline.js'
import { appendIngestion, appendRuntimeAudit, appendRuntimeEvent, upsertCases } from '../runtime/osgcStore.js'

export async function processRuntimeUpload(file: File) {
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
