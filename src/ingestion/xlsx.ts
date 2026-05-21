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
    slaProgress: Number(row.slaProgress ?? row.SLA ?? row.SLA_PROGRESS ?? 0)
  }))
}

export async function parseXlsxBuffer(buffer: ArrayBuffer) {
  const XLSX = await import('xlsx')

  const workbook = XLSX.read(buffer, {
    type: 'array'
  })

  const sheetName = workbook.SheetNames[0]

  if (!sheetName) {
    return []
  }

  const sheet = workbook.Sheets[sheetName]

  return XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: ''
  })
}
