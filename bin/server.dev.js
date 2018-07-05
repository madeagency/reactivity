require('dotenv').config()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const { app } = require('../src/server')

const clientConfig = require('../webpack/client.dev')
const serverConfig = require('../webpack/server.dev')

const {
  output: { publicPath }
} = clientConfig
const compiler = webpack([clientConfig, serverConfig])
const clientCompiler = compiler.compilers[0]
const options = { publicPath, stats: { colors: true } }
const devMiddleware = webpackDevMiddleware(compiler, options)

app.use(devMiddleware)
app.use(webpackHotMiddleware(clientCompiler))
app.use(webpackHotServerMiddleware(compiler))

let isBuilt = false

devMiddleware.waitUntilValid(
  () =>
    !isBuilt &&
    app.listen(process.env.APP_PORT, () => {
      isBuilt = true
      console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`)
    })
)
