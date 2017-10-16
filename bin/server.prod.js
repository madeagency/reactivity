require('dotenv').config()
const express = require('express')
const compression = require('compression')
const zlib = require('zlib')
const { app } = require('../src/server')
const clientConfig = require('../webpack/client.prod')

const { output: { publicPath } } = clientConfig
const outputPath = clientConfig.output.path

const clientStats = require('../build/stats.json')
const serverRender = require('../build/server.js').default

app.use(publicPath, express.static(outputPath))
app.use(
  compression({ flush: zlib.Z_PARTIAL_FLUSH }),
  serverRender({ clientStats })
)

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`)
})
