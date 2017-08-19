require('dotenv').config()
const express = require('express')
const app = require('../src/server').app
const clientConfig = require('../webpack/client.dev')

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path

const clientStats = require('../buildClient/stats.json')
const serverRender = require('../buildServer/main.js').default

app.use(publicPath, express.static(outputPath))
app.use(serverRender({ clientStats }))

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`)
})
