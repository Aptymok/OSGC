export async function parseXlsxPlaceholder(file: File) {
  return {
    ok: false,
    fileName: file.name,
    reason: 'XLSX_PARSER_REQUIRES_RUNTIME_LIBRARY',
    expectedColumns: ['folio', 'provider', 'contract', 'status', 'slaProgress']
  }
}

export function mapXlsxRows(rows: Array<Record<string, unknown>>) {
  return rows.map(row => ({
    folio: String(row.folio ?? row.FOLIO ?? '').trim(),
    provider: String(row.provider ?? row.PROVEEDOR ?? '').trim(),
    contract: String(row.contract ?? row.CONTRATO ?? '').trim(),
    status: String(row.status ?? row.ESTADO ?? 'PENDIENTE').trim(),
    slaProgress: Number(row.slaProgress ?? row.SLA ?? 0)
  }))
}
