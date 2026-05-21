import type { Repository } from './repository.js'

export interface AuditRecord {
  id: string
  action: string
  createdAt: string
}

const auditRecords: AuditRecord[] = []

export class AuditRepository implements Repository<AuditRecord> {
  async create(data: AuditRecord) {
    auditRecords.push(data)
    return data
  }

  async list() {
    return auditRecords
  }

  async findById(id: string) {
    return auditRecords.find(item => item.id === id) ?? null
  }
}
