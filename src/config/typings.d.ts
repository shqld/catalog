import * as webpack from 'webpack'

export interface RawConfig {
  pieces: Array<string>
  outputPath?: string
  enableSSR?: boolean
  webpackConfigPath?: string
}

export interface Config {
  pieces: Array<string>
  outputPath: string
  enableSSR: boolean
  webpackConfigPath: string
}
