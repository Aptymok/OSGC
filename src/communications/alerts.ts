export function buildSlaAlerts(cases: Array<Record<string, unknown>>) {
  return cases
    .filter(item => Number(item.slaProgress ?? 0) >= 80)
    .map(item => ({
      type: 'SLA_ALERT',
      folio: item.folio,
      provider: item.provider,
      severity: item.severity
    }))
}

export function buildExpirationAlerts(cases: Array<Record<string, unknown>>) {
  return cases
    .filter(item => String(item.status ?? '') === 'VENCIDO')
    .map(item => ({
      type: 'EXPIRED_CASE',
      folio: item.folio,
      provider: item.provider
    }))
}
