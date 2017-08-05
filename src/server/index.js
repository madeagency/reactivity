require('dotenv').config()
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const compression = require('compression')
const httpProxy = require('http-proxy')

const clientConfig = require('../../webpack/client.dev')
const serverConfig = require('../../webpack/server.dev')
const clientConfigProd = require('../../webpack/client.prod')
const serverConfigProd = require('../../webpack/server.prod')

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const DEV = process.env.NODE_ENV === 'development'

const app = express()
const proxy = httpProxy.createProxyServer()

app.use(compression())
app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '..', '..', 'static')))
app.use(express.static(path.join(__dirname, '..', '..', 'buildClient')))

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

let isBuilt = false

const done = () =>
  !isBuilt &&
  app.listen(process.env.APP_PORT, () => {
    isBuilt = true
    console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`)
  })

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig])
  const clientCompiler = compiler.compilers[0]
  const options = { publicPath, stats: { colors: true } }

  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))

  compiler.plugin('done', done)
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const serverRender = require('../../buildServer/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))

    done()
  })
}
