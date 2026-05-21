export function normalizeWarrantyRow(row: Record<string, unknown>) {
  return {
    folioMai: String(row.folio_mai ?? ''),
    provider: String(row.proveedor ?? ''),
    contract: String(row.contrato ?? ''),
    status: String(row.estado ?? 'PENDIENTE')
  }
}
