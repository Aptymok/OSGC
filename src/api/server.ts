import http from 'node:http'
import { hydrateCases, hydrateEvents, hydrateAudit, hydrateIngestionHistory, hydrateStream } from '../runtime/osgcStore.js'
import { exportCasesCsv } from '../export/csvExport.js'
import { sendJson, sendError } from './http.js'
import { applyCaseFilters, getPagination } from './query.js'
import { logRequest } from './logger.js'

const server = http.createServer((request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://localhost:4010')

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
      logRequest('GET', url.pathname, 200)
      return sendJson(response, hydrateAudit())
    }

    if (url.pathname === '/api/events') {
      logRequest('GET', url.pathname, 200)
      return sendJson(response, hydrateEvents())
    }

    if (url.pathname === '/api/ingestion') {
      logRequest('GET', url.pathname, 200)
      return sendJson(response, hydrateIngestionHistory())
    }

    if (url.pathname === '/api/stream') {
      logRequest('GET', url.pathname, 200)
      return sendJson(response, hydrateStream())
    }

    if (url.pathname === '/api/export/cases.csv') {
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
