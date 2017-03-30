const webpack = require('webpack')
const yargs = require('yargs')
const serverConfiguration = require('universal-webpack').serverConfiguration
const devConfig = require('./webpack.config.base.dev')
const baseConfig = require('./webpack.config.base')
const settings = require('./universal-webpack-settings')

const isDevelopmentMode = !(yargs.argv.p || false)
const configuration = isDevelopmentMode ? devConfig : baseConfig

configuration.target = 'node'

configuration.plugins.push(new webpack.DefinePlugin({
  'process.env.SERVER': JSON.stringify(true)
}))

module.exports = serverConfiguration(configuration, settings)
