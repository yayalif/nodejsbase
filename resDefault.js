var url = require('url')
var querystring = require('querystring')
var jade = require('jade')
var render = require('./render.js')



module.exports = function (req, res) {
  var method = url.parse(req.method).pathname
  res.render = render

  switch (method) {
    case 'GET': getResponseUseJade(req, res)
    break;
    // case 'POST': postResponse(req, res)
    case 'POST': postResponseUseJade(req, res)
  }
}
function resRender(template, options) {
  var str = require('fs').readFileSync(template, 'utf8')
  // 获取 jade 模板编译处理函数
  var fn = jade.compile(str, {filename: template, pretty: true})
  // 调用 fn 函数，将 jade 模板转化为 html 文件数据字符
  var page = fn(options)
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(page)
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
    console.log('post参数', param, pathname)
  })
}
function postResponseUseJade(req, res) {
  res.render('./index.jade', {'user': 'yayaf'})
}
function getResponseUseJade(req, res) {
  res.render('./index.jade', {'user': 'yayaf'})
}
