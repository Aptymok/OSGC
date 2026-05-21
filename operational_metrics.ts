export function calculateOperationalMetrics(cases: Array<Record<string, unknown>>) {
  return {
    totalCases: cases.length,
    pendingCases: cases.filter(c => c.status === 'PENDIENTE').length,
    closedCases: cases.filter(c => c.status === 'CERRADO').length,
    expiredCases: cases.filter(c => c.status === 'VENCIDO').length
  }
}
