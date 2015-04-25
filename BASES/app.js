
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer()
  , http = require('http')
  , io = require('socket.io').listen(app);

  var inspect = require('util').inspect;
  var Client = require('mariasql');

  

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', { title: 'Bienvenido' })
});
app.get('/admin', function(req,res){
  res.render('admin',{title:'Administrador'});
});
app.get('/user', function(req,res){
  res.render('user',{title:'Usuario'});
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
app.use(express.bodyParser());
app.post('/user',function(req,res){
  if(req.body.user.dpi == 'admin'){
    res.render('admin',{title:'Administrador'});
  }else{
    var client = new Client();
    var funciono = 0;
    client.connect
    (
      {
	host: '127.0.0.1'
	,user: 'root'
	,password: 'julio123'
	,db: 'julio'
      }
    );
    client.query('SELECT * FROM CLIENTE WHERE DPI = '+req.body.user.dpi).on
    (
      'result', 
     function(result) 
     {
       result.on
       (
	 'row', 
	function(row) { 
	    res.render('user',{title:row.NOMBRE});
	    funciono = 1;
	  } 
       ).on
       (
	 'error', 
	function(err) { console.log('Resultor: ' + inspect(err)); 
    }
       ).on
       (
	 'end', 
	function(info) { console.log('Resultished successfully'); }
       );
     }
    ).on
    (
      'end', 
     function() { console.log('Doneh all results'); }
    );
    client.end();
  }
});
io.on('connection', function(socket){
  socket.on('login', function(data){
    /*console.log('asesinando: ' + data['pid']);
     *    require('shelljs/global');
     *    exec('kill '+data['pid']);*/
    var client = new Client();
    client.connect
    (
      {
	host: '127.0.0.1'
	,user: 'root'
	,password: 'julio123'
	,db: 'julio'
      }
    );
    client.on('connect', function() { console.log('Clientnected'); } 
    ).on(
      'error', function(err) { console.log('Clientor: ' + err); }
    ).on
    (
      'close', function(hadError) { console.log('Clientsed'); }
    );
    client.query('SELECT * FROM CLIENTE WHERE DPI = '+data['dpi']).on
    (
      'result', 
     function(result) 
     {
       result.on
       (
	 'row', 
	function(row) { console.log('Result: ' + inspect(row)); }
       ).on
       (
	 'error', 
	function(err) { console.log('SELECT * FROM CLIENTE WHERE DPI = '+data['dpi']);console.log('Resultor: ' + inspect(err)); }
       ).on
       (
	 'end', 
	function(info) { console.log('Resultished successfully'); }
       );
     }
    ).on
    (
      'end', 
     function() { console.log('Doneh all results'); }
    );
    
    client.end();
  });
  socket.on('register',function(data){
    var client = new Client();
    client.connect
    (
      {
	host: '127.0.0.1'
	,user: 'root'
	,password: 'julio123'
	,db: 'julio'
      }
    );
    client.on('connect', function() { console.log('Clientnected'); } 
    ).on(
      'error', function(err) { console.log('Clientor: ' + err); }
    ).on
    (
      'close', function(hadError) { console.log('Clientsed'); }
    );
    client.query('SELECT * FROM CLIENTE WHERE DPI = 2013202').on
    (
      'result', 
     function(result) 
     {
       result.on
       (
	 'row', 
	function(row) { console.log('Result: ' + inspect(row)); }
       ).on
       (
	 'error', 
	function(err) { console.log('Resultor: ' + inspect(err)); }
       ).on
       (
	 'end', 
	function(info) { console.log('Resultished successfully'); }
       );
     }
    ).on
    (
      'end', 
     function() { console.log('Doneh all results'); }
    );
    
    client.end();
  });
  socket.on('abus',function(data){
    var client = new Client();
    client.connect
    (
      {
	host: '127.0.0.1'
	,user: 'root'
	,password: 'julio123'
	,db: 'julio'
      }
    );
    client.query('INSERT INTO BUS VALUES('+data['bus'] + ','+data['tipo']+')').on
    (
      'result', 
     function(result) 
     {
       result.on
       (
	 'error', 
	function(err) { console.log('Resultor: ' + inspect(err)); }
       ).on
       (
	 'end', 
	function(info) { console.log('Resultished successfully'); }
       );
     }
    );
    client.end();
  });
});

/*setInterval(function(){
var fs = require('fs');
var numeros = fs.readFileSync("/proc/meminfo","UTF-8");

numeros = numeros.substr(0,55);
numero1 = numeros.substring(17,24);
numero2 = numeros.substring(38,52);
numero1 = numero1.trim();
numero2 = numero2.trim();

require('shelljs/global');
var cpulog = 0.0;

var totproc = 0;
var sproc = 0;
var rproc = 0;
var zproc = 0;
var dproc = 0;
var listaproc = "<table><tr><th>PID</th><th>Nombre</th><th>Estado</th><th>UsoCPU</th><th>UsoMem</th><th>Usuario</th></tr>";
var procesos = exec('ps -ax -o pid,%cpu',{silent:true}).output;
var lineas = procesos.split('\n');

for(var i = 1; i < lineas.length-1;i++){
  try{
    var leido = fs.readFileSync("/proc/"+lineas[i].substr(0,5).trim()+"/status").toString();
    
    var memlog = 0;
    try{
      var leido2 = fs.readFileSync("/proc/"+lineas[i].substr(0,5).trim()+"/smaps").toString();
      for(var i2 = 2; i2 < leido2.split('\n').length;i2=i2+16){
	memlog = memlog + parseInt(leido2.split('\n')[i2].substr(5,20));
      }
    }catch(Exception){
    }
    
    //listaproc = listaproc + "<input type=\"radio\" name = \"l\" id =\"li"+lineas[i].substr(0,5).trim()+"\" value = \""+lineas[i].substr(0,5).trim()+"\">" + lineas[i].substr(0,5)+ cosa.split('\n')[0].substr(6)+'\t' + cosa.split('\n')[1].substr(7,1)+ "</input><br>";
    listaproc = listaproc + "<tr>";
    listaproc = listaproc + "<td><input type=\"radio\" name = \"l\" id =\"li"+lineas[i].substr(0,5).trim()+"\" value = \""+lineas[i].substr(0,5).trim()+"\">" + lineas[i].substr(0,5)+"</input></td>";
    listaproc = listaproc + "<td>"+leido.split('\n')[0].substr(6)+'\t'+"</td>";
    listaproc = listaproc + "<td>"+leido.split('\n')[1].substr(7,1)+"</td>";
    listaproc = listaproc + "<td>"+parseFloat(lineas[i].substr(6,4)).toFixed(2)+"%</td>";
    listaproc = listaproc + "<td>"+(memlog/numero1*100).toFixed(2)+"%</td>";
    switch(leido.split('\n')[7].substr(5)){
      case "0	0	0	0":
      listaproc = listaproc + "<td>root</td>";
      break;
      case "1000	1000	1000	1000":
	listaproc = listaproc + "<td>user_julio</td>";
	break;
      case "102	102	102	102":
	listaproc = listaproc + "<td>message+</td>";
	break;
      case "101	101	101	101":
	listaproc = listaproc + "<td>syslog</td>";
	break;
      case "0	1	1	1":
	listaproc = listaproc + "<td>daemon</td>";
	break;
	
      default:	
	listaproc = listaproc + "<td>no_se</td>";
    }
    listaproc = listaproc + "</tr>";
    switch(leido.split('\n')[1].substr(7,1)){
      case 'S':
	sproc = sproc +1;
	break;
      case 'Z':
	zproc = zproc +1;
	break;
      case 'R':
	rproc = rproc +1;
	break;
      case 'D':
	dproc = dproc +1;
	break;
      case 'T':
	dproc = dproc +1;
	break;
      default:
	console.log(cosa.split('\n')[1].substr(7,1));
    }
    cpulog = cpulog + parseFloat(lineas[i].substr(6,4));
    totproc = totproc + 1;
  }catch(Exception){
  }
}
listaproc = listaproc + "</table>";
io.emit('memoria',{'total':(parseFloat(numero1)/1000),'libre':parseFloat(numero2)/1000});
io.emit('cpulog',{'uso':cpulog});
io.emit('listapr',{'lista':listaproc,'totproc':totproc,'rproc':rproc,'sproc':sproc,'zproc':zproc,'dproc':dproc});

},1500);
*/
