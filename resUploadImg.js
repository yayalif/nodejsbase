var url = require('url')
var querystring = require('querystring')
var formidable = require('formidable')
var fs = require('fs')
var render = require('./render.js')


module.exports = function (req, res) {
  res.render = render
  var filePath = __dirname + '/' + url.parse('show_image.html').pathname
  // var indexPage = fs.readFileSync(filePath)
  var form = new formidable.IncomingForm()
  form.uploadDir = 'static';
  /**执行form表单数据解析，获取其中的post数据 */
  form.parse(req, function(error, fields, files) {
    console.log(files.image)
    var filename = files.image.name
    fs.renameSync(files.image.path, __dirname + '/static/' + filename)
    res.render(res, './show_image.jade', { 'imageUrl': '/static/' + filename })
  })
}
