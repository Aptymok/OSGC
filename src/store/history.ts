const ingestionHistory: Array<Record<string, unknown>> = []

export function appendIngestionHistory(entry: Record<string, unknown>) {
  ingestionHistory.push({
    ...entry,
    createdAt: new Date().toISOString()
  })
}

export function listIngestionHistory() {
  return ingestionHistory
}
