module.exports = filePath => {
  const link = document.createElement('a')
  link.href = filePath
  link.download = 'save'
  link.click()
}
