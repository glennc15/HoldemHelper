(function (){

  angular
    .module('loc8rApp')
    .controller('overviewCtrl', overviewCtrl);

    overviewCtrl.$inject = ['$scope'];
    function overviewCtrl ($scope) {
      var vm = this;
      // $scope.data = {power_rsis: [
      //     {_id: '5b72c81fff47104a20ce5337',
      //       losing_trades: 4,
      //       mean_days_in_trade: 3.869565217391304,
      //       mean_return_per_losing_trade: -2.0352573525877076,
      //       mean_return_per_trade: 1.5914743814223755,
      //       mean_return_per_winning_trade: 1.7563258238773785,
      //       number_of_trades: 92,
      //       percent_correct_trades: 0.9565217391304348,
      //       symbol: '^GSPC',
      //       winning_trades: 88
      //     },
      //     {_id: '5b72c823ff47104a20ce5339',
      //       losing_trades: 4,
      //       mean_days_in_trade: 3.8735632183908044,
      //       mean_return_per_losing_trade: -1.9237884589007352,
      //       mean_return_per_trade: 1.6315101476642064,
      //       mean_return_per_winning_trade: 1.8028498395468546,
      //       number_of_trades: 87,
      //       percent_correct_trades: 0.9540229885057471,
      //       symbol: 'SPY',
      //       winning_trades: 83
      //     },
      //   ]};

      $scope.data = {
        power_rsis: [
          [
            {
              symbol: 'SPY',
              current_spot: 281.83,
              current_rsi: 27,
              rsi_entry_point: 30,
              ma: 231.0,
              trade_active: false,
              ma_rsi_ok: true,
              ma_ok_rsi_no: false,
              ma_no: false
            },
            {
              symbol: 'QQQ',
              current_spot: 251.76,
              current_rsi: 22,
              rsi_entry_point: 30,
              ma: 201.0,
              trade_active: false,
              ma_rsi_ok: true,
              ma_ok_rsi_no: false,
              ma_no: false
            },
            {
              symbol: 'IWM',
              current_spot: 166.07,
              current_rsi: 27,
              rsi_entry_point: 30,
              ma: 130.0,
              trade_active: false,
              ma_rsi_ok: true,
              ma_ok_rsi_no: false,
              ma_no: false
            },
            {
              symbol: 'SPX',
              current_spot: 2818.37,
              current_rsi: 45,
              rsi_entry_point: 30,
              ma: 2000.0,
              trade_active: true,
              ma_rsi_ok: false,
              ma_ok_rsi_no: false,
              ma_no: false
            }
          ],
          [
            {
              symbol: 'DIA',
              current_spot: 251.76,
              current_rsi: 53,
              rsi_entry_point: 30,
              ma: 201.0,
              trade_active: true,
              ma_rsi_ok: false,
              ma_ok_rsi_no: false,
              ma_no: false
            },
            {
              symbol: 'UVXY',
              current_spot: 9.76,
              current_rsi: 37,
              rsi_entry_point: 30,
              ma: 8,
              trade_active: false,
              ma_rsi_ok: false,
              ma_ok_rsi_no: true,
              ma_no: false
            },
            {
              symbol: 'VIX',
              current_spot: 14.64,
              current_rsi: 37,
              rsi_entry_point: 30,
              ma: 17,
              trade_active: false,
              ma_rsi_ok: false,
              ma_ok_rsi_no: false,
              ma_no: true
            }
          ]
        ]
      };

    }




})();