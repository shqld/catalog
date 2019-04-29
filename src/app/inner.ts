import dotProp from 'dot-prop'
import { Piece } from '../lib/piece'
import adapter from '../lib/adapters/preact.browser'

const main = async () => {
  const container = document.getElementById('container')!

  container.innerHTML = ''

  const pieceName = window.parent.location.hash.replace('#', '')
  if (!pieceName) {
    return
  }

  const piece: Piece = dotProp.get(
    window.parent.pieces,
    pieceName.replace(/\|/g, '.')
  )

  if (piece.hasTarget('server')) {
    const ssr = await fetch('/ssr' + `?pieceName=${pieceName}`).then(res =>
      res.text()
    )
    container.innerHTML = ssr
  }

  if (piece.hasTarget('client')) {
    adapter(container, piece)
  }
}

main()

window.parent.addEventListener('hashchange', main, false)
;[window.parent, window].forEach(frame =>
  frame.addEventListener('keydown', ({ key }) => {
    if (key === 'r') {
      main() // refresh rendering
    }
  })
)
