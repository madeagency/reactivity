const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const WebpackChunkHash = require('webpack-chunk-hash')
const Visualizer = require('webpack-visualizer-plugin')
const autoprefixer = require('autoprefixer')
const BabiliPlugin = require('babili-webpack-plugin')

// Base Webpack config for server and client
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
    }, {
      test: /\.(jpg|png|gif|svg|ico)$/,
      use: [{
        loader: 'url-loader'
      }]
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      components: path.resolve(__dirname, 'src/components/'),
      reducers: path.resolve(__dirname, 'src/redux/reducers/')
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
    new BabiliPlugin(),
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
