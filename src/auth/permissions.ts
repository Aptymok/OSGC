export type Role = 'SUPERVISOR' | 'GARANTIAS' | 'AUDITORIA' | 'LECTURA'

export type Permission =
  | 'CASES_READ'
  | 'CASES_WRITE'
  | 'AUDIT_READ'
  | 'RUNTIME_READ'
  | 'UPLOAD_CASES'
  | 'EXPORT_REPORTS'

const permissions: Record<Role, Permission[]> = {
  SUPERVISOR: ['CASES_READ', 'CASES_WRITE', 'AUDIT_READ', 'RUNTIME_READ', 'UPLOAD_CASES', 'EXPORT_REPORTS'],
  GARANTIAS: ['CASES_READ', 'CASES_WRITE', 'RUNTIME_READ', 'UPLOAD_CASES'],
  AUDITORIA: ['CASES_READ', 'AUDIT_READ', 'RUNTIME_READ', 'EXPORT_REPORTS'],
  LECTURA: ['CASES_READ', 'RUNTIME_READ']
}

export function can(role: Role, permission: Permission) {
  return permissions[role]?.includes(permission) ?? false
}
