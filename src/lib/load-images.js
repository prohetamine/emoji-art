module.exports = src =>
  new Promise(
    resolve => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.src = src
  })
