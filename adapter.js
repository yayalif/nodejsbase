var util = require('util')
var Target = require('./target')


function  Adapter() {
  Target.call(this)
  this.encode = function() {
    var encodeModule = arguments[0] ? arguments[0] : null,
       algorithm = arguments[1] ? arguments[1] : null,
       enstring = arguments[2] ? arguments[2] : '',
       returnType = arguments[2] ? arguments[2] : null,
       encodeKey = arguments[4] ? arguments[4] : '',
       encodeType = arguments[5] ? arguments[5] : '',
        AdapteeClass = require('./adaptee_class/' + encodeModule),
        adapteeObj = new AdapteeClass()
     return adapteeObj.encode(algorithm, enstring,
       returnType, encodeKey, encodeType);
  }
  this.decode = function () {
      var encodeModule = arguments[0] ? arguments[0] : null,
        algorithm = arguments[1] ? arguments[1] : null,
        enstring = arguments[2] ? arguments[2] : '',
        returnType = arguments[3] ? arguments[3] : '',
        decodeKey = arguments[4] ? arguments[4] : '',
        encodeType = arguments[5] ? arguments[5] : '',
        AdapteeClass = require('./adaptee_class/' + encodeModule),
        adapteeObj = new AdapteeClass()

        
      return adapteeObj.decode(algorithm, enstring,
        returnType, decodeKey, encodeType);
  }
}
util.inherits(Adapter, Target)
module.exports = Adapter