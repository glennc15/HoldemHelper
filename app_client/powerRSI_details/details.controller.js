(function (){

  angular
    .module('loc8rApp')
    .controller('detailsCtrl', detailsCtrl);

    detailsCtrl.$inject = ['$routeParams', '$interval', 'powerRSI_Data', 'detailComponents'];
    function detailsCtrl ($routeParams, $interval, powerRSI_Data, detailComponents) {
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

          var histTradesSummaryChart = detailComponents.histTradesSummaryChart(
                                          total_trades=data['backtest_data']['total_trades'],
                                          winning_pct=data['backtest_data']['winning_pct'],
                                          mean_trade_days=data['backtest_data']['mean_trade_days'],
                                          hist_trades_sumamry_data=data['backtest_data']['trades_data']);

          var histReturnsSummaryChart = detailComponents.histReturnsSummaryChart(data['backtest_data']['returns_data']);
          
          var daily_ohlc_chart = detailComponents.dailyOHLCChart(
                                      chart_symbol=$routeParams.symbolid, 
                                      ohlc_data=data['daily_data']['ohlc_series'], 
                                      volume_data=data['daily_data']['volume_series']
                                    );

          var groupingUnits = 
            [
              ['week', [1]], 
              ['month', [1, 2, 3, 4, 6]]
            ];

          var chart_symbol = $routeParams.symbolid;
          var ohlc_data = data['daily_data']['ohlc_series'];
          var volume_data = data['daily_data']['volume_series'];


          Highcharts.stockChart('intraday_ohlc_chart', 
            {

              rangeSelector: 
              {
                selected: 1
              },

              title: 
              {
                text: chart_symbol + " Intraday"
              },

              chart: {
                height: "50%"
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
                  height: '60%',
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
                  top: '65%',
                  height: '30%',
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
                  top: '100%',
                  height: '20%',
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
                  id: 'aapl',
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
                  linkedTo: 'aapl',
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
                  linkedTo: 'aapl',
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


// series: [{
//   id: ‘main-series’,
//   data: [ … ]
// }, {
//   id: ‘volume-series’,
//   yAxis: 1,
//   data: [ … ]
// }, {
//   type: ‘mfi’,
//   linkedTo: ‘main-series’,
//   yAxis: 2,
//   params: {
//     volumeSeriesID: ‘volume-series’
//   }
// }]

            // Highcharts.stockChart('container', {
            //   rangeSelector: {
            //       selected: 2
            //   },
            //   yAxis: [
            //     {
            //       height: '75%',
            //       resize: {
            //           enabled: true
            //       },
            //       labels: {
            //           align: 'right',
            //           x: -3
            //       },
            //       title: {
            //           text: 'AAPL'
            //       }
            //       }, 
            //       {
            //         top: '75%',
            //         height: '25%',
            //         labels: {
            //             align: 'right',
            //             x: -3
            //         },
            //         offset: 0,
            //         title: {
            //             text: 'MACD'
            //         }
            //       }],
            //       title: {
            //           text: 'AAPL Stock Price'
            //       },
            //       subtitle: {
            //           text: 'With MACD and Pivot Points technical indicators'
            //       },

            //       series: [
            //         {
            //           type: 'ohlc',
            //           id: 'aapl',
            //           name: 'AAPL Stock Price',
            //           data: ohlc_data,
            //           zIndex: 1
            //         },
            //         {
            //           type: 'pivotpoints',
            //           linkedTo: 'aapl',
            //           zIndex: 0,
            //           lineWidth: 1,
            //           dataLabels: {
            //               overflow: 'none',
            //               crop: false,
            //               y: 4,
            //               style: {
            //                   fontSize: 9
            //               }
            //             }
            //         }, 
            //         {
            //           type: 'macd',
            //           yAxis: 1,
            //           linkedTo: 'aapl'
            //         }]
            // });


        // });


          // ********** 


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