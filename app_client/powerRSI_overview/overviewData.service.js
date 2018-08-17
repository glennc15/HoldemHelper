(function (){
  angular
    .module('loc8rApp')
    .service('overviewData', overviewData);

  overviewData.$inject = ['powerRSI_Data']
  function overviewData(powerRSI_Data) {
    // This service gets the overview data from the database and formats it
    // for use by overview.view.html

    // The data from the database is an array of objects. Each object is the
    // Power RSI status for a symbol. Each object state is "raw" and must be
    // translated so overview.view.html can understand the state of each
    // object. Three boolean flags are added to each object that defines the
    // correct state. Only one boolean flag is true while the other flags are
    // false.

    // The following boolean flags are added by this service:
    // ma_rsi_ok: true/false,
    // ma_ok_rsi_no: true/false,
    // ma_no: faltrue/falsese

    // There are 4 states a Power RSI object can be in:
    
    // state: active trade:
    // trade_active: true,
    // ma_rsi_ok: false,
    // ma_ok_rsi_no: false,
    // ma_no: false

    // state: ma and rsi criteria are met:
    // trade_active: false,
    // ma_rsi_ok: true,
    // ma_ok_rsi_no: false,
    // ma_no: false

    // state: ma criteria met, rsi criteria not met:
    // trade_active: false,
    // ma_rsi_ok: false,
    // ma_ok_rsi_no: true,
    // ma_no: false

    // state: ma not met, rsi not not met:
    // trade_active: false,
    // ma_rsi_ok: false,
    // ma_ok_rsi_no: false,
    // ma_no: true

    // RSI objects are grouped into arrays and sorted by RSI when the boolean
    // flags are added.  The the groups are combined into one large array in
    // the following order: ma & rsi criteria met group, active trade group,
    // ma met - ris not met group, and ma not met group.

    // Finally the array is broken down into an array of arrays where each
    // array contains 4 objects. The last can hold less than 4 objects but at
    // least one object.



  // function overviewData() {

    // var results = "Hey! I'm overviewData sevice!";
    // var results =  powerRSI_Data.overview();

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


    var raw_data = powerRSI_Data.overview();

    // state: ma and rsi criteria are met: 
    var ma_rsi_ok = raw_data.filter(function(rsi_obj) {
      if((rsi_obj.current_spot>=rsi_obj.ma) && (rsi_obj.current_rsi<=rsi_obj.rsi_entry_point) && (!rsi_obj.trade_active)) {
        return true;
      }
    }).map(function(rsi_obj) {
        var new_rsi_obj = {
          symbol: rsi_obj.symbol,
          current_rsi: rsi_obj.current_rsi,
          trade_active: false,
          ma_rsi_ok: true,
          ma_ok_rsi_no: false,
          ma_no: false
        };

        return new_rsi_obj;
    }).sort(function(obj_a, obj_b) {
      return (obj_a.current_rsi - obj_b.current_rsi);
    });

    // state: active trade:
    var active_trades = raw_data.filter(function(rsi_obj) {
      if (rsi_obj.trade_active) {
        return true;
      }
    }).map(function(rsi_obj) {
      var new_rsi_obj = {
        symbol: rsi_obj.symbol,
        current_rsi: rsi_obj.current_rsi,
        trade_active: true,
        ma_rsi_ok: false,
        ma_ok_rsi_no: false,
        ma_no: false
      };

      return new_rsi_obj;
    }).sort(function(obj_a, obj_b) {
      return (obj_b.current_rsi - obj_a.current_rsi);
    });

    // state: ma criteria met, rsi criteria not met:
    var ma_ok_rsi_no = raw_data.filter(function(rsi_obj) {
      if ((rsi_obj.current_spot>=rsi_obj.ma) && (rsi_obj.current_rsi>rsi_obj.rsi_entry_point) && (!rsi_obj.trade_active)) {
        return true;
      }
    }).map(function(rsi_obj) {
      var new_rsi_obj = {
        symbol: rsi_obj.symbol,
        current_rsi: rsi_obj.current_rsi,
        trade_active: false,
        ma_rsi_ok: false,
        ma_ok_rsi_no: true,
        ma_no: false
      };

      return new_rsi_obj;
    }).sort(function(obj_a, obj_b) {
      return (obj_a.current_rsi - obj_b.current_rsi);
    });


    // state: ma not met, rsi not not met:
    var ma_no_rsi_no = raw_data.filter(function(rsi_obj) {
      if ((rsi_obj.current_spot<rsi_obj.ma) && (!rsi_obj.trade_active)) {
        return true;
      }
    }).map(function(rsi_obj) {
      var new_rsi_obj = {
        symbol: rsi_obj.symbol,
        current_rsi: rsi_obj.current_rsi,
        trade_active: false,
        ma_rsi_ok: false,
        ma_ok_rsi_no: false,
        ma_no: true
      };

      return new_rsi_obj;
    }).sort(function(obj_a, obj_b) {
      return (obj_a.current_rsi - obj_b.current_rsi);
    });


    var results = [ma_rsi_ok.concat(active_trades.concat(ma_ok_rsi_no.concat(ma_no_rsi_no)))]
   
    // TODO: 17-Aug-2018: Break results array into an array of arrays. Saving
    // this because good enough for right now.
      
    return {overviewData: results};    

  };

})();