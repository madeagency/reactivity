const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const autoprefixer = require('autoprefixer')
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'hidden-source-map',
  entry: [path.resolve(__dirname, '../src/client.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractCssChunks.extract({
          use: [{
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({ browsers: 'last 2 versions' })
              ]
            }
          }]
        })
      },
      {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [{
          loader: 'url-loader'
        }]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '..', 'src/components/'),
      reducers: path.resolve(__dirname, '..', 'src/redux/reducers/')
    },
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    new StatsPlugin('stats.json'),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      safe: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      sourceMap: true
    }),
    new ServiceWorkerPlugin({
      entry: path.join(__dirname, '..', 'src/sw.js'),
      excludes: ['*hot-update*', '**/*.map', '**/stats.json']
    }),
    new webpack.HashedModuleIdsPlugin() // not needed for strategy to work (just good practice)
  ]
}
