$(function () {
    $(document).ready(function () {
      
      var socket = io();

      $('#myForm').submit(function(){
        socket.emit('kill', {'pid':$('input:radio:checked').val().trim()});
        return false;
      });
      
      socket.on('listapr',function(data){

        var lista = $('input:radio:checked');
        var nodeo = document.getElementById('contenedor');
        nodeo.innerHTML = data['lista'];
        try{
          var sele = document.getElementById(lista.attr('id'));
          sele.checked = true;
        }catch(Exception){
        }
        //console.log(lista.val()+"_"+lista.attr('name'));
        //lista.prop('checked',true);
          /*try{
            //document.getElementById(lista.attr('id')).prop('checked',true);
          }catch(Exception e){
            console.log("no");
          }*/
        //console.log(seleccionada.attr('name'));
        //seleccionada.prop('checked',true);
        var node = document.getElementById('node-id');
        node.innerHTML = "Total: "+data['totproc']+"<br>"+"En Ejecucion: "+data['rproc']+"<br>"+"Suspendidos: "+data['sproc']+"<br>"+"Detenidos: "+data['dproc']+"<br>"+"Zombie: "+data['zproc'];
      });
  });
});
