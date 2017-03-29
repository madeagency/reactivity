const webpack = require('webpack')

const serverConfiguration = require('universal-webpack').serverConfiguration

const configuration = require('./webpack.config.base.dev')
const settings = require('./universal-webpack-settings')

configuration.plugins.push(new webpack.DefinePlugin({
  'process.env.SERVER': JSON.stringify(true),
  'process.env.PUBLIC_PATH': JSON.stringify('dist')
}))

module.exports = serverConfiguration(configuration, settings)
