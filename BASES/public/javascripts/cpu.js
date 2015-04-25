$(function () {
    $(document).ready(function () {

    var socket = io.connect();
    socket.on('cpulog',function(data){
    var node = document.getElementById('node-id');
    node.innerHTML = "Utilizacion del CPU :"+parseFloat(data['uso']).toFixed(2)+"%";
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
                        socket.on('cpulog',function(data){
                          var x = (new Date()).getTime(), // current time
                                  y = parseFloat(data['uso']);
                              series.addPoint([x, y], true, true);
                        });
                    }
                }
            },
            title: {
                text: 'Datos de Procesador'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Consumo'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min:0,max:100
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
                name: 'Utilizacion del Procesador',
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
