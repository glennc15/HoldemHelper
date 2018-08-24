(function () {
  angular
    .module('loc8rApp')
    .service('powerRSI_Data', powerRSI_Data);

  powerRSI_Data.$inject = ['$http'];
  function powerRSI_Data($http) {
    var overview = function() {
      return $http.get("http://127.0.0.1:5000/powerRSI_api/overview");
    };

    return {
      overview: overview
    };

  };

})();


      // var url = "http://127.0.0.1:5000/powerRSI_api/overview";
      // $http({
      //     // method: 'JSONP',
      //     method: "GET",
      //     url: url
      // }).
      // success(function(data) {
      //     return data;
      // }).
      // error(function(e) {
      //     console.log("error");
      //     console.log(e);
      //     return null;
      // });




      // var data = [
      //   {
      //     symbol: 'SPX',
      //     current_spot: 2818.37,
      //     current_rsi: 45,
      //     rsi_entry_point: 30,
      //     ma: 2000.0,
      //     trade_active: true
      //   },
      //   {
      //     symbol: 'DIA',
      //     current_spot: 251.76,
      //     current_rsi: 53,
      //     rsi_entry_point: 30,
      //     ma: 201.0,
      //     trade_active: true
      //   },
      //   {
      //     symbol: 'UVXY',
      //     current_spot: 9.76,
      //     current_rsi: 37,
      //     rsi_entry_point: 30,
      //     ma: 8,
      //     trade_active: false
      //   },
      //   {
      //     symbol: 'VIX',
      //     current_spot: 14.64,
      //     current_rsi: 37,
      //     rsi_entry_point: 30,
      //     ma: 17,
      //     trade_active: false
      //   },
      //   {
      //     symbol: 'SPY',
      //     current_spot: 281.83,
      //     current_rsi: 27,
      //     rsi_entry_point: 30,
      //     ma: 231.0,
      //     trade_active: false
      //   },
      //   {
      //     symbol: 'QQQ',
      //     current_spot: 251.76,
      //     current_rsi: 22,
      //     rsi_entry_point: 30,
      //     ma: 201.0,
      //     trade_active: false
      //   },
      //   {
      //     symbol: 'IWM',
      //     current_spot: 166.07,
      //     current_rsi: 24,
      //     rsi_entry_point: 30,
      //     ma: 130.0,
      //     trade_active: false
      //   },
      // ];

      // begin - original data
      // var data = [
      //   [
      //     {
      //       symbol: 'SPY',
      //       current_spot: 281.83,
      //       current_rsi: 27,
      //       rsi_entry_point: 30,
      //       ma: 231.0,
      //       trade_active: false,
      //       ma_rsi_ok: true,
      //       ma_ok_rsi_no: false,
      //       ma_no: false
      //     },
      //     {
      //       symbol: 'QQQ',
      //       current_spot: 251.76,
      //       current_rsi: 22,
      //       rsi_entry_point: 30,
      //       ma: 201.0,
      //       trade_active: false,
      //       ma_rsi_ok: true,
      //       ma_ok_rsi_no: false,
      //       ma_no: false
      //     },
      //     {
      //       symbol: 'IWM',
      //       current_spot: 166.07,
      //       current_rsi: 27,
      //       rsi_entry_point: 30,
      //       ma: 130.0,
      //       trade_active: false,
      //       ma_rsi_ok: true,
      //       ma_ok_rsi_no: false,
      //       ma_no: false
      //     },
      //     {
      //       symbol: 'SPX',
      //       current_spot: 2818.37,
      //       current_rsi: 45,
      //       rsi_entry_point: 30,
      //       ma: 2000.0,
      //       trade_active: true,
      //       ma_rsi_ok: false,
      //       ma_ok_rsi_no: false,
      //       ma_no: false
      //     }
      //   ],
      //   [
      //     {
      //       symbol: 'DIA',
      //       current_spot: 251.76,
      //       current_rsi: 53,
      //       rsi_entry_point: 30,
      //       ma: 201.0,
      //       trade_active: true,
      //       ma_rsi_ok: false,
      //       ma_ok_rsi_no: false,
      //       ma_no: false
      //     },
      //     {
      //       symbol: 'UVXY',
      //       current_spot: 9.76,
      //       current_rsi: 37,
      //       rsi_entry_point: 30,
      //       ma: 8,
      //       trade_active: false,
      //       ma_rsi_ok: false,
      //       ma_ok_rsi_no: true,
      //       ma_no: false
      //     },
      //     {
      //       symbol: 'VIX',
      //       current_spot: 14.64,
      //       current_rsi: 37,
      //       rsi_entry_point: 30,
      //       ma: 17,
      //       trade_active: false,
      //       ma_rsi_ok: false,
      //       ma_ok_rsi_no: false,
      //       ma_no: true
      //     }
      //   ]
      // ];
      // end - original data

      // return data;
    // };



