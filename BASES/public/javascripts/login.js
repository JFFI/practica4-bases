$(function () {
    $(document).ready(function () {
      
      var socket = io();

      /*
       * $('#myForm').submit(function(){
        socket.emit('login',{'dpi':$('#dpi').val()});
        return false;
      });
    */
      $('#myForm2').submit(function(){
        socket.emit('register');
        return false;
      });
  });
});
