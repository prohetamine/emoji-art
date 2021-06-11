const files = require.context('./../assets/emoji', true, /\.png$/)
const images = {}

for (let i = 0; i < files.keys().length; i++) {
  images[files.keys()[i]] = files(files.keys()[i]).default
}

 module.exports = images
