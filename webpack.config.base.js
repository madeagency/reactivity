const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const WebpackChunkHash = require('webpack-chunk-hash')
const Visualizer = require('webpack-visualizer-plugin')

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
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
}
