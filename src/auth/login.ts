import type { Role } from './permissions.js'
import { createSession } from './sessionStore.js'

const allowedRoles: Role[] = ['SUPERVISOR', 'GARANTIAS', 'AUDITORIA', 'LECTURA']

export function runtimeLogin(username: string, role: string) {
  const cleanUsername = username.trim()

  if (!cleanUsername) {
    return {
      ok: false,
      code: 'INVALID_USERNAME'
    }
  }

  if (!allowedRoles.includes(role as Role)) {
    return {
      ok: false,
      code: 'INVALID_ROLE'
    }
  }

  const session = createSession(cleanUsername, role as Role)

  return {
    ok: true,
    session
  }
}
