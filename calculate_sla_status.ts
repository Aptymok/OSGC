import type { SlaRule } from './sla_model.js'

export function calculateSlaStatus(rule: SlaRule, startedAt: Date, now: Date = new Date()) {
  const elapsedMs = now.getTime() - startedAt.getTime()
  const elapsedHours = elapsedMs / 36e5
  const limitHours = rule.limitValue * 24

  if (elapsedHours >= limitHours) {
    return { status: 'SLA_VENCIDO', severity: 'ROJO', expired: true }
  }

  if (elapsedHours >= limitHours * 0.8) {
    return { status: 'SLA_PROXIMO_A_VENCER', severity: 'NARANJA', expired: false }
  }

  if (elapsedHours >= limitHours * 0.5) {
    return { status: 'SLA_EN_OBSERVACION', severity: 'AMARILLO', expired: false }
  }

  return { status: 'SLA_DENTRO_DE_TIEMPO', severity: 'VERDE', expired: false }
}
