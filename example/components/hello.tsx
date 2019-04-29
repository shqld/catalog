import { h } from 'preact'
import { addPiece } from '../../src/lib/addPiece'

addPiece('components|Hello', { target: 'server' }, () => {
  return <h1>Hello from server</h1>
})
addPiece('components|Hello', { target: 'client' }, () => {
  return <h1>Hello from client</h1>
})

addPiece('components|sub|Hello', { target: 'server' }, () => {
  return <h1>Hello from server</h1>
})
