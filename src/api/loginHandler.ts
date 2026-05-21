import type http from 'node:http'
import { readJsonBody, sendError, sendJson } from './http.js'
import { createSession } from '../auth/sessionStore.js'

export async function handleLogin(request: http.IncomingMessage, response: http.ServerResponse) {
  const body = await readJsonBody(request)

  const username = String(body.username ?? '').trim()
  const role = String(body.role ?? 'LECTURA')

  if (!username) {
    return sendError(response, 'INVALID_USERNAME', 400)
  }

  const session = createSession(username, role as never)

  return sendJson(response, {
    ok: true,
    session
  })
}
