(function (){
  angular
    .module('loc8rApp')
    .service('detailComponents', detailComponents);

  // detailComponents.$inject = ['powerRSI_Data']
  // function detailComponents(powerRSI_Data) {
  function detailComponents() {

    var histTradesSummaryChart = function(total_trades, winning_pct, mean_trade_days, hist_trades_summary_data) {

      hist_trades_summary_chart = new Highcharts.Chart({
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
              var tooltip_str = '<b>Total Trades</b>: ' + total_trades + '<br>';
              tooltip_str = tooltip_str + '<b>'+ this.point.name +'</b>: '+ this.y +'<br>';
              tooltip_str = tooltip_str + '<b>Winning Percent</b>: ' + winning_pct + '%<br>';
              tooltip_str = tooltip_str + '<b>Average Days In Trade</b>: ' + mean_trade_days;
              // var tooltip_str = '<b>Total Trades</b>: ' + data['backtest_data']['total_trades'] + '<br>';
              // tooltip_str = tooltip_str + '<b>'+ this.point.name +'</b>: '+ this.y +'<br>';
              // tooltip_str = tooltip_str + '<b>Winning Percent</b>: ' + data['backtest_data']['winning_pct'] + '%<br>';
              // tooltip_str = tooltip_str + '<b>Average Days In Trade</b>: ' + data['backtest_data']['mean_trade_days'];


              // return '<b>'+ this.point.name +'</b>: '+ this.y +'';
              return tooltip_str;
            }
        },
        series: [{
            name: 'Browsers',
            data: hist_trades_summary_data,
            // data: data['backtest_data']['trades_data'],
            // data: [["Winning Trades",89],["Loosing Trades",4]],
            // size: '50%',
            size: '95%',
            innerSize: '80%',
            showInLegend:true,
            dataLabels: { enabled: false }
        }]
      });

      return hist_trades_summary_chart;
    };

    var histReturnsSummaryChart = function(hist_returns_summary_data) {

      hist_returns_summary_chart = Highcharts.chart('mean_gains_chart', {
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
            // data: data['backtest_data']['returns_data'],
            data: hist_returns_summary_data
        }]
      }); 
      
      return hist_returns_summary_chart;

    };

    var dailyOHLCChart = function(chart_symbol, ohlc_data, volume_data) {
      var groupingUnits = 
        [
          ['week', [1]], 
          ['month', [1, 2, 3, 4, 6]]
        ];

      var daily_ohlc_chart = Highcharts.stockChart('daily_ohlc_chart', 
        {
          rangeSelector: 
          {
            selected: 1
          },
          title: 
          {
            text: chart_symbol + " Daily"
          },
          chart: {
            height: "60%"
          },
          plotOptions: {
            candlestick: 
            {
              color: 'red',
              upColor: 'green'
            }
          },
          yAxis: 
          [
            {
              labels: 
              {
                align: 'right',
                x: -3
              },
              title: 
              {
                text: 'OHLC'
              },
              height: '55%',
              lineWidth: 2,
              resize: 
              {
                enabled: true
              }
            }, 
            {
              labels: 
              {
                align: 'right',
                x: -3
              },
              title: 
              {
                text: 'Volume'
              },
              top: '57%',
              height: '25%',
              offset: 0,
              lineWidth: 2
            },
            {
              labels: 
              {
                align: 'right',
                x: -3
              },
              title: 
              {
                text: 'RSI'
              },
              top: '84%',
              height: '15%',
              offset: 0,
              lineWidth: 2
            }
          ],
          tooltip: 
          {
            split: true
          },
          series: 
          [
            {
              type: 'candlestick',
              name: chart_symbol,
              id: 'daily_ohlc',
              yAxis: 0,
              // zIndex: 2,
              data: ohlc_data,
              dataGrouping: 
              {
                  units: groupingUnits
              }
            },
            {
              type: 'sma',
              linkedTo: 'daily_ohlc',
              // zIndex: 1,
              tooltip: 
              {
                valueDecimals: 2
              },
              marker: 
              {
                enabled: false
              },
              params: 
              {
                period: 200
              }
            }, 
            {
              type: 'column',
              name: 'Volume',
              // id: 'volume-series',
              data: volume_data,
              yAxis: 1,
              // dataGrouping: {
              //     units: groupingUnits
              // }
            }, 

            {
              type: 'rsi',
              linkedTo: 'daily_ohlc',
              // zIndex: 1,
              yAxis: 2,
              marker: {
                  enabled: false
              },
              tooltip: {
                valueDecimals: 2
              },
              params: {
                decimals: 4,
                period: 4
              }
            }
          ]
        });

      return daily_ohlc_chart
    };


           


    return {
      histTradesSummaryChart: histTradesSummaryChart,
      histReturnsSummaryChart: histReturnsSummaryChart,
      dailyOHLCChart: dailyOHLCChart
      // tradesSummaryChart: tradesSummaryChart,
    };    

  };

})();