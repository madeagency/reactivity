const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './bin/server',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      include: [
        path.join(__dirname, 'src')
      ]
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      api: path.resolve(__dirname, 'src/api/')
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env.SERVER': JSON.stringify(true),
      'process.env.PUBLIC_PATH': JSON.stringify('dist')
    }),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  }
}
