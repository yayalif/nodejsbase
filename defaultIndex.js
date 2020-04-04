var fs = require('fs')
module.exports = function (res) {
  res.writeHead(200, {'content-type': 'text/html'})
  var pageIndex = fs.readFileSync('./appClientSocketHtml.html')
  res.end(pageIndex)  
}