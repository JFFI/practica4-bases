$(function () {
    $(document).ready(function () {
      
      var socket = io();
      $('#myForm2').submit(function(){
        socket.emit('register',{'dpi':$('#rdpi').val(),'nombre':$('#rnombre').val(),'tel':$('#rtel').val()});
        return false;
      });
  });
});
