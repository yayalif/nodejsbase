
var http = require('http')
var url = require('url')
var path = require('path')

var resIndex = require('./resIndex.js')
var resImage = require('./resImage.js')
var resDefault = require('./resDefault.js')
var resStatic = require('./resStatic.js')
var resUploadImg = require('./resUploadImg.js')
var session = require('./session')

var app = http.createServer(function (req, res) {
  global.sessionLib = session.start(req, res)

  var pathname = url.parse(req.url).pathname
  var extname = path.extname(pathname)
  extname ? extname.slice(1) : ''
  // console.log(req)

  switch (pathname) {
    case '/index':
      resIndex(res)
      break;
    case '/img':
      resImage(res)
      break;
    case '/uploadImg': resUploadImg(req, res)
    case '/favicon.ico': return
    case extname.length > 0: resStatic(req, res)
      break
    default:
      resDefault(req, res)
      break
  }

}).listen(3000, '127.0.0.1')
console.log('server running at http://127.0.0.1')