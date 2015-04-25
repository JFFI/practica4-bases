var fs = require('fs');
fs.readFile("/proc/meminfo","UTF-8",function(errores,num){
if(!errores){
num = num.substr(0,55);
data1 = num.substring(17,24);
data2 = num.substring(38,52);
data1 = data1.trim();
data2 = data2.trim();
}
console.log(data1);
});

