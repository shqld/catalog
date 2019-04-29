import path from 'path'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import express from 'express'

import config from './config'
import { enableSSR } from './ssr'
import webpackConfig from './webpack'

process.on('unhandledRejection', console.error)
process.on('uncaughtException', console.error)

const app = express()

const usersCompiler = webpack(webpackConfig)

app.use(
  devMiddleware(usersCompiler)
  // hotMiddleware(clientCompiler)
)

app.use(
  express.static(path.resolve('node_modules/mirror/public')),
  express.static(path.resolve('node_modules/mirror/static'))
)

if (config.enableSSR) {
  enableSSR(app)
}

app.listen(3000)
