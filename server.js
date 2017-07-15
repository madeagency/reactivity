import {} from 'dotenv/config'

import path from 'path'
import express from 'express'
import compression from 'compression'
import { createProxyServer } from 'http-proxy'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware-multi-compiler'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from './webpack/client.dev'
import serverConfig from './webpack/server.dev'

// import renderShell from '../src/helpers/Shell'

const DEV = process.env.NODE_ENV === 'development'
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const app = express()

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
} else {
  const clientStats = require('./buildClient/stats.json')
  const serverRender = require('./buildServer/main.js').default

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

const proxy = createProxyServer()

app.use(compression())
app.disable('x-powered-by')

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: process.env.API_URL, changeOrigin: true })
})

// app.use('/shell', (req, res) => res.send(renderShell({})))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'static')))

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`)
})
