module.exports = c =>
  (
    hex =>
      hex.length == 1
        ? '0' + hex
        : hex
  )(
    c.toString(16)
  )
