export function exportCasesXlsxPlaceholder(rows: Array<Record<string, unknown>>) {
  return {
    ok: true,
    type: 'XLSX_EXPORT_PLACEHOLDER',
    rows: rows.length,
    recommendation: 'Integrate SheetJS or ExcelJS in production runtime'
  }
}
