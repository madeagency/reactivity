const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const HelmetPlugin = require('helmet-webpack-plugin').default
const config = require('./src/config')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/only-dev-server',
      './src/client'
    ]
  },
  target: 'web',
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
    new webpack.HotModuleReplacementPlugin(),
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
    new WriteFilePlugin({
      test: /(sw.js|\.html)$/,
      useHashIndex: true,
      log: false
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3001,
    historyApiFallback: true,
    hot: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:3001/',
    filename: '[name].js'
  }
}
