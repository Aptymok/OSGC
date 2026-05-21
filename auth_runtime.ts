import type { UserSession } from './role_model.js'

const sessions: UserSession[] = []

export function createSession(user: UserSession) {
  sessions.push(user)
  return user
}

export function listSessions() {
  return sessions
}
