export function exportCasesXlsxPlaceholder(
  rows: Array<Record<string, unknown>>
) {
  return {
    ok: true,
    type: 'XLSX_EXPORT_PLACEHOLDER',
    rows: rows.length,
    recommendation: 'Integrate SheetJS or ExcelJS in production runtime'
  }
}

export async function exportCasesXlsx(
  rows: Array<Record<string, unknown>>
) {
  const XLSX = await import('xlsx')

  const worksheet = XLSX.utils.json_to_sheet(rows)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'OSGC_CASES'
  )

  return XLSX.write(workbook, {
    type: 'array',
    bookType: 'xlsx'
  })
}
