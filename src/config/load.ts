import cosmiconfig from 'cosmiconfig'
import { transformConfig } from './transfom'
import { RawConfig } from './typings'

// FIXME: For debug
const cwd = process.env.DEBUG_CWD || process.cwd()

const explorer = cosmiconfig('mirror', {
  stopDir: cwd,
})

export const loadGlobalConfig = (): RawConfig => {
  const result = explorer.searchSync(cwd)

  if (!result) {
    throw new Error('Config file not found')
  }

  return result.config as RawConfig
}
