import http from 'http'
import app from '../src/server'
const server = http.createServer(app)
let currentApp = app

server.listen(3500);

if (module.hot) {
	module.hot.accept('../src/server', () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
