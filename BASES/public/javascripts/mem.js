
$(function () {
    $(document).ready(function () {
      
      var socket = io.connect();
      socket.on('memoria',function(data){
        var node = document.getElementById('node-id');
        
        /*while(node.hasChildren()) {
          node.Children.remove();
        }*/
        //node.clear();
        node.innerHTML = "Total :"+parseInt(data['total'])+"MB<br>"+"Disponible :"+parseInt(data['libre'])+"MB<br>"+"Utilizacion :"+(((parseInt(data['total']) - parseInt(data['libre']))/parseInt(data['total']))*1000/10).toFixed(2)+"%";
        /*
        var newNode = document.createElement('p')
        newNode.appendChild(document.createTextNode("Total:"+parseInt(data['total'])));
        node.appendChild(document.createTextNode("Total:"+parseInt(data['total'])));
        var newNode2 = document.createElement('p')
        newNode2.appendChild(document.createTextNode("Disponible:"+parseInt(data['usada'])));
        node.appendChild(newNode2);
        var newNode3 = document.createElement('p')
        newNode3.appendChild(document.createTextNode("Utilizacion:"+(((parseInt(data['total']) - parseInt(data['usada']))/parseInt(data['total']))*1000/10).toFixed(2)+"%"));
        node.appendChild(newNode3);*/
      });
        
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });


        $('#container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        socket.on('memoria',function(data){
                          var x = (new Date()).getTime(), // current time
                                  y = (((parseInt(data['total']) - parseInt(data['libre']))/parseInt(data['total']))*1000/10);
                              series.addPoint([x, y], true, true);
                        });
                    }
                }
            },
            title: {
                text: 'Datos de Memoria'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min:0, max:100
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Utilizacion de la Memoria',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -10; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: 0
                        });
                    }
                    return data;
                }())
            }]
        });
    });
});
