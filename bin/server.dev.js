require('dotenv').config()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const app = require('../src/server').app

const clientConfig = require('../webpack/client.dev')
const serverConfig = require('../webpack/server.dev')

const publicPath = clientConfig.output.publicPath
const compiler = webpack([clientConfig, serverConfig])
const clientCompiler = compiler.compilers[0]
const options = { publicPath, stats: { colors: true } }

app.use(webpackDevMiddleware(compiler, options))
app.use(webpackHotMiddleware(clientCompiler))
app.use(webpackHotServerMiddleware(compiler))

compiler.plugin('done', () => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`)
  })
})
