import type { WarrantyCase } from '../domain/case.js'
import { readFileStore, writeFileStore } from '../database/fileStore.js'

type RuntimeState = {
  cases: WarrantyCase[]
  events: Array<Record<string, unknown>>
  audit: Array<Record<string, unknown>>
  ingestionHistory: Array<Record<string, unknown>>
  stream: Array<Record<string, unknown>>
}

const persisted = readFileStore()

const state: RuntimeState = {
  cases: persisted.cases as WarrantyCase[],
  events: persisted.events,
  audit: persisted.audit,
  ingestionHistory: persisted.ingestionHistory,
  stream: persisted.stream
}

function persistState() {
  writeFileStore(state)
}

export function hydrateCases() {
  return state.cases
}

export function upsertCases(cases: WarrantyCase[]) {
  cases.forEach(item => {
    const index = state.cases.findIndex(
      existing => existing.folio === item.folio
    )

    if (index >= 0) {
      state.cases[index] = item
    } else {
      state.cases.push(item)
    }
  })

  persistState()

  return state.cases
}

export function appendRuntimeEvent(
  event: Record<string, unknown>
) {
  const entry = {
    ...event,
    createdAt: new Date().toISOString()
  }

  state.events.push(entry)
  state.stream.unshift(entry)

  persistState()

  return entry
}

export function hydrateEvents() {
  return state.events
}

export function appendRuntimeAudit(
  entry: Record<string, unknown>
) {
  const audit = {
    ...entry,
    createdAt: new Date().toISOString()
  }

  state.audit.push(audit)

  persistState()

  return audit
}

export function hydrateAudit() {
  return state.audit
}

export function appendIngestion(
  entry: Record<string, unknown>
) {
  const item = {
    ...entry,
    createdAt: new Date().toISOString()
  }

  state.ingestionHistory.unshift(item)

  persistState()

  return item
}

export function hydrateIngestionHistory() {
  return state.ingestionHistory
}

export function hydrateStream() {
  return state.stream
}
