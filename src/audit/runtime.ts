const auditEntries: Array<Record<string, unknown>> = []

export function appendAuditEntry(entry: Record<string, unknown>) {
  auditEntries.push({
    ...entry,
    createdAt: new Date().toISOString()
  })
}

export function listAuditEntries() {
  return auditEntries
}
