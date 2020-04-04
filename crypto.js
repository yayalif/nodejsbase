// 获取node.js的原生模块crypto
var crypto = require('crypto')



/** hash编码 */ 
// var hash = crypto.createHash('md5')
// 调用crypto模块的hash编码
var hash = crypto.createHash('sha1')

// 应用hash编码方式实现加密
// hash.update(new Buffer('ayay', 'binary'))
hash.update('ayay')
var encode = hash.digest('hex')

console.log('hash code', encode)

/** HMAC */
var hmac = crypto.createHmac('md5', 'dan')

hmac.update(new Buffer('ayay', 'binary'))
var encode = hmac.digest('hex')

console.log('hmac data:' + encode)

/** Ciper */