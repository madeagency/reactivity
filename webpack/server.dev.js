const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const autoprefixer = require('autoprefixer')

const res = p => path.resolve(__dirname, p)

const modeModules = res('../node_modules')
const entry = res('../src/server/render.js')
const output = res('../buildServer')

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(modeModules)
  .filter(
    x =>
      !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
        x
      )
  )
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})

module.exports = {
  name: 'server',
  target: 'node',
  // devtool: 'source-map',
  devtool: 'eval',
  entry: [entry],
  externals,
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
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
        exclude: /node_modules/,
        use: [{
          loader: 'css-loader/locals',
          options: {
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
      }, {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [{
          loader: 'url-loader'
        }]
      }
    ]
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
    new WriteFilePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch'
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      safe: false
    }),
    new webpack.DefinePlugin({
      'process.env.SERVER': JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}
