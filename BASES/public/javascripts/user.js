$(function () {
    $(document).ready(function () {
      
      var socket = io();

     
      
      $('#ares').submit(function(){
        socket.emit('ares',{'ruta':$('#aresruta').val(),'origen':$('#aresori').val(),'destino':$('#aresdes').val(),'cliente':'\''+$('#arescli').val()+'\''});
        return false;
      });
      $('#cres').submit(function(){
        socket.emit('cres',{'res':$('#cresres').val()});
        return false;
      });
      $('#mparte').submit(function(){
	socket.emit('mparte');
	return false;
      });
      $('#mres').submit(function(){
	socket.emit('mres',{'cliente':'\''+$('#mrescli').val()+'\''});
	return false;
      });
      socket.on('rmparte',function(data){
	var node = document.getElementById('node-id');
        node.innerHTML = data['todo'];
      });
      socket.on('rmres',function(data){
	var node = document.getElementById('node-id2');
        node.innerHTML = data['todo'];
      });
    });
});