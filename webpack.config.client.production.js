const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')

module.exports = {
  entry: {
    client: './src/client'
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
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch'
    }),
    new Dotenv({
      path: './.env',
      safe: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function include(module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'client.manifest',
    }),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: 'client.chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
}
