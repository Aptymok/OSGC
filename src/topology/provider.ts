export function summarizeProviders(
  cases: Array<Record<string, unknown>>
) {
  const summary: Record<string, number> = {}

  cases.forEach(item => {
    const provider = String(
      item.provider ?? 'UNKNOWN'
    )

    summary[provider] =
      (summary[provider] ?? 0) + 1
  })

  return summary
}
