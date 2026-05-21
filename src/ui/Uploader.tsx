import React, { useState } from 'react'
import { parseCsv } from '../ingestion/csv.js'
import { validateRows } from '../ingestion/validate.js'
import { normalizeRows } from '../ingestion/normalize.js'
import { IngestionPreview } from './IngestionPreview.js'

export function Uploader() {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([])
  const [errors, setErrors] = useState<string[]>([])

  async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const parsed = parseCsv(text)
    const validation = validateRows(parsed)

    if (!validation.valid) {
      setErrors(validation.errors.map(error => `Fila ${error.row}`))
      return
    }

    setRows(normalizeRows(parsed))
    setErrors([])
  }

  return (
    <div>
      <input type="file" accept=".csv" onChange={onUpload} />
      {errors.map(error => <div key={error}>{error}</div>)}
      <IngestionPreview rows={rows} />
    </div>
  )
}
