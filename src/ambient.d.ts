declare module 'webpack-config' {
  import { Configuration } from 'webpack'

  export default class Config {
    merge(config: Partial<Configuration>): this
    extends(): this
  }
}
