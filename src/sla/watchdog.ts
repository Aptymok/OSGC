export function evaluateSla(progress: number) {
  if (progress >= 100) {
    return {
      status: 'SLA_VENCIDO',
      severity: 'ROJO'
    }
  }

  if (progress >= 80) {
    return {
      status: 'SLA_EN_OBSERVACION',
      severity: 'NARANJA'
    }
  }

  return {
    status: 'SLA_OK',
    severity: 'VERDE'
  }
}
