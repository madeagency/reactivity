const webpack = require('webpack')
const path = require('path')
const clientConfiguration = require('universal-webpack').clientConfiguration
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const HelmetPlugin = require('helmet-webpack-plugin').default
const WriteFilePlugin = require('write-file-webpack-plugin')
const config = require('./src/config')

const configuration = require('./webpack.config.base.dev')
const settings = require('./universal-webpack-settings')

configuration.plugins.push(new webpack.DefinePlugin({
  'process.env.SERVER': JSON.stringify(false)
}))

configuration.plugins.push(new HtmlPlugin({
  filename: 'shell.html',
  template: 'src/helpers/shell.jsx'
}))

configuration.plugins.push(new HelmetPlugin({
  filename: 'shell.html',
  helmetProps: config.head
}))

configuration.plugins.push(new ServiceWorkerPlugin({
  entry: path.join(__dirname, 'src/sw.js')
}))

configuration.plugins.push(new WriteFilePlugin({
  test: /(sw.js|\.html)$/,
  useHashIndex: true,
  log: false
}))

module.exports = clientConfiguration(configuration, settings)
