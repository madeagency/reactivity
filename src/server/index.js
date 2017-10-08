const path = require("path")
const express = require("express")
const compression = require("compression")
const httpProxy = require("http-proxy")

const app = express()
const proxy = httpProxy.createProxyServer()

app.use(compression())
app.disable("x-powered-by")
app.use(express.static(path.join(__dirname, "..", "..", "static")))

app.use("/api", (req, res) => {
  proxy.web(req, res, { target: process.env.API_URL, changeOrigin: true })
})

proxy.on("error", (error, req, res) => {
  if (error.code !== "ECONNRESET") {
    console.error("proxy error", error)
  }
  if (!res.headersSent) {
    res.writeHead(500, { "content-type": "application/json" })
  }

  res.end(JSON.stringify({ error: "proxy_error", reason: error.message }))
})

module.exports = {
  app
}
