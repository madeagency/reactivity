const webpack = require('webpack')
const path = require('path')
const clientConfiguration = require('universal-webpack').clientConfiguration
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const HelmetPlugin = require('helmet-webpack-plugin').default

const config = require('./src/config')
const configuration = require('./webpack.config.base')
const settings = require('./universal-webpack-settings')

configuration.plugins.push(new webpack.DefinePlugin({
  'process.env.SERVER': JSON.stringify(false)
}))

configuration.plugins.push(new HtmlPlugin({
  filename: 'shell.html',
  template: 'src/helpers/shell.jsx'
}))

configuration.plugins.push(new HelmetPlugin({
  helmetProps: config.head,
  filename: 'shell.html'
}))

configuration.plugins.push(new ServiceWorkerPlugin({
  entry: path.join(__dirname, 'src/sw.js')
}))

module.exports = clientConfiguration(configuration, settings, { development: false })
