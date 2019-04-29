import { render } from 'preact'
import { Piece } from '../piece'

export default async (container: HTMLElement, piece: Piece) => {
  return render(piece.render(), container, container.firstChild as Element)
}
