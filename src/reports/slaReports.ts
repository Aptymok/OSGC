export function buildSlaReport(cases: Array<Record<string, any>>) {
  return {
    total: cases.length,
    pendientes: cases.filter(item => item.status === 'PENDIENTE').length,
    vencidos: cases.filter(item => item.status === 'VENCIDO').length,
    rojo: cases.filter(item => item.severity === 'ROJO').length,
    naranja: cases.filter(item => item.severity === 'NARANJA').length
  }
}
