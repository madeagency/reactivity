const webpack = require('webpack')

const serverConfiguration = require('universal-webpack').serverConfiguration

const configuration = require('./webpack.config.base.dev')
const settings = require('./universal-webpack-settings')

configuration.plugins.push(new webpack.DefinePlugin({
  'process.env.SERVER': JSON.stringify(true)
}))

module.exports = serverConfiguration(configuration, settings)
