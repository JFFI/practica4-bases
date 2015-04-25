
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
      var cadenita = "<table><tr><th>BUS</th><th>TIPO</th></tr>";
      result.on(
	'row',function(row){
	  cadenita = cadenita + '<tr><td>'+row.BUS + '</td><td>' + row.NOMBRE + '</td></tr>'; 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmbus', {'todo':cadenita+'</table>'});
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
      var cadenita = "<tr><th>RUTA</th><th>NOMBRE</th><th>DISTANCIA</th></tr>";
      result.on(
	'row',function(row){
	  cadenita = cadenita + '<tr><td>'+row.RUTA + '</td><td>' + row.NOMBRE + '</td><td> ' + row.DISTANCIA +' </td></tr>'; 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmparte', {'todo':'<table>'+cadenita+'</table>'});
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
      var cadenita = "<tr><th>RUTA</th><th>NOMBRE</th></tr>";
      result.on(
	'row',function(row){
	  cadenita = cadenita +'<tr><td>'+ row.RUTA + '</td><td>' + row.NOMBRE + '</td></tr>'; 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmruta', {'todo':'<table>'+cadenita+'</table>'});
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
      var cadenita = "<tr><th>RUTA</th><th>BUS</th><th>FECHA</th></tr>";
      result.on(
	'row',function(row){
	  cadenita = cadenita +'<tr><td>'+ row.RUTA + '</td><td>' + row.BUS + '</td><td>'+ row.FECHA + '</td></tr>'; 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmasig', {'todo':'<table>'+cadenita+'</table>'});
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
      var cadenita = "<tr><th>RESERVACION</th><th>RUTA</th><th>CLIENTE</th><th>FECHA</th><th>PAGADA</th><th>TOTAL</th></tr>";
      result.on(
	'row',function(row){
	  cadenita = cadenita +'<tr><td>'+ row.RESERVACION + '</td><td>' + row.RUTA + '</td><td>'+ row.CLIENTE + '</td><td>'+row.FECHA + '</td><td>'+row.PAGADA + '</td><td>'+row.TOTAL + '</td></tr>'; 
	 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmres', {'todo':'<table>'+cadenita+'</table>'});
      });
    });
    client.end();
  });
  /*socket.on('sres',function(data){
    var client = new Client();
    client.connect({
      host: '127.0.0.1'
      ,user: 'root'
      ,password: 'julio123'
      ,db: 'julio'
    });
    client.query('SELECT * FROM RESERVACION R, (SELECT P.DISTANCIA XO.NOMBRE FROM PARTE P,RESERVACION RO, PUNTO XO WHERE P.RUTA = RO.RUTA AND RO.RESERVACION = '+data['res']+' AND XO.PUNTO = P.PUNTO AND P.DISTANCIA >= RO.ORIGEN AND P.DISTANCIA <= RO.DESTINO) A,() B WHERE CLIENTE = '+data['cliente']).on
    ('result',function(result){
      var cadenita = "<tr><th>RESERVACION</th><th>RUTA</th><th>CLIENTE</th><th>FECHA</th><th>PAGADA</th><th>TOTAL</th></tr>";
      result.on(
	'row',function(row){
	  cadenita = cadenita +'<tr><td>'+ row.RESERVACION + '</td><td>' + row.RUTA + '</td><td>'+ row.CLIENTE + '</td><td>'+row.FECHA + '</td><td>'+row.PAGADA + '</td><td>'+row.TOTAL + '</td></tr>'; 
	 
	}
      ).on
      ('error',function(err) { 
	console.log('Resultor: ' + inspect(err)); 
      }).on
      ('end',function(info) { 
	console.log('Resultished successfully');
	socket.emit('rmres', {'todo':'<table>'+cadenita+'</table>'});
      });
    });
    client.end();
  });
});*/
