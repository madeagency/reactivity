const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const WebpackChunkHash = require('webpack-chunk-hash')
const Visualizer = require('webpack-visualizer-plugin')
const autoprefixer = require('autoprefixer')

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
    }, {
      test: /\.scss?$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            autoprefixer({ browsers: 'last 2 versions' })
          ]
        }
      }, {
        loader: 'sass-loader'
      }]
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
