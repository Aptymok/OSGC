export function buildOperationalConsole(cases: Array<Record<string, unknown>>) {
  const total = cases.length
  const pending = cases.filter(item => item.status === 'PENDIENTE').length
  const expired = cases.filter(item => item.status === 'VENCIDO').length

  return {
    total,
    pending,
    expired,
    generatedAt: new Date().toISOString()
  }
}
