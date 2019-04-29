import fs from 'fs'
import path from 'path'
import { Config, RawConfig } from './typings'
import { resolveWebpackConfig } from '../webpack/resolve'

export const transformConfig = (config: RawConfig): Config => {
  const transformed: Config = {
    pieces: config.pieces,
    enableSSR: config.enableSSR || false,
    outputPath: config.outputPath || path.resolve('dist'),
    webpackConfigPath:
      config.webpackConfigPath || path.resolve('webpack.config.js'),
  }

  return transformed
}
