import { Application } from 'express'
import webpack from 'webpack'
import dotProp from 'dot-prop'
import { resolveWebpackConfig } from './webpack/resolve'
import preactAdapter from './lib/adapters/preact.server'
import { Piece } from './lib/piece'

export const enableSSR = (app: Application) => {
  // TODO: split usersConfig into csr and ssr
  const ssrCompiler = webpack(resolveWebpackConfig('server'))

  const watcher = ssrCompiler.watch({}, (err, stat) => {
    if (err) {
      return // TODO:
    }

    for (const assetName in stat.compilation.assets) {
      const { emitted, existsAt } = stat.compilation.assets[assetName]

      if (!emitted) continue

      delete require.cache[existsAt]
      require(existsAt)
    }
  })

  app.on('exit', () => watcher.close(() => {}))

  app.get('/ssr', async (req, res) => {
    const { pieceName } = req.query
    const piece: Piece = dotProp.get(
      global.pieces,
      pieceName.replace(/\|/g, '.')
    )

    if (!piece.hasTarget('server')) {
      // TODO: error handling
      res.status(404).send('')
      throw new Error('No such piece')
    }

    const rendered = await preactAdapter(piece)
    res.send(rendered)
  })
}
