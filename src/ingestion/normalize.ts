import { sanitizeRow } from '../security/sanitize.js'

export function normalizeRows(rows: Array<Record<string, string>>) {
  return rows.map(original => {
    const row = sanitizeRow(original)

    return {
      folio: String(row.folio ?? '').trim().toUpperCase(),
      provider: String(row.provider ?? '').trim().toUpperCase(),
      contract: String(row.contract ?? '').trim().toUpperCase(),
      status: String(row.status ?? 'PENDIENTE').trim().toUpperCase(),
      slaProgress: Number(row.slaProgress ?? row.SLA ?? 0),
      severity: 'VERDE'
    }
  })
}
