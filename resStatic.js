var url = require('url')
var fs = require('fs')


module.exports = function(req, res) {
  var pathname = url.parse(req.url).pathname
  var filePath = __dirname + '/static' + pathname
  console.log(filePath, pathname, '静态文件地址')
  var CACHE_TIME = 60*60*24*365
  fs.exists(filePath, function(exists){
    if (!exists) {
      res.writeHead(404, {'content-type': 'text/plain'})
      res.write('this request url' + pathname + 'was not found on this server')
      res.end()
    } else {
      var fileInfo = fs.statSync(filePath)
      var lastModified = fileInfo.mtime.toUTCString()

      /**设置缓存 */
      var expires = new Date()
      expires.setTime(expires.getTime() + CACHE_TIME*1000)
      res.setHeader('expires', expires.toUTCString())
      res.setHeader('cache-control', 'max-age=' + CACHE_TIME)
       
      /*判断是否超过缓存时间 */
      if (req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']){
        res.writeHead(304, 'Not Modified')
        res.end()
      } else {
        var pointPosition = pathname.lastIndexOf('.')
        var mmieString = pathname.substring(pointPosition+1)
        var mmieType
        switch(mmieString) {
          case 'css': mmieType = 'text/css'
          break
          case 'png':mmieType = 'image/png'
          break
          case 'img':mmieType = 'image/img'
          break
          case 'jpg': mmieType = 'image/jpg'
          break
          default: mmieType = 'text/plain'
        }
        fs.readFile(filePath, 'binary', function(err, file) {
          if (err) {
            res.writeHead(500, {'content-type': 'text/plain'})
            res.end(err)
          } else {
            res.writeHead(200, {'content-type': mmieType})
            res.write(file, 'binary')
            res.end()
          }
        })
      }
    }
  })

}
