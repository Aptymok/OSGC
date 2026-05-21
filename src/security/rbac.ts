export type Permission =
  | 'UPLOAD_CASES'
  | 'VIEW_AUDIT'
  | 'VIEW_RUNTIME'
  | 'EXPORT_REPORTS'

const rolePermissions: Record<string, Permission[]> = {
  SUPERVISOR: ['UPLOAD_CASES', 'VIEW_AUDIT', 'VIEW_RUNTIME', 'EXPORT_REPORTS'],
  GARANTIAS: ['UPLOAD_CASES', 'VIEW_RUNTIME'],
  AUDITORIA: ['VIEW_AUDIT', 'VIEW_RUNTIME'],
  LECTURA: ['VIEW_RUNTIME']
}

export function hasPermission(role: string, permission: Permission) {
  return rolePermissions[role]?.includes(permission) ?? false
}
