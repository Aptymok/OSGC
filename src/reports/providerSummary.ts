export function buildProviderSummary(cases: Array<Record<string, any>>) {
  const grouped = new Map<string, { total: number; vencidos: number }>()

  cases.forEach(item => {
    const provider = String(item.provider ?? 'UNKNOWN')

    if (!grouped.has(provider)) {
      grouped.set(provider, {
        total: 0,
        vencidos: 0
      })
    }

    const current = grouped.get(provider)!

    current.total += 1

    if (item.status === 'VENCIDO') {
      current.vencidos += 1
    }
  })

  return Array.from(grouped.entries()).map(([provider, data]) => ({
    provider,
    ...data
  }))
}
