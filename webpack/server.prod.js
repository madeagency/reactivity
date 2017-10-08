const path = require("path")
const webpack = require("webpack")
const autoprefixer = require("autoprefixer")

const res = p => path.resolve(__dirname, p)

const entry = res("../src/server/render.js")
const output = res("../build")

module.exports = {
  name: "server",
  target: "node",
  devtool: "source-map",
  entry: [entry],
  output: {
    path: output,
    filename: "server.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "css-loader/locals",
            options: {
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer({ browsers: "last 2 versions" })],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "..", "src/components/"),
      reducers: path.resolve(__dirname, "..", "src/redux/reducers/"),
    },
    extensions: [".json", ".js", ".jsx"],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.ProvidePlugin({
      fetch: "isomorphic-fetch",
    }),
    new webpack.DefinePlugin({
      "process.env.SERVER": JSON.stringify(true),
    }),
  ],
}
