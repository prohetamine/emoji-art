const intToHex = require('./int-to-hex')

module.exports = (r, g, b) =>
  "#" + intToHex(r) + intToHex(g) + intToHex(b)
