import { h } from 'preact'
import { addPiece } from '../../src/lib/addPiece'

const bigArr = []
for (let i = 0; i < 1000; i++) {
  bigArr.push(i)
}

addPiece('Bar', () => (
  <div onClick={() => alert('a')} style="background: magenta;">
    <h1>bar</h1>
    <div>
      {bigArr.map(i => (
        <p>{i}</p>
      ))}
    </div>
  </div>
))
