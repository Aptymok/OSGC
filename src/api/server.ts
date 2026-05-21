import http from 'node:http'
import { hydrateCases, hydrateEvents, hydrateAudit, hydrateIngestionHistory, hydrateStream } from '../runtime/osgcStore.js'

function sendJson(response: http.ServerResponse, data: unknown, status = 200) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  response.end(JSON.stringify(data))
}

const server = http.createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
    response.end()
    return
  }

  if (request.url === '/api/health') return sendJson(response, { status: 'OSGC_RUNNING' })
  if (request.url === '/api/cases') return sendJson(response, hydrateCases())
  if (request.url === '/api/events') return sendJson(response, hydrateEvents())
  if (request.url === '/api/audit') return sendJson(response, hydrateAudit())
  if (request.url === '/api/ingestion') return sendJson(response, hydrateIngestionHistory())
  if (request.url === '/api/stream') return sendJson(response, hydrateStream())

  sendJson(response, { error: 'NOT_FOUND' }, 404)
})

server.listen(4010, () => {
  console.log('OSGC API running on http://localhost:4010')
})
