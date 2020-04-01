const url = require('url')
const fs = require('fs')
module.exports = function (res) {
  let readPath = __dirname + '/' + url.parse('1.jpg').pathname
  var indexPage = fs.readFileSync(readPath)
  res.setHeader('content-type', 'image/jpg')
  res.end(indexPage)
}