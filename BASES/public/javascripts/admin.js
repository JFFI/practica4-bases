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
  });
});