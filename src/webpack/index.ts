import config from '../config'
import { resolveWebpackConfig } from './resolve'

export default resolveWebpackConfig('browser', config.webpackConfigPath)
