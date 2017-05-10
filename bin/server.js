import http from 'http'
import createApp from '../src/server'

export default function (parameters) {
  const app = createApp(parameters.chunks())
  const server = http.createServer(app)

  server.listen(process.env.APP_PORT)

  return server
}
