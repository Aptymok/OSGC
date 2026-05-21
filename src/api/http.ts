import http from 'node:http'
import { SECURITY_HEADERS } from '../security/headers.js'

export function sendJson(response: http.ServerResponse, data: unknown, status = 200) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    ...SECURITY_HEADERS
  })

  response.end(JSON.stringify(data))
}

export function sendError(response: http.ServerResponse, code: string, status = 400) {
  sendJson(response, { ok: false, error: code }, status)
}

export async function readJsonBody(request: http.IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk))
  }

  const raw = Buffer.concat(chunks).toString('utf-8')

  if (!raw.trim()) {
    return {}
  }

  return JSON.parse(raw)
}
