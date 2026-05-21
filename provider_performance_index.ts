export function calculateProviderPerformance(cases: Array<Record<string, unknown>>) {
  const providers: Record<string, { total: number; closed: number }> = {}

  cases.forEach(item => {
    const provider = String(item.provider ?? 'UNKNOWN')

    if (!providers[provider]) {
      providers[provider] = {
        total: 0,
        closed: 0
      }
    }

    providers[provider].total += 1

    if (item.status === 'CERRADO') {
      providers[provider].closed += 1
    }
  })

  return providers
}
