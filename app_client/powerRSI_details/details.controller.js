(function (){

  angular
    .module('loc8rApp')
    .controller('detailsCtrl', detailsCtrl);

    detailsCtrl.$inject = ['$routeParams', '$interval', 'powerRSI_Data'];
    function detailsCtrl ($routeParams, $interval, powerRSI_Data) {
      var vm = this;

      powerRSI_Data.details_data($routeParams.symbolid)
        .success(function(data) {

          vm.data = {
            symbol: $routeParams.symbolid,
            active_trades: data.active_trades,
            backtest_data: data.backtest_data,
            daily_data: data.daily_data,
            intraday_data: data.intraday_data,
            spreads: data.spreads
          };

          chart = new Highcharts.Chart({
            chart: {
                renderTo: 'win_loss_chart',
                type: 'pie',
                height: 250
            },
            title: {
                text: 'Winning Trades vs. Losing Trades'
            },
            // yAxis: {
            //     title: {
            //         text: 'Total percent market share'
            //     }
            // },
            plotOptions: {
                pie: {
                    shadow: false,
                    // colors: ["#90ed7d", "#f15c80"]
                    colors: ["#90ed7d", "#f45b5b"]
                    // ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", 
                    //  "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
                }
            },
            tooltip: {
                formatter: function() {
                  var tooltip_str = '<b>Total Trades</b>: ' + data['backtest_data']['total_trades'] + '<br>';
                  tooltip_str = tooltip_str + '<b>'+ this.point.name +'</b>: '+ this.y +'<br>';
                  tooltip_str = tooltip_str + '<b>Winning Percent</b>: ' + data['backtest_data']['winning_pct'] + '%<br>';
                  tooltip_str = tooltip_str + '<b>Average Days In Trade</b>: ' + data['backtest_data']['mean_trade_days'];


                  // return '<b>'+ this.point.name +'</b>: '+ this.y +'';
                  return tooltip_str;
                }
            },
            series: [{
                name: 'Browsers',
                data: data['backtest_data']['trades_data'],
                // data: [["Winning Trades",89],["Loosing Trades",4]],
                // size: '50%',
                size: '95%',
                innerSize: '90%',
                showInLegend:true,
                dataLabels: { enabled: false }
            }]
          });

          Highcharts.chart('mean_gains_chart', {
            chart: {
                type: 'column',
                inverted: true,
                height: 250
            },
            title: {
                text: 'Average Returns'
            },
            // subtitle: {
            //     text: 'Observed in Vik i Sogn, Norway, 2017'
            // },
            xAxis: {
                categories: ['Avg Winning Return', 'Avg Return', 'Avg Losing Return']
            },
            yAxis: {
                title: {
                    text: 'Average % Return'
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            colors: ["#90ed7d",  "#7cb5ec" ,"#f45b5b"],
            //     // ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", 
            //     //  "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
            plotOptions: {
              column: {
                colorByPoint: true
              },
              columnrange: {
                  dataLabels: {
                      enabled: true,
                      format: '{y}%'
                  }
              },
            },
            legend: {
                enabled: false
            },
            series: [{
                // name: 'Return',
                data: data['backtest_data']['returns_data'],
                // data: [
                //     [1.74],
                //     [1.58],
                //     [-2.04]
                // ]
            }]

          });          


        })
        .error(function (e) {
          console.log(e)
        });

      // console.log(vm.data['backtest_data']['returns_data'])
      // console.log(details_data);
      // console.log(details_data);


        // **********


  // backtest_data":{"returns_data":[[6.93],[-11.43],[5.05]],"trades_data




      // **********


    }

})();