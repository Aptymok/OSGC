const auditLog: Array<Record<string, unknown>> = []

export function appendAuditLog(entry: Record<string, unknown>) {
  auditLog.push({
    ...entry,
    timestamp: new Date().toISOString()
  })
}

export function getAuditLog() {
  return auditLog
}
