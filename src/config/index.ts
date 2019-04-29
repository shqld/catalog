import { loadGlobalConfig } from './load'
import { transformConfig } from './transfom'

const config = transformConfig(loadGlobalConfig())

export default config
