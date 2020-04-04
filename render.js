var jade = require('jade')
module.exports = function(res, template, options) {
  var str = require('fs').readFileSync(template, 'utf8')
  // 获取 jade 模板编译处理函数
  var fn = jade.compile(str, {filename: template, pretty: true})
  // 调用 fn 函数，将 jade 模板转化为 html 文件数据字符
  var page = fn(options)
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(page)
}
