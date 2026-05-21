import http from 'node:http'

const cases = [
  {
    folio: 'INC001',
    provider: 'HP',
    status: 'PENDIENTE',
    severity: 'AMARILLO',
    sla: 62
  },
  {
    folio: 'INC002',
    provider: 'LENOVO',
    status: 'VENCIDO',
    severity: 'ROJO',
    sla: 100
  }
]

const server = http.createServer((req, res) => {
  if (req.url === '/api/cases') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(cases))
    return
  }

  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'OK' }))
    return
  }

  res.writeHead(404)
  res.end()
})

server.listen(4010, () => {
  console.log('OSGC API running on port 4010')
})
