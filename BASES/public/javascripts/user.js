$(function () {
    $(document).ready(function () {
      
      var socket = io();

     
      $('#abus').submit(function(){
        socket.emit('abus',{'bus':$('#abusbus').val(),'tipo':$('#abustipo').val()});
        return false;
      });
    
      $('#bbus').submit(function(){
        socket.emit('bbus',{'bus':$('#bbusbus').val()});
        return false;
      });
      $('#cbus').submit(function(){
        socket.emit('cbus',{'bus':$('#cbusbus').val(),'tipo':$('#cbustipo').val()});
        return false;
      });
      $('#aruta').submit(function(){
        socket.emit('aruta',{'ruta':$('#arutaruta').val(),'nombre':'\''+$('#arutanombre').val()+'\''});
        return false;
      });
      $('#bruta').submit(function(){
        socket.emit('bruta',{'ruta':$('#brutaruta').val()});
        return false;
      });
      $('#cruta').submit(function(){
        socket.emit('cruta',{'ruta':$('#crutaruta').val(),'punto':$('#crutapunto').val(),'dist':$('#crutadist').val()});
        return false;
      });
      $('#aasig').submit(function(){
        socket.emit('aasig',{'bus':$('#aasigbus').val(),'ruta':$('#aasigruta').val()});
        return false;
      });
      $('#mbus').submit(function(){
	socket.emit('mbus');
	return false;
      });
      $('#mruta').submit(function(){
	socket.emit('mruta');
	return false;
      });
      $('#masig').submit(function(){
	socket.emit('masig');
	return false;
      });
      
      socket.on('rmbus',function(data){
	var node = document.getElementById('node-id');
        node.innerHTML = data['todo'];
      });
      socket.on('rmruta',function(data){
	var node = document.getElementById('node-id');
        node.innerHTML = data['todo'];
      });
      socket.on('rmasig',function(data){
	var node = document.getElementById('node-id');
        node.innerHTML = data['todo'];
      });
  });
});