export function buildOperationalHeatmap(data: Array<Record<string, unknown>>) {
  return data.map(item => ({
    folio: item.folioMai ?? 'UNKNOWN',
    severity: item.severity ?? 'VERDE'
  }))
}
