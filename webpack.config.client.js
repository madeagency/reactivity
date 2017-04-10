const webpack = require('webpack')
const path = require('path')
const yargs = require('yargs')

const devConfig = require('./webpack.config.dev')
const baseConfig = require('./webpack.config.base')
const settings = require('./universal-webpack-settings')

// Client Specific Plugins
const clientConfiguration = require('universal-webpack').clientConfiguration
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const isDevelopmentMode = !(yargs.argv.p || false)
const configuration = isDevelopmentMode ? devConfig : baseConfig

configuration.target = 'web'

configuration.plugins.push(
  new webpack.DefinePlugin({
    'process.env.SERVER': JSON.stringify(false)
  }),
  new ServiceWorkerPlugin({
    entry: path.join(__dirname, 'src/sw.js')
  })
)

if (isDevelopmentMode) {
  configuration.plugins.push(new WriteFilePlugin({
    test: /(sw.js)$/,
    useHashIndex: true,
    log: false
  }))
}

// https://github.com/halt-hammerzeit/universal-webpack#flash-of-unstyled-content
module.exports = clientConfiguration(configuration, settings, {
  development: isDevelopmentMode,
  css_bundle: isDevelopmentMode
})
