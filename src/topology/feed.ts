export function buildSupervisorFeed(
  cases: Array<Record<string, unknown>>
) {
  return cases.map(item => ({
    message:
      `${item.provider} :: ${item.status}`,
    severity:
      item.severity ?? 'VERDE',
    folio:
      item.folio ?? 'UNKNOWN'
  }))
}
