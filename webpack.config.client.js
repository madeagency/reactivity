const webpack = require('webpack')
const path = require('path')
const yargs = require('yargs')

const devConfig = require('./webpack.config.base.dev')
const baseConfig = require('./webpack.config.base')
const settings = require('./universal-webpack-settings')

// Client Specific Plugins
const clientConfiguration = require('universal-webpack').clientConfiguration
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const HelmetPlugin = require('helmet-webpack-plugin').default
const WriteFilePlugin = require('write-file-webpack-plugin')
const config = require('./src/config')

const isDevelopmentMode = !(yargs.argv.p || false)
const configuration = isDevelopmentMode ? devConfig : baseConfig

const clientPlugins = [
  new webpack.DefinePlugin({
    'process.env.SERVER': JSON.stringify(false)
  }),
  new HtmlPlugin({
    filename: 'shell.html',
    template: 'src/helpers/shell.jsx'
  }),
  new HelmetPlugin({
    helmetProps: config.head,
    filename: 'shell.html'
  }),
  new ServiceWorkerPlugin({
    entry: path.join(__dirname, 'src/sw.js')
  })
]

if (isDevelopmentMode) {
  clientPlugins.push(new WriteFilePlugin({
    test: /(sw.js|\.html)$/,
    useHashIndex: true,
    log: false
  }))
}

configuration.target = 'web'
configuration.plugins.push(clientPlugins)

// https://github.com/halt-hammerzeit/universal-webpack#flash-of-unstyled-content
module.exports = clientConfiguration(configuration, settings, {
  development: isDevelopmentMode,
  css_bundle: isDevelopmentMode
})
