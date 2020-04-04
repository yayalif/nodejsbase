
var http = require('http')
var url = require('url')
var path = require('path')

var resIndex = require('./resIndex.js')
var resImage = require('./resImage.js')
var resDefault = require('./resDefault.js')
var resStatic = require('./resStatic.js')
var resUploadImg = require('./resUploadImg.js')
var socket = require('socket.io')
var render = require('./render')
var defaultIndex = require('./defaultIndex.js')
var fs = require('fs')

var app = http.createServer(function (req, res) {
  var pathname = decodeURI(url.parse(req.url).pathname)
  var extname = path.extname(pathname)
  extname ? extname.slice(1) : ''
  res.render = render


  switch (pathname) {
    case '/': defaultIndex(res)
      break;
    case '/index': resIndex(res)
      break;
    case '/favicon.ico': return
    case extname.length > 0: resStatic(req, res)
      break
    default: resDefault(req, res)
      break
  }

}).listen(3000, '127.0.0.1')

io = socket.listen(app)
var filePath = __dirname + '/' + 'communication.txt'
io.sockets.on('connection', function (socket) {// 监听客户端连接
  console.log('有一位用户上线了')
  var message = fs.readFileSync(filePath, 'utf8')
  // 监听change_from_server消息
  socket.emit('change_from_server', { msg: message })
  socket.on('success', function (data) { // 监听success消息
    console.log(data.msg)
  })
  socket.on('data', function (data) {
    console.log(data, '这个客户端传递的数据')
    fs.writeFile(filePath, data, function () {
      socket.emit('change_from_server', { msg: data.msg, client: data.client })
    })
    
  })
  
})
console.log('server socket.io running at http://127.0.0.1')