var url = require('url')
var querystring = require('querystring')

module.exports = function (req, res) {
  var method = url.parse(req.method).pathname

  switch (method) {
    case 'GET': getResponse(req, res)
    break;
    case 'POST': postResponse(req, res)
  }
}
function getResponse(req, res) {
  var pathname = url.parse(req.url).pathname
  var paramStr = url.parse(req.url).query
  // var param = querystring.parse(paramStr)
  req.setEncoding('utf8')
  res.setHeader('content-type', 'text/plain')
   res.end('get 请求, pathname = ' + pathname + ', param = ' + paramStr)
}
function postResponse(req, res) {
  let postData = ''
  req.setEncoding('utf8')
  
  req.addListener('data', function (dataChunk) {
    postData += dataChunk
  })
  req.addListener('end', function () {
    let param = querystring.parse(postData)
    var pathname = url.parse(req.url).pathname
    res.setHeader('content-type', 'text/plain')
    res.end('post 请求, pathname = ' + pathname)
    console.log('post参数', param, pathname)
  })
}