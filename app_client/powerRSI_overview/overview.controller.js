(function (){

  angular
    .module('loc8rApp')
    .controller('overviewCtrl', overviewCtrl);

    overviewCtrl.$inject = ['$scope', 'powerRSI_Data', 'overviewData', '$interval'];
    function overviewCtrl ($scope, powerRSI_Data, overviewData, $interval) {
      var vm = this;

      powerRSI_Data.overview()
        .success(function(data) {
          vm.data = {power_rsis: overviewData.formatData(data)};
          // $scope.data = {power_rsis: overviewData.formatData(data)};
        })
        .error(function (e) {
          console.log(e);
        });

      $interval(function() {
        powerRSI_Data.overview()
          .success(function(data) {
            vm.data = {power_rsis: overviewData.formatData(data)};
            // $scope.data = {power_rsis: overviewData.formatData(data)};
          })
          .error(function (e) {
            console.log(e);
          });

      }, 30000);

    }




})();