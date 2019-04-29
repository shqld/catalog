import { render } from 'preact-render-to-string'
import { Piece } from '../piece'

export default async (piece: Piece) => {
  return render(piece.render())
}
