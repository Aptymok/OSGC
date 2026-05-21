export function evaluateSlaWatchdog(daysElapsed: number, limit: number) {
  if (daysElapsed >= limit) {
    return {
      alert: true,
      status: 'SLA_VENCIDO'
    }
  }

  return {
    alert: false,
    status: 'SLA_OK'
  }
}
