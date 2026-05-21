export function calculateProviderRisk(cases: Array<Record<string, unknown>>) {
  const grouped: Record<string, number> = {}

  cases.forEach(item => {
    const provider = String(item.provider ?? 'UNKNOWN')
    grouped[provider] = (grouped[provider] ?? 0) + 1
  })

  return grouped
}
