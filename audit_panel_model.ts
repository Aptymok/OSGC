export interface AuditEntry {
  timestamp: string
  actor: string
  action: string
  caseId: string
}

export const mockAuditEntries: AuditEntry[] = [
  {
    timestamp: new Date().toISOString(),
    actor: 'SYSTEM',
    action: 'SLA_VENCIDO',
    caseId: 'INC002'
  }
]
