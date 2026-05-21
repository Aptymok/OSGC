import http from 'node:http'

const server = http.createServer((_, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ status: 'OSGC_RUNNING' }))
})

server.listen(4010)
