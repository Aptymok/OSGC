export interface CommunicationAudit {
  id: string
  type: string
  target: string
  createdAt: string
  status: string
}

const audit: CommunicationAudit[] = []

export function appendCommunicationAudit(entry: Omit<CommunicationAudit, 'id' | 'createdAt'>) {
  const item: CommunicationAudit = {
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...entry
  }

  audit.push(item)

  return item
}

export function listCommunicationAudit() {
  return audit
}
