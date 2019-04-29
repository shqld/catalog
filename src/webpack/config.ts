import path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../config'
import { Env } from './typings'

const extensions = ['.js', '.ts', '.jsx', '.tsx']

export default (env: Env): Configuration => ({
  mode: env.prod ? 'production' : 'development',
  target: env.platform === 'server' ? 'node' : 'web',
  entry: [
    // 'webpack-hot-middleware/client',
    ...config.pieces,
  ],
  // output: {
  //   path: config.outputPath,
  //   filename: '[name].js',
  //   library: 'mirror_modules',
  //   libraryTarget: 'umd',
  // },
  resolve: {
    extensions: extensions.concat(extensions.map(e => `.${env.platform}${e}`)),
  },
  module: {
    rules: [{ test: /\.(js|ts)x?$/, use: 'babel-loader' }],
  },
  // @ts-ignore
  plugins: [
    // options.platform !== 'server' && new webpack.HotModuleReplacementPlugin(),
    env.platform !== 'server' &&
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            filename: 'index.html',
            inject: true,
            template: path.resolve('node_modules/mirror/static/index.html'),
          },
          process.env.NODE_ENV === 'production'
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
  ].filter(Boolean),
  node: env.platform !== 'server' && {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
})
