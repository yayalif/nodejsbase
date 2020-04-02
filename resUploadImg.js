var url = require('url')
var querystring = require('querystring')
var formidable = require('formidable')
var fs = require('fs')
var render = require('./render.js')


module.exports = function (req, res) {
  var method = url.parse(req.method).pathname
  req.render = render
  var filePath = __dirname + '/' + url.parse('show_image.html').pathname
  var indexPage = fs.readFileSync(filePath)
  var form = new formidable.IncomingForm()
  /**执行form表单数据解析，获取其中的post数据 */
  form.parse(req, function(error, fields, files){
    console.log(files.image)
    fs.renameSync(files.image.path, __dirname + '/static' + '/test.png')
    // res.writeHead(200, {'Content-Type': 'text/html'})
    // res.end(indexPage)
    req.render('./show_html.jade', {'imageUrl': './static/1.jpg'})
  })
}
