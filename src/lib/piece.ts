import dotProp from 'dot-prop'

export type PlatformType = 'client' | 'server'
export type RenderTargetType = 'client' | 'server'

export type PieceOptions = {
  target: RenderTargetType | 'both'
}

export type PieceMap = { [key: string]: PieceMap | Piece }

declare global {
  interface Window {
    pieces: PieceMap
    platform: PlatformType
  }

  namespace NodeJS {
    interface Global {
      pieces: PieceMap
      platform: PlatformType
    }
  }
}

const platform = typeof window === 'undefined' ? 'server' : 'client'
const self = platform === 'server' ? global : window
if (!self.pieces) {
  self.pieces = {}
  self.platform = platform
}

export type RenderTarget = { renderer: Function; options: PieceOptions }

export class Piece {
  path: string
  private targets: { [key in RenderTargetType]?: RenderTarget }

  constructor(
    name: string,
    props: { renderer: Function; options: PieceOptions }
  ) {
    this.path = name.replace(/\|/g, '.')
    this.targets = {}

    const { target } = props.options

    if (target === 'both') {
      this.targets['client'] = props
      this.targets['server'] = props
    } else {
      this.targets[target] = props
    }
  }

  render(): any {
    return this.targets[platform]!.renderer()
  }

  hasTarget(targetType: RenderTargetType | 'both'): boolean {
    if (targetType === 'both') {
      return !!(this.targets['client'] && this.targets['server'])
    }
    return !!this.targets[targetType]
  }

  merge(piece: Piece): void {
    Object.keys(piece.targets).forEach(targetType => {
      const target = this.targets[targetType as PlatformType]
      if (target) {
        throw new Error(
          'Duplicate definition for the same piece with the same target'
        )
      }

      this.targets[targetType as PlatformType] =
        piece.targets[targetType as PlatformType]
    })
  }

  register(): void {
    const addedPiece = Piece.get(this.path)
    if (addedPiece) {
      return addedPiece.merge(this)
    }

    return Piece.set(this)
  }

  static set(piece: Piece): void {
    dotProp.set(self.pieces, piece.path, piece)
  }

  static get(path: string): Piece | null {
    return dotProp.get(self.pieces, path)
  }
}
