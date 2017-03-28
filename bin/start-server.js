const server = require('universal-webpack').server

const config = require('../webpack.config.base')
const settings = require('../universal-webpack-settings')

server(config, settings)
