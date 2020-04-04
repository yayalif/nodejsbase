var AdapterClass = require('./adapter')
exports.encode = function () {
  var encodeModule = arguments[0] ? arguments[0] : null
     , algorithm = arguments[1] ? arguments[1] : null
     , enstring = arguments[2] ? arguments[2] : ''
     , returnType = arguments[3] ? arguments[3] : ''
     , encodeKey = arguments[4] ? arguments[4] : ''
     , encodeType = arguments[5] ? arguments[5] : ''
  var Adapter = new AdapterClass()
  return Adapter.encode(encodeModule, algorithm, enstring,
      returnType, encodeKey, encodeType);
}
exports.decode = function () {
  var encodeModule = arguments[0] ? arguments[0] : null,
    algorithm = arguments[1] ? arguments[1] : null,
    enstring = arguments[2] ? arguments[2] : '',
    returnType = arguments[3] ? arguments[3] : '',
    decodeKey = arguments[4] ? arguments[4] : '',
    encodeType = arguments[5] ? arguments[5] : ''
  var Adapter = new AdapterClass()
  return Adapter.decode(encodeModule, algorithm, enstring,
    returnType, decodeKey, encodeType);
}