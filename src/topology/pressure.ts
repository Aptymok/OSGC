export function buildPressure(items: Array<Record<string, unknown>>) {
  return items.map(item => ({
    folio: item.folio,
    provider: item.provider,
    score: Number(item.slaProgress ?? 0) + Number(item.aging ?? 0)
  }))
}
