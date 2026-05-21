type Store = {
  cases: Array<Record<string, unknown>>
  events: Array<Record<string, unknown>>
  audit: Array<Record<string, unknown>>
}

const store: Store = {
  cases: [],
  events: [],
  audit: []
}

export function insertCase(data: Record<string, unknown>) {
  store.cases.push(data)
  return data
}

export function listCases() {
  return store.cases
}

export function appendEvent(data: Record<string, unknown>) {
  const event = {
    ...data,
    createdAt: new Date().toISOString()
  }

  store.events.push(event)
  return event
}

export function listEvents() {
  return store.events
}

export function appendAudit(data: Record<string, unknown>) {
  const entry = {
    ...data,
    createdAt: new Date().toISOString()
  }

  store.audit.push(entry)
  return entry
}

export function listAudit() {
  return store.audit
}
