export function normalizeRows(rows: Array<Record<string, string>>) {
  return rows.map(row => ({
    folio: String(row.folio ?? '').trim().toUpperCase(),
    provider: String(row.provider ?? '').trim().toUpperCase(),
    contract: String(row.contract ?? '').trim().toUpperCase(),
    status: String(row.status ?? 'PENDIENTE').trim().toUpperCase(),
    severity: 'VERDE'
  }))
}
