(function (){
  angular
    .module('loc8rApp')
    .service('overviewData', overviewData);

  // overviewData.$inject = ['powerRSI_Data']
  // function overviewData(powerRSI_Data) {
  function overviewData() {
    var formatData = function(raw_powerRSI_data) {
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

      // var raw_powerRSI_data = powerRSI_Data.overview();

      // state: ma and rsi criteria are met:
      
      var ma_rsi_ok = raw_powerRSI_data.filter(function(rsi_obj) {
        if(rsi_obj.ma_rsi_ok) {
          return true;
        }
      }).sort(function(obj_a, obj_b) {
        return (obj_a.current_rsi - obj_b.current_rsi);
      });

      // state: active trade:
      var active_trades = raw_powerRSI_data.filter(function(rsi_obj) {
        if (rsi_obj.trade_active) {
          return true;
        }
      }).sort(function(obj_a, obj_b) {
        return (obj_b.current_rsi - obj_a.current_rsi);
      });

      // state: ma criteria met, rsi criteria not met:
      var ma_ok_rsi_no = raw_powerRSI_data.filter(function(rsi_obj) {
        if (rsi_obj.ma_ok_rsi_no) {
          return true;
        }
      }).sort(function(obj_a, obj_b) {
        return (obj_a.current_rsi - obj_b.current_rsi);
      });
      // state: ma not met, rsi not not met:
      var ma_no_rsi_no = raw_powerRSI_data.filter(function(rsi_obj) {
        if (rsi_obj.ma_no) {
          return true;
        }
      }).sort(function(obj_a, obj_b) {
        return (obj_a.symbol.charCodeAt(0) - obj_b.symbol.charCodeAt(0));
      });

      return ma_rsi_ok.concat(active_trades.concat(ma_ok_rsi_no.concat(ma_no_rsi_no)));
    };
           


    return {formatData: formatData};    

  };

})();