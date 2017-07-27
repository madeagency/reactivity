require('dotenv').config()
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../../webpack/client.dev')
const serverConfig = require('../../webpack/server.dev')
const renderShell = require('../../src/helpers/Shell')
const compression = require('compression')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()
const DEV = process.env.NODE_ENV === 'development'
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const app = express()

app.use(compression())
app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '..', '..', 'static')))

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: process.env.API_URL, changeOrigin: true })
})

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error)
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }

  res.end(JSON.stringify({ error: 'proxy_error', reason: error.message }))
})

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(webpackDevMiddleware(multiCompiler, { publicPath }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  )
  // app.use('/shell', (req, res) => res.send(renderShell({ multiCompiler, outputPath })))
} else {
  const clientStats = require('../../buildClient/stats.json')
  const serverRender = require('../../buildServer/main.js').default

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
  // app.use('/shell', (req, res) => res.send(renderShell({ clientStats, outputPath })))
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`)
})

