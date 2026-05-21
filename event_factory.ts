export function createEvent(caseId: string, type: string, source: string) {
  return {
    id: `${Date.now()}`,
    caseId,
    type,
    source,
    occurredAt: new Date().toISOString()
  }
}
