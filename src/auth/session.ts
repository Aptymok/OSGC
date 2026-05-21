export interface Session {
  username: string
  role: string
  createdAt: string
}

const sessions: Session[] = []

export function createSession(session: Session) {
  sessions.push(session)
}

export function listSessions() {
  return sessions
}
