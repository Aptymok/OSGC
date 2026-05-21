const store = {
  cases: [],
  events: []
}

export function saveCase(data: unknown) {
  store.cases.push(data)
}

export function listCases() {
  return store.cases
}

export function appendEvent(data: unknown) {
  store.events.push(data)
}

export function listEvents() {
  return store.events
}
