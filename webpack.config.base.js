const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const WebpackChunkHash = require('webpack-chunk-hash')
const Visualizer = require('webpack-visualizer-plugin')
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const HelmetPlugin = require('helmet-webpack-plugin').default
const config = require('./src/config')

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    client: './src/client'
  },
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
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch'
    }),
    new Dotenv({
      path: './.env',
      safe: false
    }),
    new ServiceWorkerPlugin({
      entry: path.join(__dirname, 'src/sw.js')
    }),
    new HtmlPlugin({
      filename: 'index.html',
      template: 'src/helpers/shell.jsx'
    }),
    new HelmetPlugin({
      helmetProps: config.head
    }),
    new WebpackChunkHash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function include(module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new Visualizer()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
}
