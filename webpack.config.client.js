const webpack = require('webpack')
const clientConfiguration = require('universal-webpack').clientConfiguration

const configuration = require('./webpack.config.base.dev')
const settings = require('./universal-webpack-settings')

configuration.plugins.push(new webpack.DefinePlugin({
  'process.env.SERVER': JSON.stringify(false),
  'process.env.PUBLIC_PATH': JSON.stringify('dist')
}))

module.exports = clientConfiguration(configuration, settings)
