export function buildProviderSummary(cases: Array<Record<string, any>>) {
  const summary: Record<string, number> = {}

  cases.forEach(item => {
    const provider = String(item.provider ?? 'UNKNOWN')
    summary[provider] = (summary[provider] ?? 0) + 1
  })

  return summary
}

export function buildSlaSummary(cases: Array<Record<string, any>>) {
  return {
    total: cases.length,
    vencidos: cases.filter(item => item.status === 'VENCIDO').length,
    pendientes: cases.filter(item => item.status === 'PENDIENTE').length,
    riesgo: cases.filter(item => item.severity === 'ROJO').length
  }
}

export function buildExpiredCases(cases: Array<Record<string, any>>) {
  return cases.filter(item => item.status === 'VENCIDO')
}
