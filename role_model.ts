export type UserRole =
  | 'SUPERVISOR'
  | 'GARANTIAS'
  | 'MANTENIMIENTO'
  | 'LECTURA'
  | 'AUDITORIA'

export interface UserSession {
  id: string
  username: string
  role: UserRole
}
