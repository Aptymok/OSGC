import { appendRuntimeEvent, hydrateCases, hydrateEvents, upsertCases } from '../runtime/osgcStore.js'

export function saveCase(data: unknown) {
  upsertCases([data as never])
}

export function listCases() {
  return hydrateCases()
}

export function appendEvent(data: unknown) {
  appendRuntimeEvent(data as Record<string, unknown>)
}

export function listEvents() {
  return hydrateEvents()
}
