export function exportCasesCsv(cases: Array<Record<string, unknown>>) {
  if (!cases.length) return ''

  const headers = Object.keys(cases[0])
  const rows = cases.map(item => headers.map(h => item[h]).join(','))

  return [headers.join(','), ...rows].join('\n')
}
