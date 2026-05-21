import crypto from 'node:crypto'
import type { Role } from './permissions.js'

export interface Session {
  id: string
  username: string
  role: Role
  createdAt: number
  expiresAt: number
}

const sessions = new Map<string, Session>()

const SESSION_DURATION_MS = 1000 * 60 * 60 * 8

export function createSession(username: string, role: Role) {
  const now = Date.now()

  const session: Session = {
    id: crypto.randomUUID(),
    username,
    role,
    createdAt: now,
    expiresAt: now + SESSION_DURATION_MS
  }

  sessions.set(session.id, session)

  return session
}

export function getSession(id: string) {
  const session = sessions.get(id)

  if (!session) return null

  if (Date.now() > session.expiresAt) {
    sessions.delete(id)
    return null
  }

  return session
}

export function invalidateSession(id: string) {
  sessions.delete(id)
}
