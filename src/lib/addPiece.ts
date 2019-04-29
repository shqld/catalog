import { Piece, PieceOptions } from './piece'

interface AddPiece {
  (name: string, render: Function): void
  (name: string, options: PieceOptions, render: Function): void
}

const defaultPieceOptions: PieceOptions = {
  target: 'client',
}

export const addPiece: AddPiece = (name: string, ...args: any) => {
  const renderer = args.pop()
  const options: PieceOptions = args.pop() || defaultPieceOptions

  const piece = new Piece(name, { renderer, options })

  piece.register()
}
