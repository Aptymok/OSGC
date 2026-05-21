export const REQUIRED_COLUMNS = [
  'folio_mai',
  'fecha_reporte',
  'proveedor',
  'contrato',
  'estado'
]

export function validateColumns(columns: string[]): string[] {
  return REQUIRED_COLUMNS.filter(column => !columns.includes(column))
}
