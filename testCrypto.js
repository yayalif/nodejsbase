var encodeModule = require('./encode_module')

/** encode with hash */
var hashEncodeStr = encodeModule.encode('hash', 'md5', 'yaya', 'hex')
console.log(hashEncodeStr)