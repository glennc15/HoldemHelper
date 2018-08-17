(function (){

  angular
    .module('loc8rApp')
    .controller('overviewCtrl', overviewCtrl);

    overviewCtrl.$inject = ['$scope', 'powerRSI_Data'];
    function overviewCtrl ($scope, powerRSI_Data) {
      var vm = this;

      $scope.data = {power_rsis: powerRSI_Data.overview()}

      // *** start hard coded data
      // $scope.data = {
      //   power_rsis: [
      //     [
      //       {
      //         symbol: 'SPY',
      //         current_spot: 281.83,
      //         current_rsi: 27,
      //         rsi_entry_point: 30,
      //         ma: 231.0,
      //         trade_active: false,
      //         ma_rsi_ok: true,
      //         ma_ok_rsi_no: false,
      //         ma_no: false
      //       },
      //       {
      //         symbol: 'QQQ',
      //         current_spot: 251.76,
      //         current_rsi: 22,
      //         rsi_entry_point: 30,
      //         ma: 201.0,
      //         trade_active: false,
      //         ma_rsi_ok: true,
      //         ma_ok_rsi_no: false,
      //         ma_no: false
      //       },
      //       {
      //         symbol: 'IWM',
      //         current_spot: 166.07,
      //         current_rsi: 27,
      //         rsi_entry_point: 30,
      //         ma: 130.0,
      //         trade_active: false,
      //         ma_rsi_ok: true,
      //         ma_ok_rsi_no: false,
      //         ma_no: false
      //       },
      //       {
      //         symbol: 'SPX',
      //         current_spot: 2818.37,
      //         current_rsi: 45,
      //         rsi_entry_point: 30,
      //         ma: 2000.0,
      //         trade_active: true,
      //         ma_rsi_ok: false,
      //         ma_ok_rsi_no: false,
      //         ma_no: false
      //       }
      //     ],
      //     [
      //       {
      //         symbol: 'DIA',
      //         current_spot: 251.76,
      //         current_rsi: 53,
      //         rsi_entry_point: 30,
      //         ma: 201.0,
      //         trade_active: true,
      //         ma_rsi_ok: false,
      //         ma_ok_rsi_no: false,
      //         ma_no: false
      //       },
      //       {
      //         symbol: 'UVXY',
      //         current_spot: 9.76,
      //         current_rsi: 37,
      //         rsi_entry_point: 30,
      //         ma: 8,
      //         trade_active: false,
      //         ma_rsi_ok: false,
      //         ma_ok_rsi_no: true,
      //         ma_no: false
      //       },
      //       {
      //         symbol: 'VIX',
      //         current_spot: 14.64,
      //         current_rsi: 37,
      //         rsi_entry_point: 30,
      //         ma: 17,
      //         trade_active: false,
      //         ma_rsi_ok: false,
      //         ma_ok_rsi_no: false,
      //         ma_no: true
      //       }
      //     ]
      //   ]
      // };

      // $scope.stuff = powerRSI_Data.overview();

      // *** end hard coded data

      // $scope.data["stuff"] = powerRSI_Data();

    }




})();