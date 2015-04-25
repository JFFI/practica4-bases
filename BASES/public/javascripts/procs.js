$(function () {
    $(document).ready(function () {
      
      var socket = io();

      $('#myForm').submit(function(){
        socket.emit('kill');
        return false;
      });
  });
});
