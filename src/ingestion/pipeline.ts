import { parseCsv } from './csv.js'
import { validateRows } from './validate.js'
import { normalizeRows } from './normalize.js'
import { evaluateSla } from '../sla/watchdog.js'
import { saveCase, appendEvent } from '../store/memory.js'

export function ingestCsvText(text: string) {
  const parsed = parseCsv(text)
  const validation = validateRows(parsed)

  if (!validation.valid) {
    return {
      ok: false,
      errors: validation.errors,
      created: []
    }
  }

  const normalized = normalizeRows(parsed).map((item, index) => {
    const sla = evaluateSla(Number(item.slaProgress ?? 0))
    return {
      id: `${Date.now()}-${index}`,
      ...item,
      status: item.status,
      severity: sla.severity,
      slaProgress: Number(item.slaProgress ?? 0)
    }
  })

  normalized.forEach(item => {
    saveCase(item)
    appendEvent({
      type: 'CASE_INGESTED',
      caseFolio: item.folio,
      payload: item
    })
  })

  return {
    ok: true,
    errors: [],
    created: normalized
  }
}
