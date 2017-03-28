import http from 'http'
import createApp from '../src/server'

export default function (parameters) {
  const app = createApp(parameters.chunks())
  const server = http.createServer(app)
  let currentApp = app

  server.listen(process.env.PORT)

  if (module.hot) {
    module.hot.accept('../src/server', () => {
      server.removeListener('request', currentApp)
      server.on('request', app)
      currentApp = app
    })
  }
}
