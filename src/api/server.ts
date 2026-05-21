import http from 'node:http'
import { hydrateCases, hydrateEvents, hydrateAudit, hydrateIngestionHistory, hydrateStream } from '../runtime/osgcStore.js'
import { exportCasesCsv } from '../export/csvExport.js'
import { sendJson, sendError } from './http.js'
import { applyCaseFilters, getPagination } from './query.js'
import { logRequest } from './logger.js'
import { checkRateLimit } from '../security/rateLimit.js'
import { requirePermission } from '../auth/middleware.js'

function deny(response: http.ServerResponse, code: string) {
  return sendError(response, code, code === 'FORBIDDEN' ? 403 : 401)
}

const server = http.createServer((request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://localhost:4010')
    const ip = String(request.socket.remoteAddress ?? 'unknown')
    const limit = checkRateLimit(ip)

    if (!limit.ok) {
      logRequest(request.method ?? 'GET', url.pathname, 429)
      return sendError(response, 'RATE_LIMITED', 429)
    }

    if (request.method === 'OPTIONS') {
      response.writeHead(204)
      response.end()
      return
    }

    if (url.pathname === '/api/health') {
      logRequest('GET', url.pathname, 200)
      return sendJson(response, { status: 'OSGC_RUNNING' })
    }

    if (url.pathname === '/api/cases') {
      const auth = requirePermission(request, 'CASES_READ')
      if (!auth.ok) return deny(response, auth.code)

      const pagination = getPagination(url.searchParams)
      const filtered = applyCaseFilters(hydrateCases(), url.searchParams)
      const paged = filtered.slice(pagination.offset, pagination.offset + pagination.limit)

      logRequest('GET', url.pathname, 200)

      return sendJson(response, {
        ok: true,
        total: filtered.length,
        page: pagination.page,
        limit: pagination.limit,
        data: paged
      })
    }

    if (url.pathname === '/api/sla') {
      const auth = requirePermission(request, 'RUNTIME_READ')
      if (!auth.ok) return deny(response, auth.code)

      const cases = hydrateCases()
      const summary = {
        total: cases.length,
        vencidos: cases.filter(item => item.status === 'VENCIDO').length,
        pendientes: cases.filter(item => item.status === 'PENDIENTE').length,
        riesgo: cases.filter(item => item.severity === 'ROJO').length
      }

      logRequest('GET', url.pathname, 200)
      return sendJson(response, summary)
    }

    if (url.pathname === '/api/audit') {
      const auth = requirePermission(request, 'AUDIT_READ')
      if (!auth.ok) return deny(response, auth.code)

      logRequest('GET', url.pathname, 200)
      return sendJson(response, hydrateAudit())
    }

    if (url.pathname === '/api/events') {
      const auth = requirePermission(request, 'RUNTIME_READ')
      if (!auth.ok) return deny(response, auth.code)

      logRequest('GET', url.pathname, 200)
      return sendJson(response, hydrateEvents())
    }

    if (url.pathname === '/api/ingestion') {
      const auth = requirePermission(request, 'RUNTIME_READ')
      if (!auth.ok) return deny(response, auth.code)

      logRequest('GET', url.pathname, 200)
      return sendJson(response, hydrateIngestionHistory())
    }

    if (url.pathname === '/api/stream') {
      const auth = requirePermission(request, 'RUNTIME_READ')
      if (!auth.ok) return deny(response, auth.code)

      logRequest('GET', url.pathname, 200)
      return sendJson(response, hydrateStream())
    }

    if (url.pathname === '/api/export/cases.csv') {
      const auth = requirePermission(request, 'EXPORT_REPORTS')
      if (!auth.ok) return deny(response, auth.code)

      const csv = exportCasesCsv(hydrateCases())

      response.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="osgc_cases.csv"'
      })

      response.end(csv)
      logRequest('GET', url.pathname, 200)
      return
    }

    logRequest(request.method ?? 'GET', url.pathname, 404)
    return sendError(response, 'NOT_FOUND', 404)
  } catch (error) {
    console.error(error)
    logRequest(request.method ?? 'GET', request.url ?? '/', 500)
    return sendError(response, 'INTERNAL_SERVER_ERROR', 500)
  }
})

server.listen(4010, () => {
  console.log('OSGC API running on http://localhost:4010')
})
