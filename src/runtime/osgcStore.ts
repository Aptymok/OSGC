import type { WarrantyCase } from '../domain/case.js'

type RuntimeState = {
  cases: WarrantyCase[]
  events: Array<Record<string, unknown>>
  audit: Array<Record<string, unknown>>
  ingestionHistory: Array<Record<string, unknown>>
  stream: Array<Record<string, unknown>>
}

const state: RuntimeState = {
  cases: [],
  events: [],
  audit: [],
  ingestionHistory: [],
  stream: []
}

export function hydrateCases() {
  return state.cases
}

export function upsertCases(cases: WarrantyCase[]) {
  cases.forEach(item => {
    const index = state.cases.findIndex(existing => existing.folio === item.folio)
    if (index >= 0) state.cases[index] = item
    else state.cases.push(item)
  })
  return state.cases
}

export function appendRuntimeEvent(event: Record<string, unknown>) {
  const entry = { ...event, createdAt: new Date().toISOString() }
  state.events.push(entry)
  state.stream.unshift(entry)
  return entry
}

export function hydrateEvents() {
  return state.events
}

export function appendRuntimeAudit(entry: Record<string, unknown>) {
  const audit = { ...entry, createdAt: new Date().toISOString() }
  state.audit.push(audit)
  return audit
}

export function hydrateAudit() {
  return state.audit
}

export function appendIngestion(entry: Record<string, unknown>) {
  const item = { ...entry, createdAt: new Date().toISOString() }
  state.ingestionHistory.unshift(item)
  return item
}

export function hydrateIngestionHistory() {
  return state.ingestionHistory
}

export function hydrateStream() {
  return state.stream
}
