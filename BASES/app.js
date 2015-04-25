
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
  socket.on('register',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('INSERT INTO CLIENTE VALUES('+data['dpi'] + ','+data['nombre']+','+data['tel']+')').on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('abus',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('INSERT INTO BUS VALUES('+data['bus'] + ','+data['tipo']+')').on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('bbus',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('DELETE FROM BUS WHERE BUS ='+data['bus']).on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('cbus',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('UPDATE BUS SET TIPO_BUS = '+data['tipo']+' WHERE BUS ='+data['bus']).on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('aruta',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('INSERT INTO RUTA VALUES('+data['ruta']+','+data['nombre']+')').on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('bruta',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('DELETE FROM PARTE WHERE RUTA = '+data['ruta']).on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.query('DELETE FROM RUTA WHERE RUTA = '+data['ruta']).on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('cruta',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('INSERT INTO PARTE VALUES ('+data['ruta']+','+data['punto']+','+data['dist']+')').on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('aasig',function(data){
    var now = new Date();
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('INSERT INTO ASIGNACION VALUES ('+data['bus']+',\''+now.getFullYear() +'/' + (parseInt(now.getMonth())+1) + '/' + now.getDate() +'\','+data['ruta']+')').on
    console.log(now);
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('ares',function(data){
    var now = new Date();
    var totcost = 0;
    var contador = 0;
    var whoareyou="";
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    
    client.query('SELECT COUNT(*) AS NUM FROM RESERVACION').on
    ('result',function(result){
      result.on(
	'row',function(row){
	  contador = parseInt(row.NUM);
	  console.log(row.NUM);
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
	client.query('SELECT * FROM PARTE WHERE RUTA = '+data['ruta'] +' AND PUNTO = '+data['destino']).on
	('result',function(result){
	  result.on(
	    'row',function(row){
	      totcost = parseInt(row.DISTANCIA);
	    }
	  ).on
	  ('error',function(err) { 
	    console.log('Resultor: ' + inspect(err)); 
	  }).on
	  ('end',function(info) { 
	    console.log('Resultished successfully'); 
	    client.query('SELECT * FROM PARTE WHERE RUTA = '+data['ruta'] +' AND PUNTO = '+data['origen']).on
	    ('result',function(result){
	      result.on(
		'row',function(row){
		  totcost = totcost - parseInt(row.DISTANCIA);
		  if(totcost < 0){
		    totcost = totcost * -1;
		  }
		  totcost = totcost * 100;
		  console.log(totcost);
		}
	      ).on
	      ('error',function(err) { 
		console.log('Resultor: ' + inspect(err)); 
	      }).on
	      ('end',function(info) { 
		console.log('Resultished successfully'); 
		client.query('INSERT INTO RESERVACION VALUES ('+contador+',\''+now.getFullYear() +'/' + (parseInt(now.getMonth())+1) + '/' + now.getDate() +'\',0,'+totcost + ','+data['ruta']+','+ data['origen'] +','+data['destino']+','+data['cliente']+')').on
		console.log('INSERT INTO RESERVACION VALUES ('+contador+',\''+now.getFullYear() +'/' + (parseInt(now.getMonth())+1) + '/' + now.getDate() +'\',0,'+totcost + ','+data['ruta']+','+ data['origen'] +','+data['destino']+','+whoareyou+')');
		('result',function(result){
		  result.on
		  ('error',function(err) { 
		    console.log('Resultor: ' + inspect(err)); 
		  }).on
		  ('end',function(info) { 
		    console.log('Resultished successfully'); 
		  });
		});
	      }); 
	    });
	  }); 
	});
      });
    });
    client.end();
  });
  socket.on('cres',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('UPDATE RESERVACION SET PAGADA = 1 WHERE RESERVACION ='+data['res']).on
    ('result',function(result){
      result.on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully'); 
      });
    });
    client.end();
  });
  socket.on('mbus',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('SELECT * FROM (BUS NATURAL JOIN TIPO_BUS)').on
    ('result',function(result){
      var cadenita = "";
      result.on(
	'row',function(row){
	  cadenita = cadenita + row.BUS + ' ' + row.NOMBRE + ' <br>'; 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmbus', {'todo':cadenita});
      });
    });
    client.end();
  });
  socket.on('mparte',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('SELECT * FROM (PARTE NATURAL JOIN PUNTO)').on
    ('result',function(result){
      var cadenita = "";
      result.on(
	'row',function(row){
	  cadenita = cadenita + row.RUTA + ' ' + row.NOMBRE + ' ' + row.DISTANCIA +' <br>'; 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmparte', {'todo':cadenita});
      });
    });
    client.end();
  });
  socket.on('mruta',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('SELECT * FROM RUTA').on
    ('result',function(result){
      var cadenita = "";
      result.on(
	'row',function(row){
	  cadenita = cadenita + row.RUTA + ' ' + row.NOMBRE + ' <br>'; 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmruta', {'todo':cadenita});
      });
    });
    client.end();
  });
  socket.on('masig',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('SELECT * FROM ASIGNACION').on
    ('result',function(result){
      var cadenita = "";
      result.on(
	'row',function(row){
	  cadenita = cadenita + row.RUTA + ' ' + row.BUS + ' '+ row.FECHA + ' <br>'; 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmasig', {'todo':cadenita});
      });
    });
    client.end();
  });
  socket.on('mres',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('SELECT * FROM RESERVACION WHERE CLIENTE = '+data['cliente']).on
    ('result',function(result){
      var cadenita = "";
      result.on(
	'row',function(row){
	  cadenita = cadenita + row.RESERVACION + ' ' + row.RUTA + ' '+ row.CLIENTE + ' '+row.FECHA + ' '+row.PAGADA + ' '+row.TOTAL + ' <br>'; 
	 
	  client.query('SELECT * FROM PARTE WHERE RUTA = '+ row.RUTA).on
	  ('result',function(result){
	     var mini = "";
	    result.on(
	      'row',function(row){
		mini = mini + row.DISTANCIA + ' <br>'; 
	      }
	    ).on
	    ('error',function(err) { 
	      console.log('Resultor: ' + inspect(err)); 
	    }).on
	    ('end',function(info) { 
	      console.log('Resultished successfully');
	      cadenita = cadenita + mini + '<br>';
	    });
	  });
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmres', {'todo':cadenita});
      });
    });
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
