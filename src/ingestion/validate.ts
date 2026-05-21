export const REQUIRED_COLUMNS = ['folio', 'provider', 'contract', 'status']

export function validateRows(rows: Array<Record<string, string>>) {
  const errors: Array<{ row: number; missing: string[] }> = []

  rows.forEach((row, index) => {
    const missing = REQUIRED_COLUMNS.filter(column => !row[column])
    if (missing.length > 0) {
      errors.push({ row: index + 1, missing })
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}
