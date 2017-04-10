const webpack = require('webpack')
const yargs = require('yargs')
const serverConfiguration = require('universal-webpack').serverConfiguration

const packageJson = require('./package.json')
const devConfig = require('./webpack.config.dev')
const baseConfig = require('./webpack.config.base')
const settings = require('./universal-webpack-settings')

const isDevelopmentMode = !(yargs.argv.p || false)
const configuration = isDevelopmentMode ? devConfig : baseConfig

configuration.target = 'node'

configuration.plugins.push(new webpack.DefinePlugin({
  'process.env.SERVER': JSON.stringify(true),
  'process.env.VERSION': JSON.stringify(packageJson.version)
}))

module.exports = serverConfiguration(configuration, settings)
