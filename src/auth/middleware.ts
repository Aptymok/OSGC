import type http from 'node:http'
import { getSession } from './sessionStore.js'
import { can, type Permission } from './permissions.js'

export function requirePermission(request: http.IncomingMessage, permission: Permission) {
  const auth = request.headers.authorization

  if (!auth?.startsWith('Bearer ')) {
    return {
      ok: false,
      code: 'AUTH_REQUIRED'
    }
  }

  const token = auth.replace('Bearer ', '')
  const session = getSession(token)

  if (!session) {
    return {
      ok: false,
      code: 'INVALID_SESSION'
    }
  }

  if (!can(session.role, permission)) {
    return {
      ok: false,
      code: 'FORBIDDEN'
    }
  }

  return {
    ok: true,
    session
  }
}
