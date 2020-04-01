
var http = require('http')
var url = require('url')

var resIndex = require('./resIndex.js')
var resImage = require('./resImage.js')
var resDefault = require('./resDefault.js')

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname
  // console.log(req)

  switch (pathname) {
    case '/index':
      resIndex(res)
      break;
    case '/img':
      resImage(res)
      break;
    case '/favicon.ico': return
    default:
      resDefault(req, res)
      break
  }

}).listen(3000, '127.0.0.1')
console.log('server running at http://127.0.0.1')