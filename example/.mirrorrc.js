const fs = require('fs')
const path = require('path')

module.exports = {
  pieces: fs
    .readdirSync(path.resolve('example/components'))
    .map(fileName => path.resolve('example/components', fileName)),
  enableSSR: true,
}
