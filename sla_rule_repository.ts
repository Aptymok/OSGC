import type { SlaRule } from './sla_model.js'

const rules: SlaRule[] = []

export function registerSlaRule(rule: SlaRule) {
  rules.push(rule)
}

export function getSlaRules() {
  return rules
}
