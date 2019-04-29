import fs from 'fs'
import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import mirrorConfig from './config'
import { Env } from './typings'

const loadWebpackConfig = (configPath: string | undefined, env: Env) => {
  if (!configPath || !fs.existsSync(configPath)) {
    return {}
  }

  const rawConfig = __non_webpack_require__(configPath)

  if (typeof rawConfig === 'function') {
    return rawConfig(env)
  }

  return rawConfig
}

export const resolveWebpackConfig = (
  platform: 'browser' | 'server',
  userConfig?: string,
  otherConfigs?: Array<string>
): Array<Configuration> => {
  const env = {
    prod: process.env.NODE_ENV === 'production',
    platform,
  }

  const config = mirrorConfig(env)

  const merged = merge(config, loadWebpackConfig(userConfig, env))

  if (otherConfigs) {
    return [
      merged,
      ...otherConfigs.map(config => loadWebpackConfig(config, env)),
    ]
  }

  return [merged]
}
