var exports = module.exports;
         
exports.sayHelloInEnglish = function() {
  var fs = require('fs');
  var data1 = fs.readFileSync("/proc/meminfo","UTF-8");
  data1 = data1.substring(17,24);
  data1 = data1.trim();
};
    
exports.sayHelloInSpanish = function() {
  return "Hola";
};
