const rgb2lab = require('./rgb2lab')

module.exports = (rgbA, rgbB) => {
  const labA = rgb2lab(rgbA)
      , labB = rgb2lab(rgbB)
      , deltaL = labA[0] - labB[0]
      , deltaA = labA[1] - labB[1]
      , deltaB = labA[2] - labB[2]
      , c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2])
      , c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2])
      , deltaC = c1 - c2
      , deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC
      , _deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH)
      , sc = 1.0 + 0.045 * c1
      , sh = 1.0 + 0.015 * c1
      , deltaLKlsl = deltaL / (1.0)
      , deltaCkcsc = deltaC / (sc)
      , deltaHkhsh = _deltaH / (sh)
      , i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh
  return i < 0 ? 0 : Math.sqrt(i)
}
