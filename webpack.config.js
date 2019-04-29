const path = require('path')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const extensions = ['.js', '.ts', '.jsx', '.tsx', 'mjs']
const extensionsBrowser = extensions.concat(extensions.map(e => '.browser' + e))
const extensionsServer = extensions.concat(extensions.map(e => '.server' + e))

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production'

module.exports = [
  {
    mode,
    target: 'node',
    devtool: 'eval-source-map',
    entry: path.resolve('src/index.ts'),
    output: {
      path: path.resolve('dist'),
      filename: 'index.js',
    },
    resolve: {
      extensions: extensionsServer,
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  {
    mode,
    target: 'web',
    devtool: 'eval-source-map',
    entry: {
      app: path.resolve('src/app/main.ts'),
      inner: path.resolve('src/app/inner.ts'),
    },
    output: {
      path: path.resolve('public'),
      filename: '[name].js',
    },
    resolve: {
      extensions: extensionsBrowser,
    },
    module: {
      rules: [
        { test: /\.(js|ts)x?$/, use: 'babel-loader', exclude: /node_modules/ },
      ],
    },
  },
]
