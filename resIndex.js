
const url = require('url')
const fs = require('fs')
const render = require('./render.js')

module.exports = function (res) {
  let readPath = __dirname + '/' + url.parse('index.html').pathname
  var indexPage = fs.readFileSync(readPath)
  // res.setHeader('content-type', 'text/html')
  // res.end(indexPage)
  res.render = render
  res.render(res, './index.jade', {
    user: 'yayali'
  })
}