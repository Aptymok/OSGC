export function exportCasesCsv(rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) return ''

  const headers = Object.keys(rows[0])
  const lines = [headers.join(',')]

  rows.forEach(row => {
    lines.push(headers.map(header => JSON.stringify(row[header] ?? '')).join(','))
  })

  return lines.join('\n')
}
